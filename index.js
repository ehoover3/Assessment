const InvoiceCalculator = require("./index.js");

const month = "2025-10";
const users = [
  { id: 1, dateActivated: "2010-10-30", dateDeactivated: null },
  { id: 2, dateActivated: "2025-10-05", dateDeactivated: null },
  { id: 3, dateActivated: "2025-10-15", dateDeactivated: "2025-10-25" },
  { id: 4, dateActivated: "2022-10-15", dateDeactivated: "2025-05-05" },
  { id: 5, dateActivated: null, dateDeactivated: null },
];
const subscription = { id: 1, subscriptionCostPerMonthInCents: 5000 };

const calculator = new InvoiceCalculator(month, users, subscription);
const total = calculator.generateInvoiceTotal();
console.log(`Invoice total: $${total}`);
