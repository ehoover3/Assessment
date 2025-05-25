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
  const [yearStr, monthStr] = parts;
  const year = Number(yearStr);
  const monthNum = Number(monthStr);
  if (yearStr.length !== 4 || isNaN(year)) {
    throw new Error(`Invalid year. Expected 4 digit year, but got "${yearStr}".`);
  }
  if (monthStr.length !== 2 || isNaN(monthNum)) {
    throw new Error(`Invalid month. Expected 2 digit month, but got "${monthStr}".`);
  }
  if (monthNum < 1 || monthNum > 12) {
    throw new RangeError(`Invalid month number. Expected value from 01 to 12, but got "${monthStr}".`);
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

const getDailyRate = (month, users) => {
  const { subscriptionCostPerMonth } = users;
  const daysInTheMonth = getDaysInMonth(month);
  let dailyRate = subscriptionCostPerMonth / daysInTheMonth;
  return dailyRate;
};

const getDaysUsed = () => {};

const getTotal = () => {};

const generateInvoice = (month, users) => {
  isMonthInputValid(month);
  dailyRate = getDailyRate();
  daysUsed = getDaysUsed();
  total = getTotal();
  return total;
};

getDaysInMonth("2020-04");

module.exports = {
  isLeapYear,
  getDaysInMonth,
  getDailyRate,
  getDaysUsed,
  getTotal,
  generateInvoice,
};
