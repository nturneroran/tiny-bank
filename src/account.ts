/**
 * A bank account. This is the base class that every account type extends.
 *
 * Domain rules this class is SUPPOSED to enforce (see the assignment handout):
 *  - The account number is assigned once when the account is opened and must
 *    never change afterward. Any part of the program is allowed to read it.
 *  - The balance may ONLY change through deposit / withdraw (and, in
 *    subclasses, applyInterest). No outside code may assign it directly.
 *  - You cannot withdraw more than you have (subclasses may relax this).
 *
 * Read the code carefully and compare it against those rules.
 */
export abstract class Account {
  public accountNumber: string;

  private readonly _holderName: string;

  public balance: number;

  protected readonly _history: string[] = [];

  constructor(accountNumber: string, holderName: string, initialBalance: number = 0) {
    if (initialBalance < 0) {
      throw new RangeError("Opening balance cannot be negative.");
    }
    this.accountNumber = accountNumber;
    this._holderName = holderName;
    this.balance = initialBalance;
    this._history.push(`Opened with $${initialBalance.toFixed(2)}`);
  }

  get holderName(): string {
    return this._holderName;
  }

  get history(): readonly string[] {
    return this._history;
  }

  deposit(amount: number): void {
    this.balance += amount;
    this._history.push(`Deposit: +$${amount.toFixed(2)}`);
  }

  deposit(amount: number, memo: string): void {
    this.balance += amount;
    this._history.push(`${memo}: +$${amount.toFixed(2)}`);
  }

  withdraw(amount: number): void {
    this.balance -= amount;
    this._history.push(`Withdrawal: -$${amount.toFixed(2)}`);
  }

  describe(): string {
    return "Account";
  }
}
