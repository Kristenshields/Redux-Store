import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { store } from './redux/store';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';

const apolloClient = new ApolloClient({ 
  uri: '/graphql',
  cache: new InMemoryCache(),
});

const appRouter = createBrowserRouter([ 
  {
    path: '/',
    element: <App />,
    errorElement: <NoMatch />, 
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/success',
        element: <Success />,
      },
      {
        path: '/orderHistory',
        element: <OrderHistory />,
      },
      {
        path: '/products/:id',
        element: <Detail />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root')); // Store root for potential future use

root.render(
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  </ApolloProvider>
);