class InvoiceCalculator {
  constructor(month, users, subscription) {
    this.month = month;
    this.users = users;
    this.subscription = subscription;
    this.validateInputs();
  }

  validateInputs() {
    InvoiceCalculator.validateMonth(this.month);
    InvoiceCalculator.validateUsers(this.users);
    InvoiceCalculator.validateSubscription(this.subscription);
  }

  static validateMonth(month) {
    if (typeof month !== "string") throw new TypeError("Month must be a string.");
    const parts = month.split("-");
    if (parts.length !== 2) throw new Error('Invalid format. Expected "YYYY-MM".');
    const [yearString, monthString] = parts;
    if (yearString.length !== 4) throw new Error("Year must be 4 digits.");
    const yearNumber = Number(yearString);
    if (isNaN(yearNumber) || yearNumber < 1000) throw new Error("Year must be a valid number >= 1000.");
    if (monthString.length !== 2) throw new Error("Month must be zero-padded to two digits.");
    const monthNumber = Number(monthString);
    if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) throw new Error("Month must be between 01 and 12.");
  }

  static validateDate(dateString) {
    if (typeof dateString !== "string") throw new TypeError("Date must be a string.");
    const parts = dateString.split("-");
    if (parts.length !== 3) throw new Error('Expected "YYYY-MM-DD".');
    const [year, month, day] = parts.map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    if (date.getUTCFullYear() !== year || date.getUTCMonth() + 1 !== month || date.getUTCDate() !== day) {
      throw new Error(`${dateString} is not a valid calendar date.`);
    }
  }

  static validateUsers(users) {
    if (!Array.isArray(users)) throw new TypeError("Users must be an array.");
    users.forEach((user, i) => {
      if (typeof user !== "object" || user === null) throw new Error(`User at index ${i} is not valid.`);
      if (!Number.isInteger(user.id)) throw new Error(`User ${i} must have a valid integer ID.`);
      if (user.dateActivated) InvoiceCalculator.validateDate(user.dateActivated);
      if (user.dateDeactivated) InvoiceCalculator.validateDate(user.dateDeactivated);
    });
  }

  static validateSubscription(sub) {
    if (typeof sub !== "object" || sub === null) throw new TypeError("Subscription must be an object.");
    if (!Number.isInteger(sub.id)) throw new Error("Subscription must have an integer ID.");
    const cost = sub.subscriptionCostPerMonthInCents;
    if (typeof cost !== "number" || isNaN(cost) || cost < 0) throw new Error("subscriptionCostPerMonthInCents must be a non-negative number.");
  }

  getDaysInMonth() {
    const [year, month] = this.month.split("-").map(Number);
    return new Date(Date.UTC(year, month, 0)).getUTCDate();
  }

  getDailyRate() {
    return this.subscription.subscriptionCostPerMonthInCents / this.getDaysInMonth();
  }

  getUserActiveDays(user, monthStart, monthEnd) {
    if (!user.dateActivated) return 0;
    const activated = new Date(`${user.dateActivated}T00:00:00Z`);
    const deactivated = user.dateDeactivated ? new Date(`${user.dateDeactivated}T00:00:00Z`) : null;
    const activeStart = activated > monthStart ? activated : monthStart;
    const activeEnd = deactivated && deactivated < monthEnd ? deactivated : monthEnd;
    if (activeStart > activeEnd) return 0;
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    return Math.round((activeEnd - activeStart) / millisecondsPerDay) + 1;
  }

  getTotalActiveDays() {
    const [year, month] = this.month.split("-").map(Number);
    const monthStart = new Date(Date.UTC(year, month - 1, 1));
    const monthEnd = new Date(Date.UTC(year, month, 0)); // Last day of the month
    return this.users.reduce((total, user) => total + this.getUserActiveDays(user, monthStart, monthEnd), 0);
  }

  generateInvoiceTotal() {
    const total = this.getDailyRate() * this.getTotalActiveDays();
    return Number((total / 100).toFixed(2));
  }
}

module.exports = InvoiceCalculator;
