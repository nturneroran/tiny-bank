import { Account } from "./account";

/**
 * Holds the bank's accounts and coordinates operations across them.
 */
export class Bank {
  private readonly accounts: Map<string, Account> = new Map();

  openAccount(account: Account): void {
    if (this.accounts.has(account.accountNumber)) {
      throw new Error(`Account ${account.accountNumber} already exists.`);
    }
    this.accounts.set(account.accountNumber, account);
  }

  getAccount(accountNumber: string): Account {
    const account = this.accounts.get(accountNumber);
    if (!account) {
      throw new Error(`No account found with number ${accountNumber}.`);
    }
    return account;
  }

  listAccounts(): Account[] {
    return [...this.accounts.values()];
  }

  /**
   * TODO (Task 3): Implement transfer.
   *
   * Move `amount` from the account numbered `fromNumber` to the one numbered
   * `toNumber`. Requirements:
   *   - Use getAccount(...) to look both accounts up. (It already throws a
   *     helpful error if a number is unknown — let that error propagate.)
   *   - Withdraw from the source, then deposit into the destination.
   *   - If the withdrawal fails (insufficient funds / overdraft exceeded), the
   *     deposit must NOT happen — no money may be created out of thin air.
   *   - Reuse the existing deposit / withdraw methods; do not touch balances
   *     directly.
   */
  transfer(fromNumber: string, toNumber: string, amount: number): void {
    const from = this.getAccount(fromNumber);
    const to = this.getAccount(toNumber);
    from.withdraw(amount);
    to.deposit(amount);
  }
}
