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
  const { loading, data } = useQuery(QUERY_PRODUCTS, { 
    variables: { category: currentCategory } 
  });
  const { products: reduxProducts } = useSelector(state => state.products);


  const productsToDisplay = useMemo(() => {
        if (data?.products) {
            return data.products;  
        } else if (reduxProducts.length > 0) {
            return reduxProducts; 
        } else {
            return []; 
        }
  }, [data?.products, reduxProducts]);

  useEffect(() => {
    if (!loading && data?.products) {
      dispatch(updateProducts(data.products));
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
  }, [data, dispatch, loading]);

  const filteredProducts = useMemo(() => {
    if (!currentCategory) {
      return productsToDisplay;
    }
    return productsToDisplay.filter(product => product.category?._id === currentCategory);
  }, [currentCategory, productsToDisplay]);


  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {loading ? (
        <img src={spinner} alt="loading" />
      ) : filteredProducts.length ? ( 
        <div className="flex-row">
          {filteredProducts.map((product) => ( 
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
        <h3>{loading ? "Loading..." : "No products found for this category."}</h3> 
      )}
    </div>
  );
}

export default ProductList;