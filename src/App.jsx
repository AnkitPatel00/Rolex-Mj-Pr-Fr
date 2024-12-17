import Header from './component/Header.jsx'
import { useEffect} from 'react'
import { logoutUser } from './features/authentication/authenticationSlice.js'
import { useDispatch } from "react-redux"
import { wishlistReset } from './features/wishlist/wishlistSlice.js'
import { cartReset } from './features/cart/cartSlice.js'
import Footer from './component/Footer.jsx'
import { Outlet} from 'react-router-dom'
import LoginPleaseToast from './component/LoginPleaseToast.jsx'

function App() {

  const dispatch = useDispatch()
  const currentTime = new Date().setMinutes(new Date().getMinutes())
  const logoutTime = localStorage.getItem("logoutTime")

  useEffect(() => {
    if (logoutTime < currentTime)
    {
      dispatch(logoutUser());
      dispatch(wishlistReset());
      dispatch(cartReset());
    }
  },[location.pathname])
  
  return (
    <>
      <LoginPleaseToast/>
      <Header />
     <Outlet/>
      <Footer/>
    </>
  )
}

export default App
