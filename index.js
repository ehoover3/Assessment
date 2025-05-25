const getDaysInMonth = (month) => {
  if (typeof monthStr !== "string") {
    throw new Error(`Invalid input type.  Expected string, but got ${typeof monthStr}`);
  }

  const parts = month.split("-");
  if (parts.length !== 2) {
    throw new Error(`Invalid format.  Expected "YYYY-MM", but got ${month}`);
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

module.exports = {
  getDaysInMonth,
  getDailyRate,
  getDaysUsed,
  getTotal,
  generateInvoice,
};
