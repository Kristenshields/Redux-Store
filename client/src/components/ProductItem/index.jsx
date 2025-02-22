import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from "../../redux/slices/cartSlice";
import { idbPromise } from "../../utils/helpers";

function ProductItem(item) {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);

  const getImagePath = (imageName) => {
    return `${window.location.origin}/images/${imageName}`;
  };

  const handleAddToCart = () => {
    const itemInCart = cart.find(cartItem => cartItem._id === item._id);
    const purchaseQuantity = itemInCart ? itemInCart.purchaseQuantity + 1 : 1;

    const updatedItem = { 
      ...item, 
      purchaseQuantity 
    };
  
    dispatch(addToCart(updatedItem));
    idbPromise('cart', 'put', updatedItem);
  };
    
    return (
      <div className="card px-1 py-1">
          <Link to={`/products/${item._id}`}>
          <img alt={item.name} src={getImagePath(item.image)} />
          <p>{item.name}</p>
          </Link>
        <div>
        <div>{item.quantity} in stock</div>
          <span>${item.price}</span>
        </div>
        <button onClick={handleAddToCart}>Add to cart</button>
      </div>
    );
  }

export default ProductItem;