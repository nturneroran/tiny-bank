import { Account } from "./account";

/**
 * A checking account. Adds an overdraft limit and is meant to relax the
 * withdrawal rule.
 *
 * Domain rule (see the handout): the balance may go negative, but never below
 * -overdraftLimit. The overdraft limit is fixed when the account is opened.
 *
 * Try withdrawing more than the balance from the checking account in the UI and
 * watch what actually happens.
 */
export class CheckingAccount extends Account {
  public readonly overdraftLimit: number;

  constructor(
    accountNumber: string,
    holderName: string,
    initialBalance: number,
    overdraftLimit: number
  ) {
    super(accountNumber, holderName, initialBalance);
    this.overdraftLimit = overdraftLimit;
  }

  override withdraw(amount: number): void {
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new RangeError("Withdrawal amount must be positive.");
    }
    if (amount > this._balance + this.overdraftLimit) {
      throw new Error(
        `Overdraft limit exceeded: cannot withdraw $${amount.toFixed(2)} ` +
          `(balance $${this.balance.toFixed(2)}, overdraft $${this.overdraftLimit.toFixed(2)}).`
      );
    }
    this._balance -= amount;
    this._history.push(`Withdrawal: -$${amount.toFixed(2)}`);
  }

  describe(): string {
    return "Checking";
  }
}
