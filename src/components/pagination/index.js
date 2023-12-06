import { memo, useCallback, useEffect, useLayoutEffect, useState } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination({ currentPage = 1, lastPage, changePage }) {
  const [startArr, setStartArr] = useState([1]);
  const [innerArr, setInnerArr] = useState([]);
  const [arr, setArr] = useState([]);

  const cn = bem('Pagination');

  useEffect(() => {
    const firstDotsPage1 = lastPage - 3 > 0 ? 'secondDots' : 1;
    const firstDots = currentPage - 2 > 0 && lastPage > 5 ? 'dots' : 1;
    const secondDots = lastPage - (currentPage + 2) > 0 ? 'secondDots' : 1;
    let current = currentPage;
    let result = [];

    if (current < 3) {
      result = [1, 2, 3, firstDotsPage1, lastPage]
    } else if (current >= 3 && current !== lastPage) {
      result = [1, firstDots, current - 1, current, current + 1, secondDots, lastPage];
    } else if (current >= lastPage) {
      current = lastPage;
      result = [1, firstDots, lastPage - 2, lastPage - 1, lastPage];
    }

    result = [...new Set(result)];

    setArr(() => result);
  }, [currentPage, lastPage])

  return (
    <div className={cn()}>
      <ul className={cn('list')}>
        {arr.map((el, i) => {
          if (el === 'dots') {
            return <li key={i} className={cn('item')}>
              <button
                onClick={() => changePage(currentPage - 2)}
                className={cn('button')}
              >
                ...
              </button>
            </li>
          }

          if (el === 'secondDots') {
            return <li key={i} className={cn('item')}>
              <button
                onClick={() => changePage(currentPage === 1 ? 4 : currentPage + 2)}
                className={cn('button')}
              >
                ...
              </button>
            </li>
          }

          return (<li key={i} className={cn('item')}>
            <button
              onClick={() => changePage(el)}
              className={`${cn('button')}${el === currentPage ? ' current' : ''}`}
            >
              {el}
            </button>
          </li>)
        })}
      </ul>
    </div >
  );
}

Pagination.propTypes = {
  changePage: PropTypes.func.isRequired,
  page: PropTypes.number,
  lastPage: PropTypes.number,
};

Pagination.defaultProps = {
  changePage: () => { },
}

export default memo(Pagination);
