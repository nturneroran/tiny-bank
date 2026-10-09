# Tiny Bank — Starter

A small browser app for a make-believe bank. It opens two accounts on load — a
**savings** account and a **checking** account — and lets you deposit,
withdraw, apply interest, set an interest rate, and transfer between them.

The app runs, but it does **not** behave the way the domain rules require, and
one feature (transfer) is not built yet. Your job is to read the code, find the
problems, fix them, and finish the missing pieces.

## Running it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

To type-check / build (this surfaces at least one of the problems):

```bash
npm run build
```

## Where to look

| File | Responsibility |
|------|----------------|
| `src/account.ts` | The `Account` base class: balance, deposit, withdraw, history. |
| `src/savingsAccount.ts` | `SavingsAccount`: interest rate + `applyInterest`. |
| `src/checkingAccount.ts` | `CheckingAccount`: overdraft limit + its withdrawal rule. |
| `src/bank.ts` | The `Bank`: holds accounts, and the `transfer` you must implement. |
| `src/bankApp.ts` | The UI. **You should not need to change this file.** |
| `src/main.ts` | Entry point. |

Each model file's comment header restates the **domain rules** that part of the
code is supposed to follow. Compare the code against those rules. See the
assignment handout for exactly what to write up and hand in.

## Assignment

**Name: Nicholas Turner**  
Date: 10/8/2026

### Writeup

| # | Location | Bug / Design | Rule broken + fix |
| :---- | :---- | :---- | :---- |
| 1 | `src/account.ts`, `accountNumber` | Design flaw | R1 / immutability: made the account number `public readonly` so it can be read but not changed after construction. |
| 2 | `src/account.ts`, `balance` | Design flaw | R2 / encapsulation: moved mutable storage to protected `_balance` and exposed a read-only getter, preventing outside code from assigning the balance. |
| 3 | `src/account.ts`, `deposit` | Bug / design flaw | The two method bodies caused the TypeScript duplicate implementation error. Replaced them with overload signatures and one implementation that supports an optional memo. |
| 4 | `src/account.ts`, `deposit` | Bug | R3: reject zero, negative, non-finite, and otherwise invalid deposit amounts before changing the balance. |
| 5 | `src/account.ts`, `withdraw` | Bug | R3: reject non-positive amounts and withdrawals larger than the normal account balance. |
| 6 | `src/savingsAccount.ts`, constructor | Bug | R2: pass `initialBalance` to `super(...)` so a savings account keeps its real opening balance. |
| 7 | `src/savingsAccount.ts`, `interestRate` | Bug / design flaw | R4 / encapsulation: added a validated getter/setter that accepts only rates from 0 through 0.25. |
| 8 | `src/checkingAccount.ts`, `withdrawl` | Bug | R5 / method overriding: corrected the misspelling and used `override withdraw(...)`, enforcing the overdraft limit through normal account calls. |
| 9 | `src/bank.ts`, `transfer` | Missing feature | R6: look up both accounts, withdraw first, and deposit only after a successful withdrawal, reusing the account methods. |
