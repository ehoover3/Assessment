const isLeapYear = (year) => {
  if (typeof year !== "number") {
    throw new TypeError(`Invalid input type. Year must be a number, but got ${typeof year}`);
  }
  if (!Number.isInteger(year)) {
    throw new RangeError(`Invalid input value. Year must be an integer, but got ${year}`);
  }
  const divisibleBy4 = year % 4 === 0;
  if (divisibleBy4) {
    return true;
  } else {
    return false;
  }
};

const getDaysInMonth = (month) => {
  if (typeof month !== "string") {
    throw new Error(`Invalid input type. Expected string, but got ${typeof month}.`);
  }

  if (month.trim() === "") {
    throw new Error(`Invalid input. Expected non-empty string, but got empty string.`);
  }

  const inputParts = month.split("-");
  if (inputParts.length !== 2) {
    throw new Error(`Invalid format. Expected "YYYY-MM", but got ${month}.`);
  }

  const yearString = inputParts[0];
  const monthString = inputParts[1];

  const yearNumber = Number(inputParts[0]);
  const monthNumber = Number(inputParts[1]);

  if (isNaN(yearNumber) || yearString.length !== 4) {
    throw new Error(`Invalid year. Expected 4 digit year, but got ${yearNumber}.`);
  }

  if (isNaN(monthNumber) || monthString.length !== 2) {
    throw new Error(`Invalid month. Expected 2 digit month, but got ${monthNumber}.`);
  }

  if (monthNumber < 1 || monthNumber > 12) {
    throw new Error(`Invalid month number. Expected value from 01 to 12, but got ${monthString}.`);
  }

  const monthNumberToWord = { 1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June", 7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December" };
  const daysInTheMonth = { January: 31, February: 28, March: 31, April: 30, May: 31, June: 30, July: 31, August: 31, September: 30, October: 31, November: 30, December: 31 };

  const monthName = monthNumberToWord[monthNumber];
  let days = daysInTheMonth[monthName];

  if (monthName === "February" && isLeapYear(yearNumber)) {
    days = 29;
  }
  return days;
};

const getDailyRate = () => {};

const getDaysUsed = () => {};

const getTotal = () => {};

const generateInvoice = () => {
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
