const month = "2025-10";
const users = [
  { id: 1, dateActivated: "2010-10-30", dateDeactivated: null },
  { id: 2, dateActivated: "2025-10-05", dateDeactivated: null },
  { id: 3, dateActivated: "2025-10-15", dateDeactivated: "2025-10-25" },
  { id: 4, dateActivated: "2022-10-15", dateDeactivated: "2025-05-05" },
  { id: 5, dateActivated: null, dateDeactivated: null },
];
const subscription = { id: 1, subscriptionCostPerMonthInCents: 5000 };

const isMonthInputValid = (month) => {
  if (typeof month !== "string") {
    throw new TypeError(`Invalid input type. Expected string, but got ${typeof month}.`);
  }
  if (month.trim() === "") {
    throw new Error("Invalid input. Expected non-empty string, but got empty string.");
  }
  const parts = month.split("-");
  if (parts.length !== 2) {
    throw new Error(`Invalid format. Expected "YYYY-MM", but got ${month}.`);
  }
  const [yearString, monthString] = parts;
  const year = Number(yearString);
  const monthNumber = Number(monthString);
  if (yearString.length !== 4 || isNaN(year)) {
    throw new Error(`Invalid year. Expected 4 digit year, but got "${yearString}".`);
  }
  if (monthString.length !== 2 || isNaN(monthNumber)) {
    throw new Error(`Invalid month. Expected 2 digit month, but got "${monthString}".`);
  }
  if (monthNumber < 1 || monthNumber > 12) {
    throw new RangeError(`Invalid month number. Expected value from 01 to 12, but got "${monthString}".`);
  }
  return true;
};

const isValidDateString = (dateString) => {
  if (typeof dateString !== "string") {
    throw new TypeError(`Invalid date string. Expected string, but got ${typeof dateString}.`);
  }
  const parts = dateString.split("-");
  if (parts.length !== 3) {
    throw new Error(`Invalid date format. Expected "YYYY-MM-DD", but got "${dateString}".`);
  }
  const [yearString, monthString, dayString] = parts;
  const year = Number(yearString);
  const month = Number(monthString);
  const day = Number(dayString);
  if (yearString.length !== 4 || isNaN(year) || monthString.length !== 2 || isNaN(month) || dayString.length !== 2 || isNaN(day)) {
    throw new Error(`Invalid date components in "${dateString}".`);
  }
  if (month < 1 || month > 12) {
    throw new Error(`Month must be between 01 and 12 in "${dateString}".`);
  }
  if (day < 1 || day > 31) {
    throw new Error(`Day must be between 01 and 31 in "${dateString}".`);
  }
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
    throw new Error(`"${dateString}" is not a valid calendar date.`);
  }
  return true;
};

const isUsersInputValid = (users) => {
  if (!Array.isArray(users)) {
    throw new TypeError(`Invalid input type. Expected array, but got ${typeof users}.`);
  }
  users.forEach((user, index) => {
    if (typeof user !== "object" || user === null) {
      throw new TypeError(`User at index ${index} is not a valid object.`);
    }
    const { id, dateActivated, dateDeactivated } = user;
    if (typeof id !== "number") {
      throw new TypeError(`User at index ${index} has invalid 'id'. Expected type "number", but got "${typeof id}".`);
    }
    if (!Number.isInteger(id)) {
      throw new TypeError(`User at index ${index} has invalid 'id'. Expected an integer, but got a non-integer number: ${id}.`);
    }
    if (dateActivated !== null && dateActivated !== undefined && typeof dateActivated !== "string") {
      throw new TypeError(`User at index ${index} has invalid 'dateActivated'. Expected string or null, but got ${typeof dateActivated}.`);
    }
    if (dateDeactivated !== undefined && dateDeactivated !== null && typeof dateDeactivated !== "string") {
      throw new TypeError(`User at index ${index} has invalid 'dateDeactivated'. Expected string, null, or undefined, but got ${typeof dateDeactivated}.`);
    }
    if (typeof dateActivated === "string") {
      try {
        isValidDateString(dateActivated);
      } catch (err) {
        throw new Error(`Invalid dateActivated for user at index ${index}: ${err.message}`);
      }
    }
    if (typeof dateDeactivated === "string") {
      try {
        isValidDateString(dateDeactivated);
      } catch (err) {
        throw new Error(`Invalid dateDeactivated for user at index ${index}: ${err.message}`);
      }
    }
  });
  return true;
};

