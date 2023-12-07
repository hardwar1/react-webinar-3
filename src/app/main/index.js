import { memo, useCallback, useEffect, useState } from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Basket from "../basket";


function Main() {
  const [lastPage, setLastPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const store = useStore();

  const activeModal = useSelector(state => state.modals.name);
  const count = useSelector(state => state.catalog.count);

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  useEffect(() => {
    setLastPage(Math.ceil(count / 10))
  }, [count]);

  const changePage = (page) => {
    if (page !== currentPage) {
      store.actions.catalog.load(page);
      setCurrentPage(page);
    }
  }

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} />
    }, [callbacks.addToBasket]),
  };

  return (
    <>
      <PageLayout>
        <Head title='Магазин' />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
          sum={select.sum} />
        <List list={select.list} renderItem={renders.item} />

        <Pagination changePage={changePage} currentPage={currentPage} lastPage={lastPage} />
      </PageLayout>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default memo(Main);
