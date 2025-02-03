import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartQuantity } from '../../redux/slices/cartSlice';
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();


  const getImagePath = (imageName) => {
    return `${window.location.origin}/images/${imageName}`;
  };

  const removeFromCartHandler = () => {
    dispatch(removeFromCart(item._id));
    idbPromise('cart', 'delete', { ...item });
  };

  const onChange = (e) => {
    const value = parseInt(e.target.value, 10);

    if (value === 0) {
      dispatch(removeFromCart(item._id));
      idbPromise('cart', 'delete', { ...item });
    } else {
      dispatch(updateCartQuantity(item._id, value));
      idbPromise('cart', 'put', { ...item, purchaseQuantity: value });
    }
  };

  return (
    <div className="flex-row">
      <div>
      <img src={getImagePath(item.image)} alt={item.name} />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            ole="img"
            aria-label="trash"
            onClick={() => removeFromCartHandler}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;