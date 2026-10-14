---
title: "Money Calculator"
description: "A personal finance application built around ledger-connected transactions, account balances, loan lifecycles, tuition payments, and traceable financial corrections."
tags: ["Next.js 16", "TypeScript", "Supabase", "PostgreSQL", "React 19", "Tailwind", "Recharts"]
repo: "https://github.com/barshan94/money-calculator"
status: "completed"
featured: true
accent: "accent"
---

Money Calculator is a personal finance application designed to organize everyday financial activity while preserving consistency between transactions, account balances, and related records.

The central engineering challenge is ensuring financial changes remain consistent when a transaction is edited, voided, repaid, or corrected.

## The problem

Financial records become unreliable when balances and related records drift apart. Editing a transaction should not leave its previous effect behind, and recording a repayment should update the relevant outstanding balance.

The application explores these challenges through connected financial workflows, database-backed operations, and explicit lifecycle management.

## Core workflows

- **Transaction integrity:** create, update, and void transactions while accounting for their effects on financial balances.
- **Loans and repayments:** track money lent or borrowed, record repayments, and maintain related loan records and outstanding amounts.
- **Tuition tracking:** manage student payment records, payment history, and outstanding tuition amounts.
- **Accounts and balances:** organize financial activity across accounts and connect balances to recorded transactions.
- **Traceable corrections:** support reversible financial changes rather than treating corrections as isolated edits.

## Engineering approach

### Financial consistency

A transaction change can affect an account balance or a related obligation. The application emphasizes coordinated database operations and consistency across these relationships.

### Explicit financial lifecycles

Loans and repayments have relationships that need to remain coherent as activity is recorded. Explicit workflows help prevent repayments or corrections from becoming disconnected from the underlying obligation.

### Authentication and access control

The application uses Supabase SSR authentication and PostgreSQL row-level security policies to support authenticated access to user financial data.

### Testing and verification

The development process includes unit and database integration tests for loan lifecycle handling, settlement, balance integrity, transaction corrections, reversal audit trails, and tuition payment history.

## Technology

- **Application:** Next.js, React, TypeScript
- **Database and security:** Supabase, PostgreSQL, server-side authentication, row-level security
- **Interface and visualization:** Tailwind CSS, Recharts
- **Quality assurance:** Vitest and database integration testing

## Project status

Money Calculator is an evolving personal software project. Its implemented workflows and tests demonstrate the current engineering focus; planned features and reporting capabilities should not be assumed complete without verification against the current repository.

[View the source code on GitHub](https://github.com/barshan94/money-calculator)
