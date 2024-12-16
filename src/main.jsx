import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import store from './app/store.js'
import { Provider } from 'react-redux'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Cloths from './pages/Cloths.jsx'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.js'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import ProductsDetails from './pages/ProductDetails.jsx'
import About from './pages/About.jsx'
import MyCart from './pages/MyCart.jsx'
import MyWishlist from './pages/MyWishlist.jsx'
import Login from './component/Login.jsx'
import UserProfile from './pages/UserProfile.jsx'
import Register from './component/Register.jsx'
import EditProfile from './component/EditProfile.jsx'
import AddAndUpdateAddress from './component/AddAndUpdateAddress.jsx'
import OrderPlace from './component/OrderPlace.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children: [{
      path: "/",
      index: true,
      element:<Home/>
    },
  {
    path:"/cloths",
element:<Cloths/>
  },
  {
    path:"/products-details/:clothId",
element:<ProductsDetails/>
      },
  {
    path:"/about",
element:<About/>
  },
  {
    path:"/cart",
element:<MyCart/>
  }
  ,
  {
    path:"/wishlist",
element:<MyWishlist/>
  },
  {
    path:"/login",
element:<Login/>
  },
  {
    path:"/register",
element:<Register/>
  },
  {
    path:"/user/profile/:username",
element:<UserProfile/>
  },
  {
    path:"/user/profile/edit",
element:<EditProfile/>
  }
  ,
  {
    path:"/user/profile/address",
element:<AddAndUpdateAddress/>
  } ,
  {
    path:"/user/placeorder",
element:<OrderPlace/>
  }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
<RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
