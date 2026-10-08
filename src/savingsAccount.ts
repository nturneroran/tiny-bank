import { Account } from "./account";

/**
 * A savings account. Adds an interest rate and the ability to apply interest.
 *
 * Domain rule (see the handout): the interest rate is a fraction (0.02 = 2%).
 * It must never be negative and is capped at 25%. Setting an invalid rate is
 * an error the class should reject.
 */
export class SavingsAccount extends Account {
  public interestRate: number;

  constructor(
    accountNumber: string,
    holderName: string,
    initialBalance: number,
    interestRate: number
  ) {
    super(accountNumber, holderName);
    this.interestRate = interestRate;
  }

  applyInterest(): void {
    const interest = this.balance * this.interestRate;
    this.balance += interest;
    this._history.push(`Interest applied: +$${interest.toFixed(2)}`);
  }

  describe(): string {
    return "Savings";
  }
}
