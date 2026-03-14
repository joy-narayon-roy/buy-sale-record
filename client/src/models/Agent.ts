import type Admin from "./Admin";
import type Buy from "./Buy";
import type Transfer from "./Transfer";

type AgentJSON = {
  id?: string;
  name?: string;
  email?: string;
  status?: string;
  password?: string;
  admin_id?: string;
  balance?: number;
};
class Agent {
  #id: string;
  name: string;
  balance: number;
  status: string;
  email: string;
  #admin_ref: Admin | null;
  constructor(agentJSON: AgentJSON, admin?: Admin) {
    this.#id = agentJSON.id || "";
    this.#admin_ref = admin || null;
    this.balance = agentJSON.balance || 0;
    this.name = agentJSON.name || "";
    this.status = agentJSON.status ?? "active";
    this.email = agentJSON.email ?? "";
  }

  get id(): string {
    return this.#id;
  }

  get transfers(): Transfer[] {
    // return this.admin?.transfers || [];
    return this.admin?.get_transfer_by_agent(this.#id) || [];
  }

  get admin(): Admin | null {
    return this.#admin_ref;
  }
  get buys(): Buy[] {
    return this.#admin_ref?.buys.filter((b) => b.agent?.id === this.#id) || [];
  }
}

export type { AgentJSON };
export default Agent;
