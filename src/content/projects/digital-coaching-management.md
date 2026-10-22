---
title: "Digital Coaching Spreadsheet Automation"
description: "A small Google Apps Script helper that adds a missing current-date column to the Attendance sheet and a missing current-month column to the Payment sheet."
tags: ["Google Apps Script", "Google Sheets", "Education", "Workflow automation"]
repo: "https://github.com/barshan94/digital-coaching-management-system"
status: "in-progress"
featured: true
accent: "default"
---

A lightweight spreadsheet automation experiment for a coaching workflow, using Google Sheets as the data layer and Google Apps Script for two specific tasks.

## Implemented in the current script

- Adds a new header in the **Attendance** sheet for today's date (Bangladesh time) when that date is not already present.
- Adds a new header in the **Payment** sheet for the current month when that month is not already present.
- Avoids creating a duplicate date or month header when it already exists.

## Scope and limitations

The current script does not implement a complete student registry, attendance-marking system, payment-processing workflow, report generation, WhatsApp messaging, or a standalone management dashboard. The portfolio animation uses illustrative sample rows to explain the spreadsheet context; only the two column-header automations above are implemented in the linked source.

[View the source repository](https://github.com/barshan94/digital-coaching-management-system)
