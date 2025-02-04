import { Outlet } from 'react-router-dom';
import { loginSuccess } from './redux/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Nav from './components/Nav';
import { idbPromise } from './utils/helpers';
import Auth from './utils/auth';
import { addMultipleToCart } from './redux/slices/cartSlice'; 
import { updateProducts } from './redux/slices/productSlice'; 
import { updateCategories } from './redux/slices/categorySlice'; 


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = () => {
      if (Auth.loggedIn()) {
        const token = Auth.getToken();
        const user = Auth.getProfile();
        dispatch(loginSuccess({ token, user }));
      }
    };

    const syncIndexedDB = async () => {
      const stores = ['cart', 'products', 'categories'];

      for (const store of stores) {
        const data = await idbPromise(store, 'get');
        if (data?.length) {
          switch (store) {
            case 'cart':
              dispatch(addMultipleToCart(data));
              break;
            case 'products':
              dispatch(updateProducts(data));
              break;
            case 'categories':
              dispatch(updateCategories(data));
              break;
            default:
              console.warn(`Unknown store: ${store}`);
          }
        }
      }
    };

    checkAuth();
    syncIndexedDB();
  }, [dispatch]);

  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export default App;