import { Bank } from "./bank";
import { Account } from "./account";
import { SavingsAccount } from "./savingsAccount";
import { CheckingAccount } from "./checkingAccount";

/**
 * The browser UI. It only *uses* the model classes — it never reaches into
 * their private state. Every model call is wrapped in try/catch so a thrown
 * error becomes a red status message instead of crashing the page.
 *
 * You should not need to change this file to complete the assignment.
 */
export class BankApp {
  private readonly root: HTMLElement;
  private readonly bank: Bank;
  private status: { message: string; kind: "ok" | "error" } | null = null;

  constructor(root: HTMLElement) {
    this.root = root;
    this.bank = new Bank();
    this.bank.openAccount(new SavingsAccount("SAV-001", "Ada Lovelace", 500, 0.02));
    this.bank.openAccount(new CheckingAccount("CHK-002", "Alan Turing", 200, 300));
  }

  start(): void {
    this.render();
  }

  /** Run a model action, turning any thrown error into a status message. */
  private run(action: () => void): void {
    this.status = null;
    try {
      action();
    } catch (err) {
      this.status = { message: (err as Error).message, kind: "error" };
    }
    this.render();
  }

  private amountFor(accountNumber: string, selector: string): number {
    const input = this.root.querySelector<HTMLInputElement>(
      `${selector}[data-acct="${accountNumber}"]`
    );
    const value = Number(input?.value);
    if (!input || input.value.trim() === "" || Number.isNaN(value)) {
      throw new Error("Enter a valid number first.");
    }
    return value;
  }

  private render(): void {
    const accounts = this.bank.listAccounts();
    this.root.innerHTML = `
      <header>
        <h1>🏦 Tiny Bank</h1>
        <span class="tag">OOP practice</span>
      </header>
      <main>
        <section id="accounts">
          <h2>Accounts</h2>
          <div class="cards">
            ${accounts.map((a) => this.renderCard(a)).join("")}
          </div>
        </section>
        <section id="transfer">
          <h2>Transfer</h2>
          ${this.renderTransfer(accounts)}
          ${this.renderStatus()}
        </section>
      </main>
    `;
    this.attach(accounts);
  }

  private renderCard(a: Account): string {
    const savings = a instanceof SavingsAccount ? a : null;
    const checking = a instanceof CheckingAccount ? a : null;
    const negative = a.balance < 0 ? " neg" : "";
    return `
      <div class="card">
        <div class="card-head">
          <span class="acct-type">${a.describe()}</span>
          <span class="acct-no">${a.accountNumber}</span>
        </div>
        <div class="holder">${a.holderName}</div>
        <div class="balance${negative}">$${a.balance.toFixed(2)}</div>
        ${savings ? `<div class="meta">Interest rate: ${(savings.interestRate * 100).toFixed(2)}%</div>` : ""}
        ${checking ? `<div class="meta">Overdraft limit: $${checking.overdraftLimit.toFixed(2)}</div>` : ""}
        <div class="controls">
          <input type="number" class="amount" data-acct="${a.accountNumber}" placeholder="amount" />
          <button data-action="deposit" data-acct="${a.accountNumber}">Deposit</button>
          <button data-action="withdraw" data-acct="${a.accountNumber}">Withdraw</button>
          ${savings ? `<button data-action="interest" data-acct="${a.accountNumber}">Apply interest</button>` : ""}
        </div>
        ${
          savings
            ? `<div class="controls">
                 <input type="number" step="0.01" class="rate" data-acct="${a.accountNumber}" placeholder="new rate e.g. 0.03" />
                 <button data-action="setrate" data-acct="${a.accountNumber}">Set rate</button>
               </div>`
            : ""
        }
        <ul class="history">
          ${a.history.slice(-5).reverse().map((h) => `<li>${h}</li>`).join("")}
        </ul>
      </div>`;
  }

  private renderTransfer(accounts: Account[]): string {
    const opts = accounts
      .map((a) => `<option value="${a.accountNumber}">${a.accountNumber} — ${a.holderName}</option>`)
      .join("");
    const optsTo = accounts
      .map((a, i) => `<option value="${a.accountNumber}" ${i === 1 ? "selected" : ""}>${a.accountNumber} — ${a.holderName}</option>`)
      .join("");
    return `
      <div class="controls col">
        <label>From <select id="xfer-from">${opts}</select></label>
        <label>To <select id="xfer-to">${optsTo}</select></label>
        <input type="number" id="xfer-amount" placeholder="amount" />
        <button data-action="transfer">Transfer</button>
      </div>`;
  }

  private renderStatus(): string {
    if (!this.status) return "";
    return `<div class="status ${this.status.kind}">${this.status.message}</div>`;
  }

  private attach(_accounts: Account[]): void {
    this.root.querySelectorAll<HTMLButtonElement>("button[data-action]").forEach((btn) => {
      btn.addEventListener("click", () => this.handle(btn));
    });
  }

  private handle(btn: HTMLButtonElement): void {
    const action = btn.dataset.action!;
    const acctNo = btn.dataset.acct;

    if (action === "transfer") {
      this.run(() => {
        const from = this.root.querySelector<HTMLSelectElement>("#xfer-from")!.value;
        const to = this.root.querySelector<HTMLSelectElement>("#xfer-to")!.value;
        const input = this.root.querySelector<HTMLInputElement>("#xfer-amount")!;
        const amount = Number(input.value);
        if (input.value.trim() === "" || Number.isNaN(amount)) {
          throw new Error("Enter a valid transfer amount first.");
        }
        this.bank.transfer(from, to, amount);
        this.status = { kind: "ok", message: `Transferred $${amount.toFixed(2)} from ${from} to ${to}.` };
      });
      return;
    }

    if (!acctNo) return;
    const account = this.bank.getAccount(acctNo);

    this.run(() => {
      switch (action) {
        case "deposit": {
          const amount = this.amountFor(acctNo, "input.amount");
          account.deposit(amount);
          this.status = { kind: "ok", message: `Deposited $${amount.toFixed(2)} into ${acctNo}.` };
          break;
        }
        case "withdraw": {
          const amount = this.amountFor(acctNo, "input.amount");
          account.withdraw(amount);
          this.status = { kind: "ok", message: `Withdrew $${amount.toFixed(2)} from ${acctNo}.` };
          break;
        }
        case "interest": {
          (account as SavingsAccount).applyInterest();
          this.status = { kind: "ok", message: `Applied interest to ${acctNo}.` };
          break;
        }
        case "setrate": {
          const rate = this.amountFor(acctNo, "input.rate");
          (account as SavingsAccount).interestRate = rate;
          this.status = { kind: "ok", message: `Set rate on ${acctNo} to ${(rate * 100).toFixed(2)}%.` };
          break;
        }
      }
    });
  }
}
