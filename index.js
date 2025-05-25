const getDaysInMonth = (month) => {
  if (typeof month !== "string") {
    throw new Error(`Invalid input type.  Expected string, but got ${typeof month}.`);
  }

  const inputParts = month.split("-");
  if (inputParts.length !== 2) {
    throw new Error(`Invalid format.  Expected "YYYY-MM", but got ${month}.`);
  }

  const yearString = inputParts[0];
  const monthString = inputParts[1];

  const yearNumber = Number(inputParts[0]);
  const monthNumber = Number(inputParts[0]);

  if (isNaN(yearNumber) || yearString.length !== 4) {
    throw new Error(`Invalid year.  Expected 4 digit year, but got ${yearNumber}.`);
  }

  if (isNaN(monthNumber) || monthString.length !== 2) {
    throw new Error(`Invalid month.  Expected 2 digit month, but got ${monthNumber}.`);
  }
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
  getDaysInMonth,
  getDailyRate,
  getDaysUsed,
  getTotal,
  generateInvoice,
};
