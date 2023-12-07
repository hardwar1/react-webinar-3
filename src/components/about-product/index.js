import { memo, useEffect } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';


import './style.css';
function AboutProduct({ product, onAdd }) {
  const cn = bem('AboutProduct');

  useEffect(() => { console.log(product.countryIs) }, [product])

  return (
    <div className={cn()}>
      <ul className={cn('list')}>
        <li className={cn('item')}>
          {product.description}
        </li>
        <li className={cn('item')}>
          Страна производитель: <b>{product?.madeIn?.title} ({product?.madeIn?.code})</b>
        </li>
        <li className={cn('item')}>
          Категория: <b>{product.category?.title}</b>
        </li>
        <li className={cn('item')}>
          Год выпуска: <b>{product.edition}</b>
        </li>
        <li className={cn('item')}>
          Цена: <b>{product.price} ₽</b>
        </li>
      </ul>

      <button onClick={() => onAdd(product._id)}>
        Добавить
      </button>
    </div>
  );
}

AboutProduct.propTypes = {
  onOpen: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
}

AboutProduct.defaultProps = {
  onOpen: () => { },
  onAdd: () => { },
  sum: 0,
  amount: 0
}

export default memo(AboutProduct);
