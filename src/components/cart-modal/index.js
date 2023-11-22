import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Head from '../head';
import List from '../list';
import TotalCardRow from '../total-card-row';
import Overlay from '../overlay';

import './style.css';

function CartModal({ cartList, buttonText, listItemButtonOnclick, totalPrice, setOpen }) {
  const [show, setShow] = useState(false);
  const cn = bem('CartModal');

  useEffect(()=>{
    setShow(!show);
  }, [setOpen])

  const closeModal = () => {
    setShow(false);
  }

  return (
    <>
      {show &&
        <div className={`${cn()} `}>
          <div className={cn('inner')}>
            <Head title='Корзина' buttonText={buttonText} buttonOnClick={closeModal} />

            <div className={cn('body')}>
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
          </div>

          <Overlay onClick={closeModal} />
        </div>
      }
    </>
  )
}

CartModal.propTypes = {
  cartList: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })),
  buttonText: PropTypes.string,
  listItemButtonOnclick: PropTypes.func,
  totalPrice: PropTypes.number,
  setOpen: PropTypes.bool
};

CartModal.defaultProps = {
  listItemButtonOnclick: () => { }
}

export default React.memo(CartModal);
