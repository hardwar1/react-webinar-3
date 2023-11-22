import React, { useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onClickButton: (e) => {
      e.stopPropagation();
      props.onClickButton(props.item.code);
    }
  }

  return (
    <div className={cn()}
      onClick={callbacks.onClick}>
      <span className={cn('code')}>{props.item.code}</span>
      <span className={cn('title')}>{props.item.title}</span>

      <div className={cn('priceWrapper')}>
        <span className={cn('price')}>{props.item.price} ₽</span>

        {props.counts &&
          <span className={cn('count')}>{props.item.count} шт</span>
        }
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onClickButton}>
          {props.textButton}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  counts: PropTypes.bool,
  onClickButton: PropTypes.func,
  textButton: PropTypes.string
};

Item.defaultProps = {
  onClickButton: () => {
  },
}

export default React.memo(Item);
