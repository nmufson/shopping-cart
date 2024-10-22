import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home.jsx';
import Shop from './pages/Shop/Shop.jsx';
import About from './pages/About/About.js';
import Item from './pages/Item/Item.jsx';
import CheckOut from './pages/CheckOut/CheckOut.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'home/',
        element: <Home />,
      },
      {
        path: 'shop/',
        element: <Shop />,
      },
      {
        path: 'about/',
        element: <About />,
      },
      {
        path: ':slug',
        element: <Item />,
      },
      {
        path: 'checkout/',
        element: <CheckOut />,
      },
    ],
  },
]);

export default router;
