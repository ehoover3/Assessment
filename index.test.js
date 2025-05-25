const { getDaysInMonth, getDailyRate, getDaysUsed, getTotal, generateInvoice } = require("./index.js");

const month = "2025-10";
const users = [
  { id: 1, subscriptionCostPerMonth: 6000, dateActivated: "2010-10-30", dateDeactivated: null },
  { id: 2, subscriptionCostPerMonth: 5000, dateActivated: "2025-10-05", dateDeactivated: null },
  { id: 3, subscriptionCostPerMonth: 4000, dateActivated: "2025-10-15", dateDeactivated: "2025-10-25" },
  { id: 4, subscriptionCostPerMonth: 3000, dateActivated: "2022-10-15", dateDeactivated: "2025-05-05" },
  { id: 5, subscriptionCostPerMonth: 2000, dateActivated: null, dateDeactivated: null },
];

describe("Gets days in the month for valid inputs", () => {
  expect(getDaysInMonth("2025-01").toBe(31));
  expect(getDaysInMonth("2025-02").toBe(28));
  expect(getDaysInMonth("2025-03").toBe(31));
  expect(getDaysInMonth("2025-04").toBe(30));
  expect(getDaysInMonth("2025-05").toBe(31));
  expect(getDaysInMonth("2025-06").toBe(30));
  expect(getDaysInMonth("2025-07").toBe(31));
  expect(getDaysInMonth("2025-08").toBe(31));
  expect(getDaysInMonth("2025-09").toBe(30));
  expect(getDaysInMonth("2025-10").toBe(31));
  expect(getDaysInMonth("2025-11").toBe(30));
  expect(getDaysInMonth("2025-12").toBe(31));
  expect(getDaysInMonth("2028-02").toBe(29)); // leap year

  expect(getDaysInMonth(undefined).toBe());
  expect(getDaysInMonth(null).toBe());
  expect(getDaysInMonth("").toBe());
});

describe("Gets daily rate", () => {});

describe("Gets days actively used", () => {});

describe("Get total", () => {});

describe("Generate invoice", () => {});
