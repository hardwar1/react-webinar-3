import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.state.totalPrice = 0;
    this.state.cartOpen = false;
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей

    for (const listener of this.listeners) listener();
  }

  /**
  * калькуляция суммы товаров в корзине
  */

  onCartOpen() {
    this.setState({
      ...this.state,
      cartOpen: !this.state.cartOpen
    })
  }

  /**
 * открытие корзины
 */
  calcCartTotal() {
    const total = this.state.cartList.reduce((acc, item) => (
      acc += item.price * item.count
    ), 0);

    this.setState({
      ...this.state,
      totalPrice: total,
    })
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteCartItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cartList: this.state.cartList.filter(item => item.code !== code)
    })
    this.calcCartTotal();
  }

  /**
   * добавление в корзину
   */
  addToCart(code) {
    const cartList = this.state.cartList;
    // вынес в константу повторяющийся код, читабельность улучшил в 3х местах
    // но засор памяти по идее ухудшил,
    // аналогично со следующими константами

    const index = cartList.findIndex(prod => prod.code === code)
    // убрал цикл
    if (index > -1) {
      this.setState({
        ...this.state,
        cartList: [
          ...cartList,
        ]
      })
      this.state.cartList[index].count++;
      this.calcCartTotal();

      return;
    }

    const [product] = this.state.list.filter(item => item.code === code);
    // тут не уверен что лучше стало,
    // поэтому оставил комментом старый вариант
    this.setState({
      ...this.state,
      cartList: [
        ...cartList,
        {
          // ...this.state.list.filter(item => item.code === code)[0],
          ...product,
          count: 1
        }
      ]
    })

    this.calcCartTotal();
  }
}

export default Store;
