import { gen } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = gen()
  }

  initState() {
    return {
      list: []
    }
  }

  async load(page = 1, quantity = 10) {
    const response = await fetch(`/api/v1/articles?limit=${quantity}&skip=${page * (quantity - 1)}&fields=items(_id, title, price),count`);
    const json = await response.json();

    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
