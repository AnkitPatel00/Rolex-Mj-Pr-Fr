import { Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {useState } from "react";
import { addWishlistAsync, removeWishlistAsync, wishlistReset } from '../features/wishlist/wishlistSlice';
import { cartReset } from "../features/cart/cartSlice";
import {setPleaseLogin,logoutUser} from '../features/authentication/authenticationSlice'
import '../index.css'
import RatingStars from "./RatingStars";




const ProductsCard = ({ cloths }) => {

  //javascript

  const [wishlistBtnId, setWishlistBtnId] = useState(null)
  
  const dispatch = useDispatch();
  const {wishlistItem ,wishlistStatus,wishlistError} = useSelector((state) => state.wishlistState);
  const {isloggin} = useSelector((state) => state.authenticationState);


  // Handle adding to wishlist
  const addInWishlistHandle = (clothId) => {

    if (wishlistError === "Token has expired")
     {
       if (isloggin)
       {
           dispatch(logoutUser())
      dispatch(wishlistReset())
      dispatch(cartReset())
         }
       dispatch(setPleaseLogin(true))
    }

    setWishlistBtnId(clothId) 
    if (isloggin) {
      const wishlistInfo = {
        clothsId: clothId
      };
      dispatch(addWishlistAsync(wishlistInfo)).finally(()=>setWishlistBtnId(null))

    } else {
     
      dispatch(setPleaseLogin(true))
    }
  };

  // Handle removing from wishlist
  const removeFromWishlistHandle = (clothId) => {
    setWishlistBtnId(clothId)
    const wishlistInfo = {
      clothsId: clothId,
    };
    dispatch(removeWishlistAsync(wishlistInfo)).finally(()=>setWishlistBtnId(null))
  };



  return (
   
    // Products Card container

    <div className="product-card-container" >


      {cloths.map(cloth => (
          
          // Products Cards
               
        <div key={cloth._id} className="product-card" >
          

            {/* wishlist buttons */}
            
            {wishlistItem.map(item => item.clothsId._id).includes(cloth._id) ? (
  <button
    onClick={() => removeFromWishlistHandle(cloth._id)}
    className="wishlist-btn-position"
    disabled={
      ( wishlistStatus === "removeWishlist/Loading") &&
      wishlistBtnId === cloth._id
    }
  >
    {(wishlistStatus === "removeWishlist/Loading" &&
              wishlistBtnId === cloth._id) ? (    
      <i className="fa-solid fa-circle-notch fa-spin" style={{ color: "grey" }}></i>
    ) : (
      <i className="fa-solid fa-heart" style={{ color: "red"}}></i>
    )}
  </button>
)
 : (
  <button
    onClick={() => addInWishlistHandle(cloth._id)}
    className="wishlist-btn-position"
    
    disabled={
      (wishlistStatus === "addWishlist/Loading") &&
      wishlistBtnId === cloth._id
    }
  >
    {(wishlistStatus === "addWishlist/Loading" &&
      wishlistBtnId === cloth._id) ? (
      <i className="fa-solid fa-circle-notch fa-spin" style={{ color: "red" }}></i>
    ) : (
      <i className="fa-regular fa-heart"></i>
    )}
  </button>
            )}
          
             {/* products info */}

            <Link onClick={() => window.scrollTo(0, 0)}  to={`/products-details/${cloth._id}`}>
              
               <img className="product-card-image"  src={cloth.imgUrl} style={{maxWidth:"100%",margin:"20px 0px"}} />
              
            </Link>
            

            <h3 style={{ fontSize: "20px", fontWeight: "normal" }}>{cloth.title.substring(0, 20) + '...'}</h3>
          <RatingStars rating={cloth.rating}/>  
            <h5>&#8377;<span className="discount-price" >{(cloth.discountedPrice).toFixed(2)}</span>
            
            <span className="orignal-price">&#8377;{cloth.price}</span> <span className="discount-percentage" >{cloth.discount}% off</span></h5>
            </div>
      ))}
      </div>
  )
}

export default ProductsCard