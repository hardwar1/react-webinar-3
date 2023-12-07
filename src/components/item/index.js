import { memo } from "react";
import { Link } from "react-router-dom";
import useStore from "../../store/use-store";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import './style.css';

function Item(props) {
  const store = useStore();
  const cn = bem('Item');
  const id = props.item._id;

  const callbacks = {
    onAdd: () => {

      props.onAdd(id)
    },
    onClick: () => {
      store.actions.catalog.loadOne(id)
    }
  }

  return (
    <div className={cn()}>
      <Link className={cn('title')} to={`/product/:${id}`} onClick={callbacks.onClick} >
          {props.item.title}
      </Link>

      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button className={cn('button')} onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => { },
}

export default memo(Item);
