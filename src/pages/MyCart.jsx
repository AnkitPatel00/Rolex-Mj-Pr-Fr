import { useEffect,useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { getCartAsync ,removeCartItemAsync,updateCartItemAsync,removeAllCartItemsAsync} from "../features/cart/cartSlice"
import { useLocation, Link, useNavigate } from "react-router-dom"
import { addWishlistAsync} from "../features/wishlist/wishlistSlice"
import { addOrderAsync } from "../features/order/orderSlice"
import LoadingSpinner from "../component/LoadingSpinner"
import ErrorMessage from "../component/ErrorMessage"
import RatingStars from "../component/RatingStars"


const MyCart = () => {
  
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()


   const { isloggin} = useSelector((state) => state.authenticationState)
  const { cartCloths, cartStatus, totalCartItem,cartError } = useSelector((state) => state.cartState)
  const { wishlistItem, wishlistStatus } = useSelector((state) => state.wishlistState)
  const [wishlistBtnId, setWishlistBtnId] = useState(null)
  const [cartBtnId, setCartBtnId] = useState(null)
  const [orderDetails, setOrderDetails] = useState({})

   useEffect(() => {
    if (!isloggin)
    {
navigate('/login')
    }
  }, [isloggin])
  

  useEffect(() => {
    if (isloggin) 
    {
      dispatch(getCartAsync())
    }
  }, [location])


  const totalPrice = cartCloths?.map((cartCloth) => cartCloth.clothsId.price * cartCloth.quantity).reduce((acc, price) => acc + price, 0)
  const discountedPrice = cartCloths?.map((cartCloth) => cartCloth.quantity * (cartCloth.clothsId.price - (cartCloth.clothsId.price * (cartCloth.clothsId.discount * 0.01)))).reduce((acc, price) => acc + price, 0)
  const discountPrice = (totalPrice - discountedPrice).toFixed(2)
  const deliveryCharges = discountedPrice>500?0:40
  const totalAmount =  (discountedPrice + deliveryCharges)
  
  
  useEffect(() => {
     const orderInfo = {priceDetails:{totalPrice:(totalPrice).toFixed(2),discountedPrice:discountedPrice.toFixed(2),totalAmount:totalAmount.toFixed(2),discount:discountPrice,deliveryCharges:deliveryCharges}}  
     const order = {
        cloths: cartCloths,
        ...orderInfo
      }
    
      setOrderDetails(order)
    
  },[cartStatus])
  
  const handleOrder = () => {
    if (defaultaAdddress)
    { 
      dispatch(addOrderAsync(order)).then(() => {
        dispatch(removeAllCartItemsAsync())
      })
    }
  }

//remove from cart
  const removeFromCart = (clothId) => {
    setCartBtnId(clothId)
   if (isloggin)
    {
       const cartInfo = {
         clothsId: clothId,
     }  
  dispatch(removeCartItemAsync(cartInfo)).finally(()=>setCartBtnId(null))
    }
  }


  //check already in wishlist
  
  const inwishlist = wishlistItem?.map((wishlist) => wishlist.clothsId._id)

  //add to wishlist and remove from cart
  
   const addInWishlistHandle =(clothId) =>
   {
     setWishlistBtnId(clothId)
    if (isloggin)
    {
       const wishlistInfo = {
      clothsId:clothId
      } 
      dispatch(removeCartItemAsync(wishlistInfo))
      dispatch(addWishlistAsync(wishlistInfo)).finally(()=>setWishlistBtnId(null))
    }

  }


  //update Size

  const updateCartSize = (clothId, size) => {
    const cartInfo = {
      clothsId: clothId,
      size:size
    };
    dispatch(updateCartItemAsync(cartInfo));
  }

    //update quantity

  const updateCartQuantity = (clothId, quantity) => {
    
    if(quantity>0 && quantity<=5)
    {
       const cartInfo = {
      clothsId: clothId,
      quantity:quantity
    };

    dispatch(updateCartItemAsync(cartInfo));
}
  }

  const cartClothsEle = cartCloths?.map((cloth) => (
    <div key={cloth.clothsId._id} className="row mb-5">
      <div className="col-6">  
         <Link to={`/products-details/${cloth.clothsId._id}`}>              
           <img className="img-fluid object-fit-sm-contain" src={cloth.clothsId.imgUrl} width={200} height={220} />                
                      </Link> 
              </div>
               <div className="col-6 pb-1">
        <h3 className="fs-5">{cloth.clothsId.title}</h3>
        <RatingStars rating={cloth.clothsId.rating}/>
            <p><span className='fs-4 fw-bold'> &#8377; {(cloth.clothsId.price - cloth.clothsId.price*(cloth.clothsId.discount*0.01)).toFixed(2)} </span> <span className="fs-6 text-decoration-line-through fw-light">&#8377; {cloth.clothsId.price}</span><span className='text-success fs-5 fw-normal'> {cloth.clothsId.discount}% off</span></p>
        <select disabled={cartStatus ==="updateCart/Loading"?true:false } value={cloth.size} className="form-select w-auto mb-3" onChange={(e)=>updateCartSize(cloth.clothsId._id,e.target.value)}>
            {cloth.clothsId.size.map((size,index) =>
              <option value={size} key={index}>{size}</option>) }
</select>
         <div className="d-flex align-items-center mb-3">
        <button disabled={cartStatus ==="updateCart/Loading"?true:false } className="btn btn-primary" onClick={() => updateCartQuantity( cloth.clothsId._id,cloth.quantity === 1 ? cloth.quantity :  cloth.quantity - 1)}>-</button>
        <span className="px-3">{cloth.quantity}</span>
        <button disabled={cartStatus ==="updateCart/Loading"?true:false } className="btn btn-primary" onClick={() => updateCartQuantity( cloth.clothsId._id,cloth.quantity === 5 ? cloth.quantity : cloth.quantity + 1)}>+</button>
      </div>
        {!inwishlist.includes(cloth.clothsId._id) && <button disabled={(wishlistStatus === "addWishlist/Loading" && wishlistBtnId === cloth.clothsId._id) ? true:false} className="btn btn-primary mb-3" style={{width:"200px"}} onClick={() => addInWishlistHandle(cloth.clothsId._id)} >{(wishlistStatus === "addWishlist/Loading" && wishlistBtnId === cloth.clothsId._id) ? "Moving...":"Move to Wishlist"}</button> }<br/>
        <button style={{width:"200px"}} disabled={ (cartStatus === "removeCart/Loading" && cartBtnId === cloth.clothsId._id) ? true:false} className="btn btn-danger" onClick={() => removeFromCart(cloth.clothsId._id)}>{ (cartStatus === "removeCart/Loading" && cartBtnId === cloth.clothsId._id) ?"Removing...": "Remove From Cart"}</button> 
              </div>
            </div>        
  ))
  

  const emptyCart =  (<div className="mt-5 mb-5">
        <h1 className="text-center display-5">No Cloths in Cart!</h1>
  </div>)
  

  return (
    <div className="container py-4">

      
        {!isloggin && <div className="text-center">
          <h1 className="display-3 ">Please Login First</h1>
          <Link className="btn btn-primary" to={"/login"}>Login</Link>
        </div>}

      {isloggin && <h5 className="text-center">MY CART ({totalCartItem})</h5>}


       <LoadingSpinner spinner={cartStatus === "getCart/Loading" }/>

      {isloggin && totalCartItem ===0  && emptyCart}

      <div className="row mt-4">

        <div className="col-lg-6">
          

          <ErrorMessage error={cartError} />
          
         
          {cartStatus !== "getCart/Loading" && cartClothsEle}
          
        </div>
        <div className="col-lg-6 ">

         

          {totalCartItem > 0 && cartStatus !== "getCart/Loading" && <>
            
             <h5>PRICE DETAILS</h5>
           
            <hr />
            <p><span>Pirce ({cartCloths.length} Items) : </span><span> &#8377;{totalPrice}</span></p>
          <p>Discount: <span style={{color:"green"}}>&minus;&#8377;{discountPrice}</span></p>
            <p>Delivery Charges: 
            
                 {deliveryCharges ===0 ?
             <> <span className="fs-6 text-decoration-line-through fw-light "> &#8377;40</span>
               <span className='text-success fs-6 fw-normal'> Free </span></> :
              <span>+40 Delivery</span>
                }
                </p>
             
          <hr/>
            <h5 className="fs-4">Total Amount: &#8377;<span >{totalAmount.toFixed(2)}</span></h5>
            <Link state={orderDetails} to='/user/placeorder' className="btn btn-warning">Place Order</Link>
             <hr/>
<p style={{color:"green"}}>You will save &#8377;{discountPrice} on this order</p>
          </>}
        </div>
      </div>
      
    </div>
  )
}
export default MyCart