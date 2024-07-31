import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import { HomePage } from './components/HomePage/HomePage.jsx';
import { ShopPage } from './components/ShopPage/ShopPage.jsx';
import { ItemPage } from './components/ItemPage/ItemPage.jsx';
import { CheckOutPage } from './components/CheckOutPage/CheckOutPage.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // makes it so that HomePage will be the default
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'home/',
        element: <HomePage />,
      },
      {
        path: 'shop/',
        element: <ShopPage />,
      },
      {
        path: ':slug',
        element: <ItemPage />,
      },
      {
        path: 'checkout/',
        element: <CheckOutPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
