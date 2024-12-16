import { configureStore } from "@reduxjs/toolkit";
import clothsReducer from '../features/cloths/clothSlice'
import cartReducer from '../features/cart/cartSlice'
import authenticationReducer from '../features/authentication/authenticationSlice'
import wishlistReducer from '../features/wishlist/wishlistSlice'
import userReducer from '../features/user/userSlice'
import addressReducer from '../features/address/addressSlice'
import orderReducer from '../features/order/orderSlice'
const store = configureStore({
  reducer: {
    clothsState: clothsReducer,
    authenticationState: authenticationReducer,
    wishlistState: wishlistReducer,
    cartState: cartReducer,
    userState: userReducer,
    addressState: addressReducer,
    orderState:orderReducer
  }
})

export default store