const isSubscriptionInputValid = (subscription) => {
  if (typeof subscription !== "object" || subscription === null) {
    throw new TypeError(`Invalid subscription. Expected an object, but got ${typeof subscription}.`);
  }
  const { id, subscriptionCostPerMonthInCents } = subscription;
  if (typeof id !== "number") {
    throw new TypeError(`Invalid subscription 'id'. Expected type "number", but got "${typeof id}".`);
  }
  if (!Number.isInteger(id)) {
    throw new TypeError(`Invalid subscription 'id'. Expected an integer, but got a non-integer number: ${id}.`);
  }
  if (typeof subscriptionCostPerMonthInCents !== "number") {
    throw new TypeError(`Invalid 'subscriptionCostPerMonthInCents'. Expected type "number", but got "${typeof subscriptionCostPerMonthInCents}".`);
  }
  if (isNaN(subscriptionCostPerMonthInCents)) {
    throw new TypeError(`Invalid 'subscriptionCostPerMonthInCents'. Value is NaN, which is not a valid number.`);
  }
  if (subscriptionCostPerMonthInCents < 0) {
    throw new TypeError(`Invalid 'subscriptionCostPerMonthInCents'. Expected a non-negative number, but got ${subscriptionCostPerMonthInCents}.`);
  }
  return true;
};

const getDaysInMonth = (month) => {
  isMonthInputValid(month);
  const [yearString, monthString] = month.split("-");
  const yearNumber = Number(yearString);
  const monthNumber = Number(monthString);
  return new Date(yearNumber, monthNumber, 0).getDate();
};

const getDailyRate = (month, subscription) => {
  isMonthInputValid(month);
  isSubscriptionInputValid(subscription);
  const { subscriptionCostPerMonthInCents } = subscription;
  const daysInTheMonth = getDaysInMonth(month);
  let dailyRate = subscriptionCostPerMonthInCents / daysInTheMonth;
  return dailyRate;
};

const toUtcDate = (dateString) => {
  const [y, m, d] = dateString.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
};

const getUserActiveDays = ({ dateActivated, dateDeactivated }, monthStart, monthEnd) => {
  if (!dateActivated) return 0;
  const activated = toUtcDate(dateActivated);
  const deactivated = dateDeactivated ? toUtcDate(dateDeactivated) : null;
  const activeStart = activated > monthStart ? activated : monthStart;
  const activeEnd = deactivated && deactivated < monthEnd ? deactivated : monthEnd;
  if (activeStart > activeEnd) return 0;
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((activeEnd - activeStart) / msPerDay) + 1;
};

const getTotalActiveDays = (month, users) => {
  isMonthInputValid(month);
  isUsersInputValid(users);
  const [yearString, monthString] = month.split("-");
  const year = Number(yearString);
  const monthNum = Number(monthString);
  const monthStart = new Date(Date.UTC(year, monthNum - 1, 1));
  const monthEnd = new Date(Date.UTC(year, monthNum, 0)); // last day of month
  return users.reduce((total, user) => total + getUserActiveDays(user, monthStart, monthEnd), 0);
};

const generateInvoiceTotal = (month, users, subscription) => {
  isMonthInputValid(month);
  isUsersInputValid(users);
  dailyRate = getDailyRate(month, subscription);
  daysUsed = getTotalActiveDays(month, users);
  let total = dailyRate * daysUsed;
  total = total / 100;
  total = Number(total.toFixed(2));
  return total;
};

generateInvoiceTotal(month, users, subscription);

module.exports = {
  isMonthInputValid,
  isValidDateString,
  isUsersInputValid,
  isSubscriptionInputValid,
  getDaysInMonth,
  getDailyRate,
  getDaysUsed: getTotalActiveDays,
  generateInvoice: generateInvoiceTotal,
};
