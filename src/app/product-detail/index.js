import { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from "prop-types";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import AboutProduct from "../../components/about-product";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function ProductDetail(productId) {
  const [productObj, setProductObj] = useState({});
  const store = useStore();

  let product = useSelector(state => state.catalog.product);

  useEffect(() => {
    const productSt = JSON.parse(localStorage.getItem('productDetail'))
    if (!product?._id && productSt?._id && !productObj._id) {
      setProductObj(productSt)
    }
  })

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
        <Head title={product?.title ? product?.title :  productObj?.title} />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
          sum={select.sum} />
        <AboutProduct product={product?.title ? product : productObj} onAdd={callbacks.addToBasket} />
      </PageLayout>
    </>
  );
}

ProductDetail.propTypes = {
  product: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default memo(ProductDetail);
