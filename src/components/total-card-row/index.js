import React from "react";
import PropTypes from 'prop-types';

import './style.css';

function TotalCardRow({ totalPrice = 0}) {

  return (
    <div className={'TotalCardRow'}>
      <span>Итого </span>
      <span className={'TotalCardRow-price'}>{totalPrice} ₽</span>
    </div>
  )
}

TotalCardRow.propTypes = {
  count: PropTypes.number,
};


export default React.memo(TotalCardRow);
