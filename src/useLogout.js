import { useDispatch } from "react-redux"
import { logoutUser } from "./features/authentication/authenticationSlice"
import { wishlistReset } from "./features/wishlist/wishlistSlice"
import { cartReset } from "./features/cart/cartSlice"
const useLogout = () =>
{
  const currentTime = Date.now()
  const logoutTime = localStorage.getItem("logoutTime")
  const dispatch = useDispatch()

  const logoutDispatch = () => {
 dispatch(logoutUser());
    dispatch(wishlistReset());
    dispatch(cartReset());
    window.location.reload()
    
  }
  return {logoutDispatch}
}
export {useLogout}