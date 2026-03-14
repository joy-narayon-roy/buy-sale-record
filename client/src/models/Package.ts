import type Admin from "./Admin";
import type Item from "./Item";

type PackageItemJSON = {
  item_id?: number;
  quantity?: number;
};
type PackageJSON = {
  id?: number;
  name?: string;
  items?: PackageItemJSON[];
};

class Package {
  #id: number;
  name: string;
  #admin_ref: Admin | null;
  #item_ids: { item: number; quantity: number }[];
  constructor(p: PackageJSON, a?: Admin) {
    this.#id = p.id ?? 0;
    this.name = p.name ?? "";
    this.#admin_ref = a || null;
    this.#item_ids = [];

    p.items?.forEach((i) => {
      this.#item_ids.push({
        item: i.item_id || 0,
        quantity: i?.quantity || 0,
      });
    });
  }
  get id(): number {
    return this.#id;
  }
  get admin(): Admin | null {
    return this.#admin_ref;
  }
  get items(): Item[] {
    const itms: Item[] = [];
    this.#item_ids.forEach((itm) => {
      const find_itm = (this.#admin_ref?.items_by_id([itm.item]) || [])[0];
      if (itm && find_itm) {
        find_itm.quantity = itm.quantity;
        itms.push(find_itm);
      }
    });
    return itms;
  }

  get price(): number {
    return this.items.reduce((a, c) => a + c.price * c.quantity, 0);
  }
  get item_length(): number {
    return this.#item_ids.length;
  }
}

export { type PackageJSON };
export default Package;
