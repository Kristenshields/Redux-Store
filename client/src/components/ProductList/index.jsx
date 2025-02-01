import { useEffect, useMemo } from 'react';
import ProductItem from '../ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { updateProducts } from '../../redux/slices/productSlice';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function ProductList() {
  const dispatch = useDispatch();
  const { currentCategory } = useSelector(state => state.categories);
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const { products: reduxProducts } = useSelector(state => state.products);
  const products = data?.products || reduxProducts || [];

  useEffect(() => {
    if (data?.products) {
      dispatch(updateProducts(data.products));
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
  }, [data, dispatch]);

  const filterProducts = useMemo(() => {
    if (!currentCategory) {
      return products;
    }
    return products.filter(product => product.category?._id === currentCategory);
  }, [currentCategory, products]);

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
        <div className="flex-row">
          {filterProducts.map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;