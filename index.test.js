const { isLeapYear, getDaysInMonth, getDailyRate, getDaysUsed, getTotal, generateInvoice } = require("./index.js");

const month = "2025-10";
const users = [
  { id: 1, subscriptionCostPerMonth: 6000, dateActivated: "2010-10-30", dateDeactivated: null },
  { id: 2, subscriptionCostPerMonth: 5000, dateActivated: "2025-10-05", dateDeactivated: null },
  { id: 3, subscriptionCostPerMonth: 4000, dateActivated: "2025-10-15", dateDeactivated: "2025-10-25" },
  { id: 4, subscriptionCostPerMonth: 3000, dateActivated: "2022-10-15", dateDeactivated: "2025-05-05" },
  { id: 5, subscriptionCostPerMonth: 2000, dateActivated: null, dateDeactivated: null },
];

describe("isLeapYear", () => {
  test("returns true for years divisible by 4", () => {
    expect(isLeapYear(2024)).toBe(true);
    expect(isLeapYear(2000)).toBe(true);
    expect(isLeapYear(1996)).toBe(true);
  });
  test("returns false for years not divisible by 4", () => {
    expect(isLeapYear(2023)).toBe(false);
    expect(isLeapYear(2025)).toBe(false);
    expect(isLeapYear(2019)).toBe(false);
  });
  test("throws TypeError if input is not a number", () => {
    expect(() => isLeapYear(undefined)).toThrow(TypeError);
    expect(() => isLeapYear(null)).toThrow(TypeError);
    expect(() => isLeapYear("2024")).toThrow(TypeError);
    expect(() => isLeapYear({})).toThrow(TypeError);
  });
  test("throws RangeError if input is a number but not an integer", () => {
    expect(() => isLeapYear(NaN)).toThrow(RangeError);
    expect(() => isLeapYear(2024.5)).toThrow(RangeError);
    expect(() => isLeapYear(0.1)).toThrow(RangeError);
  });
});

describe("getDaysInMonth", () => {
  test("returns correct days for valid month inputs", () => {
    expect(getDaysInMonth("2025-01")).toBe(31);
    expect(getDaysInMonth("2025-02")).toBe(28);
    expect(getDaysInMonth("2025-03")).toBe(31);
    expect(getDaysInMonth("2025-04")).toBe(30);
    expect(getDaysInMonth("2025-05")).toBe(31);
    expect(getDaysInMonth("2025-06")).toBe(30);
    expect(getDaysInMonth("2025-07")).toBe(31);
    expect(getDaysInMonth("2025-08")).toBe(31);
    expect(getDaysInMonth("2025-09")).toBe(30);
    expect(getDaysInMonth("2025-10")).toBe(31);
    expect(getDaysInMonth("2025-11")).toBe(30);
    expect(getDaysInMonth("2025-12")).toBe(31);
    expect(getDaysInMonth("2028-02")).toBe(29); // leap year
  });
  test("throws error for invalid inputs", () => {
    expect(() => getDaysInMonth(undefined)).toThrow("Invalid input type. Expected string, but got undefined.");
    expect(() => getDaysInMonth(null)).toThrow("Invalid input type. Expected string, but got object.");
    expect(() => getDaysInMonth("")).toThrow("Invalid input. Expected non-empty string, but got empty string.");
    expect(() => getDaysInMonth("2025-00")).toThrow("Invalid month number. Expected value from 01 to 12, but got 00.");
    expect(() => getDaysInMonth("2025-13")).toThrow("Invalid month number. Expected value from 01 to 12, but got 13.");
  });
});

describe("Gets daily rate", () => {});

describe("Gets days actively used", () => {});

describe("Get total", () => {});

describe("Generate invoice", () => {});
