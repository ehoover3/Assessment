# Invoice Calculator

This Node.js module calculates the total invoice amount for a subscription in a given month, based on user activation and deactivation dates. It includes validation logic for inputs, date handling in UTC, and prorated costs.

# Features

1. Validates subscription, user, and month inputs
2. Calculates how many days each user was active in a specified month
3. Computes total invoice in dollars

# Coordinated Universal Time (UTC)

All date calculations in this module are performed in UTC to avoid errors due to daylight saving time or time zones.

### UTC Documentation

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
