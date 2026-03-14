import type Admin from "./Admin";
import type Transaction from "./Transaction";

type InvestorJSON = {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  status?: string;
  admin_id?:string
  balance?: number;
  transactions?: unknown;
};
class Investor {
  #id: string;
  status: string;
  name: string;
  email: string;
  balance: number;
  #admin_ref: Admin | null;
  constructor(investorJSON: InvestorJSON, admin?: Admin) {
    this.#id = investorJSON.id || "";
    this.status = investorJSON.status || "";
    this.name = investorJSON.name || "Unknow Investor";
    this.balance = investorJSON.balance || 0;
    this.email = investorJSON.email || "";
    this.#admin_ref = admin || null;
  }
  get id(): string {
    return this.#id;
  }
  get admin(): Admin | null {
    return this.#admin_ref;
  }

  get transactions(): Transaction[] {
    const t = this.#admin_ref?.get_transactions_by_investor(this.#id) || [];
    return t.sort((a, b) => b.date.getTime() - a.date.getTime());
  }
}

export { type InvestorJSON };
export default Investor;
