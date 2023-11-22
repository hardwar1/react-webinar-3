import React from "react";
import PropTypes from 'prop-types';
import './style.css';


function Overlay({ onClick }) {

  return (
      <div className='Overlay' onClick={onClick}></div>
  )
}

Overlay.propTypes = {
  onClick: PropTypes.func,
};

Overlay.defaultProps = {
  onClick: () => {}
}

export default React.memo(Overlay);
