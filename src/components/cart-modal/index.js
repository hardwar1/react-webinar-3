import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Head from '../head';
import List from '../list';
import TotalCardRow from '../total-card-row';


import './style.css';

function CartModal({ cartList, buttonText, listItemButtonOnclick, totalPrice }) {
  const cn = bem('CartModal');

  return (
    <>
      <Head title='Корзина' />

      <div className={cn()}>
        {cartList.length > 0 ?
          <>
            <div className={cn('listWrapper')}>
              <List list={cartList}
                onClickButtonItem={listItemButtonOnclick}
                counts={true}
                textButtonItem='Удалить'
              />
              <TotalCardRow totalPrice={totalPrice} />
            </div>
          </>
          :
          <span className={cn('emptyText')}>Корзина пуста</span>
        }
      </div>
    </>
  )
}

CartModal.propTypes = {
  cartList: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })),
  buttonText: PropTypes.string,
  listItemButtonOnclick: PropTypes.func,
  onButtonClick: PropTypes.func,
  totalPrice: PropTypes.number,
  setOpen: PropTypes.bool
};

CartModal.defaultProps = {
  listItemButtonOnclick: () => { },
  onButtonClick: () => { }
}

export default React.memo(CartModal);
