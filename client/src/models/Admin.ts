import api from "../services/axios";
import Agent from "./Agent";
import type { BuyJSON } from "./Buy";
import Buy from "./Buy";
import Investor, { type InvestorJSON } from "./Investor";
import type { ItemJSON } from "./Item";
import Item from "./Item";
import type { PackageJSON } from "./Package";
import Package from "./Package";
import type { TransactionJSON } from "./Transaction";
import Transaction from "./Transaction";
import Transfer from "./Transfer";
import type { TransferJSON } from "./Transfer";

type AdminJSON = {
  id?: string;
  name?: string;
  email?: string;
  balance?: number;
  agents?: Agent[];
  investors?: InvestorJSON[];
  transactions?: TransactionJSON[];
  transfers?: TransferJSON[];
  items?: ItemJSON[];
  packages?: PackageJSON[];
  buys?: BuyJSON[];
};

type InvestorsMap = {
  [key: string]: Investor;
};
type TransactionsMap = {
  [key: string]: Transaction;
};
type AgentsMap = {
  [key: string]: Agent;
};
type TransferMap = {
  [key: string]: Transfer;
};
type ItemMap = {
  [key: string]: Item;
};
type PackageMap = {
  [key: string]: Package;
};
type BuyMap = {
  [key: string]: Buy;
};

class Admin {
  #id: string;
  #balance: number;
  name: string;
  email: string;
  #investor_by_id: InvestorsMap;
  #transaction_by_id: TransactionsMap;
  #agent_by_id: AgentsMap;
  #transfer_by_id: TransferMap;
  #item_by_id: ItemMap;
  #package_by_id: PackageMap;
  #buy_by_id: BuyMap;

