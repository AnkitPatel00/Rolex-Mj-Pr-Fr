import { useDispatch,useSelector } from "react-redux"
import { Link,useLocation,useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getWishlistAsync } from "../features/wishlist/wishlistSlice"
import { addWishlistAsync, removeWishlistAsync } from '../features/wishlist/wishlistSlice'
import { addtoCartAsync } from "../features/cart/cartSlice"
import LoadingSpinner from '../component/LoadingSpinner'
import '../index.css'
import RatingStars from "../component/RatingStars"
const MyWishlist = () => {

  const [wishlistBtnId, setWishlistBtnId] = useState(null)
  

    const [cartBtnId, setCartBtnId] = useState(null)

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()


  const { isloggin } = useSelector((state) => state.authenticationState)
  const { wishlistItem, totalWishlistItems, wishlistStatus } = useSelector((state) => state.wishlistState)

  const { cartCloths, cartStatus} = useSelector((state) => state.cartState)

   useEffect(() => {
    if (!isloggin)
    {
navigate('/login')
    }
  }, [isloggin])

  useEffect(() => {
   if ( isloggin) 
   {
dispatch(getWishlistAsync())
    }
  }, [location])
  
  
  const inCart = cartCloths?.map((wishlist) => wishlist.clothsId._id)

  const wishlistCloths = wishlistItem?.map(cloth => ({...cloth.clothsId,discountedPrice:cloth.clothsId.price - ((cloth.clothsId.price*cloth.clothsId.discount)*0.01)}))
  
   //hanlde in whishlist

  const addInWishlistHandle =(clothId) =>
  {
    setWishlistBtnId(clothId)
    if (isloggin)
    {
       const wishlistInfo = {
      clothsId:clothId
  }
      dispatch(addWishlistAsync(wishlistInfo))
    }
    else
    {
alert("Login Please")

      }
  }

//remove
  const removeFromWishlistHandle =(clothId) =>
  {
    setWishlistBtnId(clothId)
       const wishlistInfo = {
      clothsId:clothId
  }
      dispatch(removeWishlistAsync(wishlistInfo))
  }

  //add to cart

  const handleInCart = (clothId, size) => {
     setCartBtnId(clothId)
   if (isloggin)
   {
     const cartInfo = {
         clothsId: clothId,
         quantity:1,
      size:size
     }

     const wishlistInfo = {
      clothsId:clothId
  }
     dispatch(addtoCartAsync(cartInfo)).finally(()=>setCartBtnId(null))
      dispatch(removeWishlistAsync(wishlistInfo))

    }
    else
    {
alert("Login Please")

      }
  }


  const wishlistCard = <div className="product-card-container" >

      {wishlistCloths.map(cloth => (
          
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
            

            <h3 style={{ fontSize: "20px", fontWeight: "normal" }}>{cloth.title.slice(0, 25) + '...'}</h3>
          <RatingStars rating={cloth.rating} />
            <h5>&#8377;<span style={{ fontSize: "30px", marginRight: "10px" }}>{(cloth.discountedPrice).toFixed(2)}</span>
            <span style={{ fontSize: "15px", marginRight: "5px", fontWeight: "lighter", textDecoration: "" }}>&#8377;{cloth.price}</span>
            <span style={{ fontSize: "20px", marginRight: "5px", color: "green", fontWeight: "normal" }}>{cloth.discount}% off</span></h5>
         {!inCart.includes(cloth._id) && <button disabled={cartStatus === "addCart/Loading" && cartBtnId === cloth._id ?true:false} className="btn btn-primary mb-3" onClick={() => handleInCart(cloth._id,cloth.size[0])} >{cartStatus === "addCart/Loading" && cartBtnId === cloth._id ?"Moving...":"Move to Cart"}</button> }    
        
        </div>
           
      ))}
      </div>


  const wishListClothsEle = wishlistCloths?.map(cloth => (
  <div key={cloth._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex align-items-stretch">
    <div className="card h-100">
      <div className="position-relative">
        {/* Image with hover zoom effect */}
        <Link to={`/products-details/${cloth._id}`}>
          <img
            className="card-img-top img-fluid object-fit-cover zoom-effect"
            src={cloth.imgUrl}
            alt={cloth.title}
            height={300}
          />
        </Link>
        
        {/* Wishlist button in the top-right corner */}
          {wishlistItem.map(item => item.clothsId._id).includes(cloth._id) ? 
      
            (
  <button
    onClick={() => removeFromWishlistHandle(cloth._id)}
    className="top-right cursor-pointer position-absolute"
    style={{
      border: "none",
      background: "none",
      top: "10px",
      right: "10px",
      fontSize: "30px",
    }}
    disabled={
      ( wishlistStatus === "removeWishlist/Loading") &&
      wishlistBtnId === cloth._id
    }
  >
    {(wishlistStatus === "removeWishlist/Loading" &&
              wishlistBtnId === cloth._id) ? (    
      <i className="fa-solid fa-circle-notch fa-spin" style={{ color: "grey" }}></i>
    ) : (
      <i className="fa-solid fa-heart" style={{ color: "red" }}></i>
    )}
  </button>
) : (
  <button
    onClick={() => addInWishlistHandle(cloth._id)}
    className="top-right cursor-pointer position-absolute"
    style={{
      border: "none",
      background: "none",
      top: "10px",
      right: "10px",
      fontSize: "30px",
    }}
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
)
      
      
      }
      </div>

      {/* Card body */}
        <div className="card-body text-center">
          
      <p className={`fs-6 fw-bold p-0 ${cloth.rating >= 4 ? "btn btn-success" : cloth.rating >= 3 ? "btn btn-warning" : "btn btn-danger"} px-2`}>
    {cloth.rating}
  </p>

        {/* Title */}
        <h5 className="fw-normal">{cloth.title}</h5>

        {/* Price and Discount */}
        <p>
          <span className="fs-4 fw-bold">
            &#8377; {(cloth.price - cloth.price * (cloth.discount * 0.01)).toFixed(2)}
          </span>
          <span className="fs-6 text-decoration-line-through fw-light ms-2">
            &#8377; {cloth.price}
          </span>
            <span className="text-success fs-5 fw-normal ms-2">{cloth.discount}% off</span>
  
        </p>
        </div>
       
        {!inCart.includes(cloth._id) && <button disabled={wishlistStatus === "removeWishlist/Loading"?true:false} className="btn btn-primary mb-3" onClick={() => handleInCart(cloth._id,cloth.size[0])} >{wishlistStatus === "removeWishlist/Loading"?"Moving...":"Move to Cart"}</button> }
      </div>
  </div>
));

const emptyWishlist =  (<div className="mt-5 mb-5">
        <h1 className="text-center display-5">No Cloths in Wishlist!</h1>
      </div>)

  return (<>
    <div className=" py-4">

     

       {!isloggin && <div className="text-center">
          <h1 className="display-3 ">Please Login First</h1>
          <Link className="btn btn-primary" to={"/login"}>Login</Link>
        </div>}

      {isloggin && <h5 className="text-center">My Wishlist ({totalWishlistItems})</h5>}
      
       <LoadingSpinner spinner={wishlistStatus==="getWishlist/Loading"}/>

      <div style={{display:"flex",justifyContent:"center"}}>

         {isloggin && totalWishlistItems>0  && wishlistStatus !== "getWishlist/Loading" && wishlistCard} 
        
     
      </div>
       {isloggin && totalWishlistItems===0  && emptyWishlist}
  </div>
  </>)
}
export default MyWishlist