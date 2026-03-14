import type Admin from "./Admin";

type TransactionJSON = {
  id?: string;
  type?: string;
  amount?: number;
  admin_id?: string;
  investor_id?: string;
  created_at?: string;
};
class Transaction {
  #id: string;
  type: "deposit" | "withdraw" | "unnkown";
  amount: number;
  #admin_id: string;
  #investor_id: string;
  #created_at: string;
  #admin_ref: Admin | null;
  constructor(trJSON: TransactionJSON, admin?: Admin) {
    this.#id = trJSON.id || "";
    this.amount = trJSON.amount || 0;
    this.#admin_id = trJSON.admin_id || "";
    this.#investor_id = trJSON.investor_id || "";
    this.#created_at = trJSON.created_at || "";
    this.#admin_ref = admin || null;
    switch (trJSON.type) {
      case "deposit":
        this.type = "deposit";
        break;
      case "withdraw":
        this.type = "withdraw";
        break;

      default:
        this.type = "unnkown";
        break;
    }
  }
  get id(): string {
    return this.#id;
  }
  get admin(): Admin | null {
    return this.#admin_ref;
  }
  get admin_id(): string {
    return this.#admin_id;
  }
  get investor_id(): string {
    return this.#investor_id;
  }
  get created_at(): string {
    return this.#created_at;
  }
  get date(): Date {
    return new Date(this.#created_at);
  }
}

export { type TransactionJSON };
export default Transaction;
