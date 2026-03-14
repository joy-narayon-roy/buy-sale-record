import type Admin from "./Admin";

type TransferJSON = {
  id?: string;
  type?: string;
  amount?: number;
  agent_id?: string;
  admin_id?: string;
  created_at?: string;
};
class Transfer {
  #id: string;
  type: "fund" | "refund";
  #amount: number;
  #agent_id: string;
  #admin_id: string;
  #admin_ref: Admin | null;
  created_at: string;
  constructor(t: TransferJSON, admin?: Admin) {
    this.#id = t.id || "";
    this.type = t.type === "fund" ? "fund" : "refund";
    this.#amount = t.amount || 0;
    this.#admin_ref = admin || null;
    this.#agent_id = t.agent_id || "";
    this.#admin_id = t.admin_id || "";
    this.created_at = t.created_at || "";
  }
  get id(): string {
    return this.#id;
  }
  get amount(): number {
    return this.#amount;
  }
  get agent_id(): string {
    return this.#agent_id;
  }
  get admin_id(): string {
    return this.#admin_id;
  }
  get admin(): Admin | null {
    return this.#admin_ref;
  }
  get date(): Date {
    return new Date(this.created_at);
  }
}
export { type TransferJSON };
export default Transfer;
