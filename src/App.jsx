import Header from './component/Header.jsx'
import { useEffect, useState } from 'react'
import { logoutUser } from './features/authentication/authenticationSlice.js'
import { useDispatch ,useSelector} from "react-redux"
import { wishlistReset } from './features/wishlist/wishlistSlice.js'
import { cartReset } from './features/cart/cartSlice.js'
import Footer from './component/Footer.jsx'
import { Outlet,useNavigate } from 'react-router-dom'
import LoginPleaseToast from './component/LoginPleaseToast.jsx'
// import jwt from 'jsonwebtoken'



function App() {

  const {isloggin,authStatus} = useSelector((state) => state.authenticationState)

  const { wishlistStatus } = useSelector((state) => state.wishlistState)
  const { userStatus, user, userError } = useSelector((state) => state.userState)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // const logoutTime = 3600000
  
  //  const logoutTime =5000
  
  const [time, setTime] = useState(0)
  
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
