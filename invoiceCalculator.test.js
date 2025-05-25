const { describe, test, expect } = require("@jest/globals");
const InvoiceCalculator = require("./invoiceCalculator.js");

describe("InvoiceCalculator", () => {
  const validUsers = [
    { id: 1, dateActivated: "2025-01-01", dateDeactivated: null },
    { id: 2, dateActivated: null, dateDeactivated: null },
  ];
  const validSubscription = { id: 1, subscriptionCostPerMonthInCents: 1000 };

  describe("validateMonth", () => {
    test("accepts valid months", () => {
      expect(() => InvoiceCalculator.validateMonth("2025-01")).not.toThrow();
    });

    test("throws error for invalid months", () => {
      expect(() => InvoiceCalculator.validateMonth(2025)).toThrow(TypeError);
      expect(() => InvoiceCalculator.validateMonth("")).toThrow();
      expect(() => InvoiceCalculator.validateMonth("2025-13")).toThrow();
      expect(() => InvoiceCalculator.validateMonth("2025-1")).toThrow();
    });
  });

  describe("validateDate", () => {
    test("accepts valid dates", () => {
      expect(() => InvoiceCalculator.validateDate("2024-02-29")).not.toThrow();
    });

    test("throws error for invalid dates", () => {
      expect(() => InvoiceCalculator.validateDate("2025-02-30")).toThrow("not a valid calendar date");
      expect(() => InvoiceCalculator.validateDate("2025-00-01")).toThrow();
      expect(() => InvoiceCalculator.validateDate("abcd-01-01")).toThrow();
    });
  });

  describe("validateUsers", () => {
    test("accepts valid users", () => {
      expect(() => InvoiceCalculator.validateUsers(validUsers)).not.toThrow();
    });

    test("throws error on invalid user structure", () => {
      expect(() => InvoiceCalculator.validateUsers(null)).toThrow(TypeError);
      expect(() => InvoiceCalculator.validateUsers([{}])).toThrow("valid integer ID");
      expect(() => InvoiceCalculator.validateUsers([{ id: "abc" }])).toThrow("valid integer ID");
      expect(() => InvoiceCalculator.validateUsers([{ id: 1, dateActivated: "invalid-date" }])).toThrow();
    });
  });

  describe("validateSubscription", () => {
    test("accepts valid subscription", () => {
      expect(() => InvoiceCalculator.validateSubscription(validSubscription)).not.toThrow();
    });

    test("throws error for invalid subscription", () => {
      expect(() => InvoiceCalculator.validateSubscription(null)).toThrow(TypeError);
      expect(() => InvoiceCalculator.validateSubscription({ id: 1 })).toThrow();
      expect(() => InvoiceCalculator.validateSubscription({ id: "abc", subscriptionCostPerMonthInCents: 1000 })).toThrow();
      expect(() => InvoiceCalculator.validateSubscription({ id: 1, subscriptionCostPerMonthInCents: -100 })).toThrow();
    });
  });

  describe("getDaysInMonth", () => {
    test("returns correct days", () => {
      const calc = new InvoiceCalculator("2025-02", validUsers, validSubscription);
      expect(calc.getDaysInMonth()).toBe(28);

      const leap = new InvoiceCalculator("2024-02", validUsers, validSubscription);
      expect(leap.getDaysInMonth()).toBe(29);
    });
  });

  describe("getDailyRate", () => {
    test("calculates rate correctly", () => {
      const sub = { id: 1, subscriptionCostPerMonthInCents: 3100 };
      const calc = new InvoiceCalculator("2025-10", validUsers, sub);
      expect(calc.getDailyRate()).toBeCloseTo(100);
    });
  });

  describe("getUserActiveDays", () => {
    const calc = new InvoiceCalculator("2025-10", [], validSubscription);
    const start = new Date(Date.UTC(2025, 9, 1));
    const end = new Date(Date.UTC(2025, 9, 31));

    test("handles user active entire month", () => {
      const user = { id: 1, dateActivated: "2025-01-01", dateDeactivated: null };
      expect(calc.getUserActiveDays(user, start, end)).toBe(31);
    });

    test("handles partial activation", () => {
      const user = { id: 2, dateActivated: "2025-10-15", dateDeactivated: "2025-10-20" };
      expect(calc.getUserActiveDays(user, start, end)).toBe(6);
    });

    test("handles activation after deactivation", () => {
      const user = { id: 3, dateActivated: "2025-11-01", dateDeactivated: "2025-11-10" };
      expect(calc.getUserActiveDays(user, start, end)).toBe(0);
    });

    test("returns 0 if no activation date", () => {
      const user = { id: 4, dateActivated: null, dateDeactivated: null };
      expect(calc.getUserActiveDays(user, start, end)).toBe(0);
    });
  });

  describe("getTotalActiveDays", () => {
    test("sums active days correctly", () => {
      const users = [
        { id: 1, dateActivated: "2025-10-01", dateDeactivated: "2025-10-10" },
        { id: 2, dateActivated: "2025-10-10", dateDeactivated: null },
        { id: 3, dateActivated: null, dateDeactivated: null },
      ];
      const calc = new InvoiceCalculator("2025-10", users, validSubscription);
      expect(calc.getTotalActiveDays()).toBe(32);
    });
  });

  describe("generateInvoiceTotal", () => {
    test("calculates final invoice total", () => {
      const users = [
        { id: 1, dateActivated: "2025-10-01", dateDeactivated: "2025-10-15" },
        { id: 2, dateActivated: "2025-10-10", dateDeactivated: null },
      ];
      const sub = { id: 1, subscriptionCostPerMonthInCents: 6200 };
      const calc = new InvoiceCalculator("2025-10", users, sub);
      expect(calc.generateInvoiceTotal()).toBeCloseTo((15 + 22) * 2);
    });
  });
});
