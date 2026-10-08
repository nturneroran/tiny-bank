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
