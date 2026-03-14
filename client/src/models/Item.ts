type ItemJSON = {
  id?: number;
  name?: string;
  img?: string;
  price?: number;
  quantity?: number;
  unit?: string;
};
class Item {
  #id: number;
  name: string;
  img: string;
  price: number;
  quantity: number;
  unit: string;

  constructor(itmJSON: ItemJSON) {
    this.#id = itmJSON.id ?? 0;
    this.name = itmJSON.name ?? "";
    this.img = itmJSON.img ?? "";
    this.price = itmJSON.price ?? 0;
    this.quantity = itmJSON.quantity ?? 0;
    this.unit = itmJSON.unit ?? "";
  }
  get id(): number {
    return this.#id;
  }
}

export { type ItemJSON };
export default Item;
