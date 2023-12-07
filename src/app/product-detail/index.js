import { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from "prop-types";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import AboutProduct from "../../components/about-product";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Basket from "../basket";

function ProductDetail(productId) {
  const store = useStore();
  const activeModal = useSelector(state => state.modals.name);
  const product = useSelector(state => state.catalog.product);
  const categoryIs = useSelector(state => state.catalog.product.categoryIs);

  useEffect(() => {
    // console.log(categoryIs);
    // console.log('product', product.categoryIs);
  }, [categoryIs]);

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

  return (
    <>
      <PageLayout>
        <Head title={product.title? product.title : ''} />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
          sum={select.sum} />
        <AboutProduct product={product} onAdd={callbacks.addToBasket}/>
      </PageLayout>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

ProductDetail.propTypes = {
  product: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default memo(ProductDetail);