  constructor(adminJSON: AdminJSON) {
    this.#id = adminJSON.id ?? "";
    this.name = adminJSON.name ?? "";
    this.email = adminJSON.email ?? "";
    this.#balance = adminJSON.balance ?? 0;

    this.#investor_by_id = {};
    this.#transaction_by_id = {};
    this.#agent_by_id = {};
    this.#transfer_by_id = {};
    this.#item_by_id = {};
    this.#package_by_id = {};
    this.#buy_by_id = {};

    try {
      if (adminJSON.investors) {
        this.#investor_by_id = adminJSON.investors.reduce<InvestorsMap>(
          (acc, curr) => {
            if (curr.id) {
              acc[curr.id] = new Investor(curr, this);
            }
            return acc;
          },
          {},
        );
      }
      if (adminJSON.transactions) {
        this.#transaction_by_id =
          adminJSON.transactions.reduce<TransactionsMap>((acc, curr) => {
            if (curr.id) {
              acc[curr.id] = new Transaction(curr, this);
            }
            return acc;
          }, {});
      }
      if (adminJSON.agents) {
        this.#agent_by_id = adminJSON.agents.reduce<AgentsMap>((acc, curr) => {
          acc[curr.id] = new Agent(curr, this);
          return acc;
        }, {});
      }
      if (adminJSON.transfers) {
        this.#transfer_by_id = adminJSON.transfers.reduce<TransferMap>(
          (acc, curr) => {
            if (curr.id) {
              acc[curr.id] = new Transfer(curr, this);
            }
            return acc;
          },
          {},
        );
      }
      if (adminJSON.items) {
        this.#item_by_id = adminJSON.items.reduce<ItemMap>((acc, curr) => {
          if (curr.id) {
            acc[curr.id] = new Item(curr);
          }
          return acc;
        }, {});
      }
      if (adminJSON.packages) {
        this.#package_by_id = adminJSON.packages.reduce<PackageMap>(
          (acc, curr) => {
            if (curr.id) {
              acc[curr.id] = new Package(curr, this);
            }
            return acc;
          },
          {},
        );
      }
      if (adminJSON.buys) {
        this.#buy_by_id = adminJSON.buys.reduce<BuyMap>((acc, curr) => {
          if (curr.id) {
            acc[curr.id] = new Buy(curr, this);
          }
          return acc;
        }, {});
      }
    } catch (err) {
      console.error("Failed to parse investors!", err);
    }
  }

  get id(): string {
    return this.#id;
  }

  get balance(): number {
    return this.#balance;
  }

  get investors(): Investor[] {
    return Object.values(this.#investor_by_id).sort(
      (a, b) => b.balance - a.balance,
    );
  }
  get investors_length(): number {
    return Object.keys(this.#investor_by_id).length;
  }
  get transactions(): Transaction[] {
    return Object.values(this.#transaction_by_id);
  }
  get transactions_length(): number {
    return Object.keys(this.#transaction_by_id).length;
  }
  get agents(): Agent[] {
    return Object.values(this.#agent_by_id).sort(
      (a, b) => b.balance - a.balance,
    );
  }
  get agents_length(): number {
    return Object.keys(this.#agent_by_id).length;
  }
  get transfers(): Transfer[] {
    return Object.values(this.#transfer_by_id);
  }
  get items(): Item[] {
    return Object.values(this.#item_by_id);
  }
  get packages(): Package[] {
    return Object.values(this.#package_by_id);
  }

  get buys(): Buy[] {
    return Object.values(this.#buy_by_id);
    // .sort(
    //   (a, b) =>
    //     (new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    // );
  }

  get_investors(ids: string[]): Investor[] {
    const invs: Investor[] = ids
      .map((id) => this.#investor_by_id[id])
      .filter((i) => i);
    return invs || [];
  }
  get_agents(ids: string[]): Agent[] {
    const ages: Agent[] = ids
      .map((id) => this.#agent_by_id[id])
      .filter((a) => a);
    return ages;
  }

  add_investor(inv: Investor) {
    this.#investor_by_id[inv.id] = inv;
  }
  add_transaction(tra: Transaction) {
    this.#transaction_by_id[tra.id] = tra;
    if (tra.type === "deposit") {
      this.#balance += tra.amount;
      const inv = this.#investor_by_id[tra.investor_id];
      if (inv) {
        this.#investor_by_id[tra.investor_id].balance += tra.amount;
      }
    } else {
      this.#balance -= tra.amount;
      const inv = this.#investor_by_id[tra.investor_id];
      if (inv) {
        this.#investor_by_id[tra.investor_id].balance -= tra.amount;
      }
    }
  }
  add_agent(agent: Agent) {
    this.#agent_by_id[agent.id] = agent;
  }
  add_transfer(trf: Transfer) {
    this.#transfer_by_id[trf.id] = trf;
    if (trf.type === "refund") {
      this.#balance += trf.amount;
      const agnt = this.#agent_by_id[trf.agent_id];
      if (agnt) {
        this.#agent_by_id[trf.agent_id].balance -= trf.amount;
      }
    } else {
      this.#balance -= trf.amount;
      const agnt = this.#agent_by_id[trf.agent_id];
      if (agnt) {
        this.#agent_by_id[trf.agent_id].balance += trf.amount;
      }
    }
  }
  add_items(itms: Item[] = []) {
    for (const itm of itms) {
      this.#item_by_id[itm.id] = itm;
    }
  }
  add_packages(pkgs: Package[] = []) {
    for (const itm of pkgs) {
      this.#package_by_id[itm.id] = itm;
    }
  }
  add_buy(buy: Buy) {
    this.#buy_by_id[buy.id] = buy;
    const exits_agent = this.#agent_by_id[buy.agent?.id || ""];
    if (exits_agent || buy.agent?.id) {
      exits_agent.balance -= buy.total_cost;
    }
  }
  remove_item(i: string) {
    delete this.#item_by_id[i];
  }
  remove_package(i: number | string) {
    delete this.#package_by_id[i];
  }
  get_transactions(ids: string[]): Transaction[] {
    const trans: Transaction[] = ids
      .map((id) => this.#transaction_by_id[id])
      .filter((i) => i.id);
    return trans;
  }
  get_transactions_by_investor(investor_id: string): Transaction[] {
    return Object.values(this.#transaction_by_id).filter(
      (t) => t.investor_id === investor_id,
    );
  }
  get_transfer_by_agent(id: string): Transfer[] {
    return Object.values(this.#transfer_by_id).filter((t) => t.agent_id === id);
  }

  items_by_id(ids: number[]): Item[] {
    const itms: Item[] = [];
    ids.forEach((i) => {
      itms.push(this.#item_by_id[i]);
    });
    return itms;
  }

  static async getAdmins(): Promise<Admin[]> {
    try {
      const { data } = await api.get<AdminJSON[]>("/admin");

      return data.map((admin) => new Admin(admin));
    } catch (err) {
      console.error("Failed to fetch admins", err);
      return [];
    }
  }
}

export default Admin;
