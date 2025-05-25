const { getDaysInMonth, getDailyRate, getDaysUsed, getTotal, generateInvoice } = require("./index.js");

const month = "2025-10";
const users = [
  { id: 1, subscriptionCostPerMonth: 6000, dateActivated: "2010-10-30", dateDeactivated: null },
  { id: 2, subscriptionCostPerMonth: 5000, dateActivated: "2025-10-05", dateDeactivated: null },
  { id: 3, subscriptionCostPerMonth: 4000, dateActivated: "2025-10-15", dateDeactivated: "2025-10-25" },
  { id: 4, subscriptionCostPerMonth: 3000, dateActivated: "2022-10-15", dateDeactivated: "2025-05-05" },
  { id: 5, subscriptionCostPerMonth: 2000, dateActivated: null, dateDeactivated: null },
];
