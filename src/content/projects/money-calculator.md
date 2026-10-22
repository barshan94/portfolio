---
title: "Money Calculator"
description: "A personal-finance platform with a double-entry ledger, auditable transaction corrections, full loan and tuition lifecycles, asset tracking, financial planning, reports, and forecasting."
tags: ["Next.js 16", "TypeScript", "React 19", "Supabase", "PostgreSQL", "Tailwind CSS", "Recharts", "Vitest", "Playwright"]
repo: "https://github.com/barshan94/money-calculator"
status: "in-progress"
featured: true
accent: "accent"
---

Money Calculator is a personal financial management application designed to bring everyday bookkeeping, financial obligations, planning, and analysis into one connected system. It is built around a central rule: balances should follow the underlying financial records, and important corrections should remain traceable.

## The problem

Personal-finance tools become hard to trust when an edited transaction leaves an old balance effect behind, repayments become disconnected from the original loan, or expected income is mistaken for money already available. Money Calculator models these relationships explicitly instead of treating each screen as a separate calculator.

## Product capabilities

### 1. Accounts, transactions, and double-entry ledger

- Record income, expenses, transfers, donations, and opening balances across cash, bank, and mobile financial-service accounts.
- Organize transactions with categories connected to ledger accounts.
- Derive balances from transaction entries rather than relying on unrelated manually maintained totals.
- Validate that posted transactions have balanced debit and credit entries.
- Edit, void, and reverse financial activity while preserving the original event and audit history.

### 2. Full loan lifecycle

- Record money lent (receivable assets) and money borrowed (payable liabilities).
- Keep multiple loans for the same contact while retaining each loan and its repayment relationships.
- Track principal, remaining balance, status, partial repayments, and settlement.
- Edit repayments or cancel them through linked reversal records; cancelled repayments no longer count toward the outstanding balance.
- Connect loan creation and repayment to normal financial transactions.

### 3. Tuition and payment collection

- Manage students, monthly fees, due dates, and monthly payment records.
- Support paid, partial, and unpaid states with accumulated payment history and outstanding dues.
- Keep expected but unpaid tuition separate from available cash.
- Connect collected payments to financial accounts and provide reliability/reminder workflows.

### 4. Deposits, investments, and long-term assets

- Manage deposits, principal, interest, maturity information, withdrawals, and account integration.
- Track investment purchases and sales, current value, performance, returns, and close/archive lifecycle.
- Record land and property with cost basis, acquisition costs, sales, and gain/loss accounting.
- Keep asset-related cash movements connected to ledger entries.

### 5. Budgets, goals, and recurring activity

- Set category-based budgets and monitor spending, progress, and remaining amounts.
- Create savings goals, track progress, and model goal forecasts.
- Schedule recurring income or expenses, pause or edit schedules, and process due items into ordinary transactions.
- Track eligible-income donation targets and amounts contributed.

### 6. Reporting and financial intelligence

- Review account balances, income and expenses, category spending, cash flow, loans, deposits, investments, goals, and net worth.
- Explore monthly trends, liquidity and financial-health indicators, and financial insights.
- Calculate cash-flow, net-worth, and goal forecasts, investment analytics, budget intelligence, and what-if scenarios.
- Use these calculations to explain possible outcomes; they do not silently mutate financial records.

### 7. Search, receipts, and application access

- Search across financial records including transactions, loans, accounts, students, deposits, investments, and long-term assets.
- Attach receipts to supported financial resources.
- Use authenticated sessions and a Progressive Web App foundation for a more app-like experience on supported devices.

## Engineering and data integrity

### Ledger-first design

Financial records are the source of truth. A posted transaction must balance; an invalid correction should not leave its previous effect in place. Voids and repayment cancellations preserve an audit trail through explicit reversal relationships.

### Database-enforced security

The application uses Supabase authentication, PostgreSQL, Row Level Security, and ownership-checked RPC functions. Financial mutations are routed through database functions that validate authentication and related records rather than trusting UI-only checks. The service-role key is intended for server-side use only.

### Testing strategy

The repository includes Vitest unit tests, database integration tests against Supabase RPCs, financial-invariant checks, and Playwright end-to-end tests. Coverage includes transaction reversal, account-balance integrity, loan settlement and repayment cancellation, tuition payment history, cross-module relationships, and authorization boundaries. Full browser verification is maintained separately from unit and integration test claims.

## Technology

- **Application:** Next.js App Router, React, TypeScript
- **Database and authentication:** Supabase, PostgreSQL, Supabase SSR Auth
- **Interface and charts:** Tailwind CSS, shadcn/ui, Recharts
- **Testing:** Vitest, PostgreSQL/Supabase integration tests, Playwright
- **Delivery:** GitHub Actions and Vercel workflows

## Project status

Money Calculator is an evolving personal project. The repository documents an extensive set of implemented financial modules, but deployment readiness and individual browser flows should be judged from current build and test results rather than assuming every planned feature is complete.

[Explore the source code on GitHub](https://github.com/barshan94/money-calculator)
