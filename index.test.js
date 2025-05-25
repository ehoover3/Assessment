const { isMonthInputValid, isValidDateString, isUsersInputValid, isSubscriptionInputValid, getDaysInMonth, getDailyRate, getDaysUsed, generateInvoice } = require("./index.js");

describe("isMonthInputValid", () => {
  test("accepts valid month strings", () => {
    expect(isMonthInputValid("2025-01")).toBe(true);
    expect(isMonthInputValid("1999-12")).toBe(true);
  });
  test("throws error for non-string inputs", () => {
    expect(() => isMonthInputValid(2025)).toThrow(TypeError);
    expect(() => isMonthInputValid(null)).toThrow(TypeError);
    expect(() => isMonthInputValid({})).toThrow(TypeError);
    expect(() => isMonthInputValid([])).toThrow(TypeError);
  });
  test("throws error for empty strings", () => {
    expect(() => isMonthInputValid("")).toThrow("non-empty string");
    expect(() => isMonthInputValid("   ")).toThrow("non-empty string");
  });
  test("throws error for wrong format", () => {
    expect(() => isMonthInputValid("202501")).toThrow('Expected "YYYY-MM"');
    expect(() => isMonthInputValid("2025-1")).toThrow("2 digit month");
    expect(() => isMonthInputValid("25-01")).toThrow("4 digit year");
  });
  test("throws error for invalid month numbers", () => {
    expect(() => isMonthInputValid("2025-00")).toThrow("01 to 12");
    expect(() => isMonthInputValid("2025-13")).toThrow("01 to 12");
  });
});

describe("isValidDateString", () => {
  test("accepts valid date strings", () => {
    expect(isValidDateString("2024-02-29")).toBe(true); // leap year
    expect(isValidDateString("2025-01-31")).toBe(true);
  });
  test("throws error for non-string input", () => {
    expect(() => isValidDateString(null)).toThrow(TypeError);
    expect(() => isValidDateString(123)).toThrow(TypeError);
    expect(() => isValidDateString([])).toThrow(TypeError);
  });
  test("throws error for wrong format", () => {
    expect(() => isValidDateString("2025-01")).toThrow('Expected "YYYY-MM-DD"');
    expect(() => isValidDateString("2025/01/01")).toThrow('Expected "YYYY-MM-DD"');
  });
  test("throws error for non-numeric or misformatted parts", () => {
    expect(() => isValidDateString("abcd-01-01")).toThrow("Invalid date components");
    expect(() => isValidDateString("2025-xx-01")).toThrow("Invalid date components");
    expect(() => isValidDateString("2025-01-yy")).toThrow("Invalid date components");
  });
  test("throws error for out-of-range month or day", () => {
    expect(() => isValidDateString("2025-00-01")).toThrow("Month must be between 01 and 12");
    expect(() => isValidDateString("2025-13-01")).toThrow("Month must be between 01 and 12");
    expect(() => isValidDateString("2025-01-00")).toThrow("Day must be between 01 and 31");
    expect(() => isValidDateString("2025-01-32")).toThrow("Day must be between 01 and 31");
  });
  test("throws error for invalid calendar dates", () => {
    expect(() => isValidDateString("2025-02-30")).toThrow("not a valid calendar date");
    expect(() => isValidDateString("2023-04-31")).toThrow("not a valid calendar date");
  });
});

describe("isUsersInputValid", () => {
  test("accepts a valid array of users", () => {
    const users = [
      { id: 1, dateActivated: "2025-01-01", dateDeactivated: null },
      { id: 2, dateActivated: null, dateDeactivated: null },
    ];
    expect(isUsersInputValid(users)).toBe(true);
  });
  test("throws error for non-array inputs", () => {
    expect(() => isUsersInputValid(null)).toThrow("Expected array");
    expect(() => isUsersInputValid({})).toThrow("Expected array");
    expect(() => isUsersInputValid("not array")).toThrow("Expected array");
  });
  test("throws error for non-object user items", () => {
    expect(() => isUsersInputValid([null])).toThrow("User at index 0 is not a valid object");
    expect(() => isUsersInputValid(["string"])).toThrow("User at index 0 is not a valid object");
  });
  test("throws error for invalid 'id'", () => {
    expect(() => isUsersInputValid([{ id: "abc" }])).toThrow("invalid 'id'");
    expect(() => isUsersInputValid([{ id: 1.5 }])).toThrow("non-integer number");
  });
  test("throws error for invalid date formats", () => {
    expect(() => isUsersInputValid([{ id: 1, dateActivated: "2025-13-01" }])).toThrow("dateActivated");
    expect(() => isUsersInputValid([{ id: 1, dateDeactivated: "2025-00-01" }])).toThrow("dateDeactivated");
  });
});

