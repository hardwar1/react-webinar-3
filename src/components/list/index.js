import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function List({list, onClickButtonItem, textButtonItem, counts}) {
  const cn = bem('List');

  return (
    <div className={cn()}>
      {list.map(item =>
        <div key={item.code} className={cn('item')}>
          <Item
          item={item}
          counts={counts}
          onClickButton={()=> onClickButtonItem(item.code)}
          textButton={textButtonItem} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onClickButtonItem: PropTypes.func,
};

List.defaultProps = {
  onClickButtonItem: () => {
  },
}

export default React.memo(List);
