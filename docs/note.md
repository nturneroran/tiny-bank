# Notes for working through the repo
Issues:
- Can deposit a negative amount
    - Results in no overdraft charge
- Withdrawing more than your overdraft limit is fine
- No checks on interest rate
- Can deposit negative amounts
- Can withdraw negative amounts
- 
```bash
mac:tiny-bank nicholasturner$ npm run build

> tiny-bank-starter@1.0.0 build
> tsc && vite build

src/account.ts:40:3 - error TS2393: Duplicate function implementation.

40   deposit(amount: number): void {
     ~~~~~~~

src/account.ts:45:3 - error TS2393: Duplicate function implementation.

45   deposit(amount: number, memo: string): void {
     ~~~~~~~


Found 2 errors in the same file, starting at: src/account.ts:40
```
