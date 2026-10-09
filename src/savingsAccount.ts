import { Account } from "./account";

/**
 * A savings account. Adds an interest rate and the ability to apply interest.
 *
 * Domain rule (see the handout): the interest rate is a fraction (0.02 = 2%).
 * It must never be negative and is capped at 25%. Setting an invalid rate is
 * an error the class should reject.
 */
export class SavingsAccount extends Account {
  private _interestRate: number = 0;

  constructor(
    accountNumber: string,
    holderName: string,
    initialBalance: number,
    interestRate: number
  ) {
    super(accountNumber, holderName, initialBalance);
    this.interestRate = interestRate;
  }

  get interestRate(): number {
    return this._interestRate;
  }

  set interestRate(rate: number) {
    if (!Number.isFinite(rate) || rate < 0 || rate > 0.25) {
      throw new RangeError("Interest rate must be between 0 and 0.25.");
    }
    this._interestRate = rate;
  }

  applyInterest(): void {
    const interest = this.balance * this.interestRate;
    this._balance += interest;
    this._history.push(`Interest applied: +$${interest.toFixed(2)}`);
  }

  describe(): string {
    return "Savings";
  }
}
