import type Admin from "./Admin";
import type Agent from "./Agent";
import type Item from "./Item";
type BuyItemJSON = {
  buy_id: number;
  item_id: number;
  quantity: number;
};
type BuyJSON = {
  id?: number;
  agent_id?: string;
  total_cost?: number;
  items?: BuyItemJSON[];
  created_at?: string;
};
type BuyItem = {
  quantity: number;
  item: Item;
};
class Buy {
  #id: number;
  #admin: Admin | null;
  #agent_id: string;
  total_cost: number;
  #items: { [key: number]: number }; // {item_id:quantity}
  created_at: string;
  constructor(buy: BuyJSON, admn?: Admin) {
    this.#id = buy.id || 0;
    this.#admin = admn || null;
    this.#agent_id = buy.agent_id || "";
    this.total_cost = buy.total_cost || 0;
    this.#items = {};
    this.created_at = buy.created_at || "";
    if (buy.items) {
      for (const itm of buy.items) {
        if (buy.id && itm.buy_id === buy.id && itm.item_id && itm.quantity) {
          this.#items[itm.item_id] = itm.quantity;
        }
      }
    }
  }
  get id() {
    return this.#id;
  }

  get admin() {
    return this.#admin;
  }

  get agent(): Agent | null {
    return this.#admin?.get_agents([this.#agent_id])[0] || null;
  }

  get items(): BuyItem[] {
    let itms: BuyItem[] = [];
    if (this.#admin) {
      const itm_keys = Object.keys(this.#items).map((k) => parseInt(k));
      itms = this.#admin.items_by_id(itm_keys).map((i) => ({
        item: i,
        quantity: this.#items[i.id],
      }));
    }
    return itms;
  }
}

export { type BuyJSON };
export default Buy;
