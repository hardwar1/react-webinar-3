import React from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { plural } from '../../utils.js';

import './style.css';

function PreviewCart({ quantity = 0, totalPrice = 0, onButtonClick }) {
  const cn = bem('PreviewCart');

  return (
    <div className={cn()}>
      <div>
        В корзине: <b>{quantity} {plural(quantity, {
          one: 'товар',
          few: 'товара',
          many: 'товаров'
        })} / {totalPrice} ₽</b>
      </div>
      <div className={cn('actions')}>
        <button className={cn('button')} onClick={onButtonClick}>
          Перейти
        </button>
      </div>
    </div>
  )
}

PreviewCart.propTypes = {
  count: PropTypes.number,
  totalPrice: PropTypes.number,
  onButtonClick: PropTypes.func,
};

PreviewCart.defaultProps = {
  onButtonClick: () => { }
}

export default React.memo(PreviewCart);
