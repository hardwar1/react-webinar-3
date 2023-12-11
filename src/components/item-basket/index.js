import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useStore from "../../store/use-store";

import './style.css';

function ItemBasket(props) {
  const store = useStore();
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),

    closeModal: useCallback(() => store.actions.modals.close(), [store]),

    onClick: () => {
      store.actions.catalog.loadOne(props.item._id)
    }
  };

  return (
    <div className={cn()}>
      <Link
        className={cn('title')}
        to={`/product/:${props.item._id}`}
        onClick={()=>{callbacks.closeModal(); callbacks.onClick(); }}
        >
        {props.item.title}
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button className={cn('button')} onClick={callbacks.onRemove}>Удалить</button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  onRemove: propTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => { },
}

export default memo(ItemBasket);
