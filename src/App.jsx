import { RouterProvider } from 'react-router-dom';
import { useState } from 'react';
import router from './routes/Routes';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [wishlist, setWishlist] = useState([]);

  return (
    <>
      <RouterProvider
        router={router}
        context={{ wishlist, setWishlist }}
      />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;