describe("isSubscriptionInputValid", () => {
  test("accepts valid subscription object", () => {
    expect(isSubscriptionInputValid({ id: 1, subscriptionCostPerMonthInCents: 1000 })).toBe(true);
  });
  test("throws error for null or non-object", () => {
    expect(() => isSubscriptionInputValid(null)).toThrow("Expected an object");
    expect(() => isSubscriptionInputValid("string")).toThrow("Expected an object");
  });
  test("throws error for missing or invalid 'id'", () => {
    expect(() => isSubscriptionInputValid({ subscriptionCostPerMonthInCents: 1000 })).toThrow("subscription 'id'");
    expect(() => isSubscriptionInputValid({ id: "abc", subscriptionCostPerMonthInCents: 1000 })).toThrow("subscription 'id'");
    expect(() => isSubscriptionInputValid({ id: 1.5, subscriptionCostPerMonthInCents: 1000 })).toThrow("non-integer number");
  });
  test("throws error for invalid 'subscriptionCostPerMonthInCents'", () => {
    expect(() => isSubscriptionInputValid({ id: 1, subscriptionCostPerMonthInCents: "free" })).toThrow('Expected type "number"');
    expect(() => isSubscriptionInputValid({ id: 1, subscriptionCostPerMonthInCents: NaN })).toThrow("Value is NaN");
    expect(() => isSubscriptionInputValid({ id: 1, subscriptionCostPerMonthInCents: -100 })).toThrow("non-negative number");
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
    expect(() => getDaysInMonth("2025-00")).toThrow('Invalid month number. Expected value from 01 to 12, but got "00".');
    expect(() => getDaysInMonth("2025-13")).toThrow('Invalid month number. Expected value from 01 to 12, but got "13".');
  });
});

describe("getDailyRate", () => {
  test("calculates daily rate correctly for a user", () => {
    const month = "2025-10"; // 31 days
    const subscription = { id: 1, subscriptionCostPerMonthInCents: 3100 };
    expect(getDailyRate(month, subscription)).toBeCloseTo(100);
  });
  test("handles floating point correctly", () => {
    const month = "2025-02"; // 28 days
    const subscription = { id: 2, subscriptionCostPerMonthInCents: 2800 };
    expect(getDailyRate(month, subscription)).toBeCloseTo(100);
  });
  test("calculates correct rate for February in leap year", () => {
    const month = "2024-02"; // 29 days (leap year)
    const subscription = { id: 1, subscriptionCostPerMonthInCents: 2900 };
    expect(getDailyRate(month, subscription)).toBeCloseTo(100);
  });
  test("handles zero cost subscription", () => {
    const month = "2025-01";
    const subscription = { id: 1, subscriptionCostPerMonthInCents: 0 };
    expect(getDailyRate(month, subscription)).toBe(0);
  });
});

describe("getDaysUsed", () => {
  test("calculates total active days for multiple users", () => {
    const month = "2025-10"; // 31 days
    const users = [
      { id: 1, dateActivated: "2025-10-01", dateDeactivated: "2025-10-15" }, // 15 days
      { id: 2, dateActivated: "2025-10-10", dateDeactivated: null }, // 22 days (10th to 31st)
    ];
    expect(getDaysUsed(month, users)).toBe(37); // 15 + 22
  });
  test("handles users activated before month starts", () => {
    const month = "2025-10";
    const users = [
      { id: 1, dateActivated: "2025-09-15", dateDeactivated: "2025-10-10" }, // 10 days in October
    ];
    expect(getDaysUsed(month, users)).toBe(10);
  });
  test("handles users deactivated after month ends", () => {
    const month = "2025-10";
    const users = [
      { id: 1, dateActivated: "2025-10-20", dateDeactivated: "2025-11-15" }, // 12 days in October (20th to 31st)
    ];
    expect(getDaysUsed(month, users)).toBe(12);
  });
  test("handles users active for entire month", () => {
    const month = "2025-10";
    const users = [
      { id: 1, dateActivated: "2025-09-01", dateDeactivated: null }, // All 31 days
    ];
    expect(getDaysUsed(month, users)).toBe(31);
  });
  test("handles users with null activation date", () => {
    const month = "2025-10";
    const users = [
      { id: 1, dateActivated: null, dateDeactivated: null }, // 0 days
      { id: 2, dateActivated: "2025-10-01", dateDeactivated: "2025-10-05" }, // 5 days
    ];
    expect(getDaysUsed(month, users)).toBe(5);
  });
  test("handles users activated after month ends", () => {
    const month = "2025-10";
    const users = [
      { id: 1, dateActivated: "2025-11-01", dateDeactivated: null }, // 0 days
    ];
    expect(getDaysUsed(month, users)).toBe(0);
  });
  test("handles users deactivated before month starts", () => {
    const month = "2025-10";
    const users = [
      { id: 1, dateActivated: "2025-08-01", dateDeactivated: "2025-09-30" }, // 0 days
    ];
    expect(getDaysUsed(month, users)).toBe(0);
  });
  test("handles empty users array", () => {
    const month = "2025-10";
    const users = [];
    expect(getDaysUsed(month, users)).toBe(0);
  });
  test("handles activation and deactivation on same day", () => {
    const month = "2025-10";
    const users = [
      { id: 1, dateActivated: "2025-10-15", dateDeactivated: "2025-10-15" }, // 1 day
    ];
    expect(getDaysUsed(month, users)).toBe(1);
  });
  test("handles complex scenario with multiple overlapping users", () => {
    const month = "2025-10"; // 31 days
    const users = [
      { id: 1, dateActivated: "2010-10-30", dateDeactivated: null }, // 31 days (active before month)
      { id: 2, dateActivated: "2025-10-05", dateDeactivated: null }, // 27 days (5th to 31st)
      { id: 3, dateActivated: "2025-10-15", dateDeactivated: "2025-10-25" }, // 11 days (15th to 25th)
      { id: 4, dateActivated: "2022-10-15", dateDeactivated: "2025-05-05" }, // 0 days (deactivated before month)
      { id: 5, dateActivated: null, dateDeactivated: null }, // 0 days
    ];
    expect(getDaysUsed(month, users)).toBe(69); // 31 + 27 + 11 + 0 + 0
  });
});

describe("Get total", () => {});

describe("Generate invoice", () => {});
