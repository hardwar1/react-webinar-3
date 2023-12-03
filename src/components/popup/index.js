import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Overlay from '../overlay';

import './style.css';

function Popup({ children, setOpen, onClosePopup, height = 407, width = 960 }) {
  const [show, setShow] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false)
  const cn = bem('Popup');

  useEffect(() => {
    if(setOpen) {
      setShow(setOpen);
      setTimeout(() => {
        setStartAnimation(true)
      }, 100);
    } else {
      setStartAnimation(false);
      setTimeout(() => {
        setShow(setOpen);
      }, 500);
    }

  }, [setOpen])

  const closeModal = () => {
    onClosePopup();
  }

  return (
    <>
      {show &&
        <div className={`${cn()} ${startAnimation ? cn('animation') : ''}`} style={{ maxWidth: width + 30 }}>
          <button className={cn('closeButton')} onClick={closeModal}>
            Закрыть
          </button>
          <div className={cn('inner')} style={{ height: height }}>
            {children}
          </div>

          <Overlay onClick={closeModal} />
        </div>
      }
    </>
  )
}

Popup.propTypes = {
  children: PropTypes.node,
  onClosePopup: PropTypes.func,
  setOpen: PropTypes.bool
};

Popup.defaultProps = {
  listItemButtonOnclick: () => { },
  onClosePopup: () => { }
}

export default React.memo(Popup);
