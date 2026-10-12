---
title: "Money Calculator"
description: "A comprehensive personal financial management app. Track income, expenses, accounts, loans, investments, deposits, tuition payments, budgets, and goals. Includes an AI assistant for financial queries, cash-flow forecasts, net-worth trends, and financial insights."
tags: ["Next.js 16", "TypeScript", "Supabase", "PostgreSQL", "React 19", "Tailwind", "Recharts"]
repo: "https://github.com/barshan94/money-calculator"
status: "completed"
featured: true
accent: "accent"
---

A personal financial management web application built for clarity, correctness, and auditability. Every number shown in the UI comes from real database records — nothing is hardcoded or estimated.

**Core capabilities:**

- Track income, expenses, and account balances across multiple accounts
- Manage loans (lent and borrowed) with full repayment lifecycle
- Track investments, deposits, and long-term assets (land, property)
- Record tuition students and monthly payment status
- Set budgets, goals, and recurring transactions
- View cash-flow forecasts, net-worth trends, and financial insights
- All financial mutations are auditable and reversible where appropriate

**Architecture:** Next.js App Router with server components fetching data, client components handling interactions, and all financial mutations going through PostgreSQL RPC functions. Auth via Supabase SSR, RLS on every table, cron-based recurring transaction processing.