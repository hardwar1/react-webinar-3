import React, { useCallback } from 'react';
import List from "./components/list";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import PreviewCart from "./components/preview-cart";
import CartModal from "./components/cart-modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cartList = store.getState().cartList;
  const totalPrice = store.getState().totalPrice;
  const cartOpen = store.getState().cartOpen;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onDeleteCartItem: useCallback((code) => {
      store.deleteCartItem(code);
    }, [store]),

    onAddItem: useCallback((code) => {
      store.addToCart(code);
    }, [store]),

    onCartOpen: useCallback(() => {
      store.onCartOpen();
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин' />

      <PreviewCart quantity={cartList.length} totalPrice={totalPrice} onButtonClick={callbacks.onCartOpen}/>

      <List list={list}
        onClickButtonItem={callbacks.onAddItem}
        textButtonItem='Добавить'
      />

      <CartModal cartList={cartList}  buttonText="Закрыть" totalPrice={totalPrice} listItemButtonOnclick={callbacks.onDeleteCartItem} setOpen={cartOpen}/>
    </PageLayout>
  );
}

export default App;
