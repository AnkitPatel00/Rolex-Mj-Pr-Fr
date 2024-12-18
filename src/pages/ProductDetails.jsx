import { useParams,useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect,useState } from "react"
import { fetchCloths} from "../features/cloths/clothSlice"
import { addWishlistAsync, removeWishlistAsync,wishlistReset } from '../features/wishlist/wishlistSlice'
import { addtoCartAsync, getCartAsync ,cartReset} from "../features/cart/cartSlice"
import { setPleaseLogin,logoutUser } from '../features/authentication/authenticationSlice'
import '../index.css'
import LoadingSpinner from "../component/LoadingSpinner"
import ProductsCard from "../component/ProductsCard"
  


const ProductsDetails = () => {
  const { clothId } = useParams()

  const navigate = useNavigate()
  
  const [quantity, setQuantity] = useState(1)
  
  const [size, setSize] = useState("")
  
  const [wishlistBtnId, setwishlistBtnId] = useState(null)
  
    const [orderDetails,setOrderDetails] = useState({})

  const dispatch = useDispatch()


  
  const { cloths, clothStatus} = useSelector((state) => state.clothsState) 

  const { isloggin } = useSelector((state) => state.authenticationState)



  const { wishlistItem, wishlistStatus ,wishlistError} = useSelector((state) => state.wishlistState)
  
   const { cartCloths, cartStatus ,cartError } = useSelector((state) => state.cartState)
  
  const cloth = cloths?.find((cloth) => cloth._id === clothId)


  const recomendedCloths = (cloths?.filter((c) => c.category === cloth.category).slice(0, 4)).toReversed()
  
  useEffect(() => {

    dispatch(fetchCloths())
    
  }, [location.pathname])


  useEffect(() => {
      
    if(clothStatus === "fetch/success")
    {
      setSize(cloth.size[0])
}
  }, [clothStatus])

  useEffect(() => {
      if(cartStatus === "addCart/success")
    dispatch(getCartAsync())
  }, [cartStatus])

  
  const totalPrice = cloth?.price * (quantity)

  const discountPrice = cloth?.price - cloth?.discountedPrice

  const discountedPrice = cloth?.discountedPrice * (quantity)

  const deliveryCharges = discountedPrice>500?0:40

  const totalAmount =  cloth?.discountedPrice * (quantity) + deliveryCharges 
  
    useEffect(() => {

      const orderInfo = {priceDetails:{totalPrice:(totalPrice).toFixed(2),discountedPrice:discountedPrice.toFixed(2),totalAmount:totalAmount.toFixed(2),discount:(discountPrice*(quantity)).toFixed(2),deliveryCharges:deliveryCharges}}  
    
     const order = {
        cloths:[{clothsId:cloth,quantity: quantity, size:size}],
        ...orderInfo
      }
    
      setOrderDetails(order)
    
    }, [quantity, size])
  

  //hanlde in whishlist

  const addInWishlistHandle =(clothId) =>
  {

    setwishlistBtnId(clothId)
    if (isloggin)
    {

       const wishlistInfo = {
      clothsId:clothId
  }
      dispatch(addWishlistAsync(wishlistInfo)).finally(()=>setwishlistBtnId(null))

    }
    else
    {
dispatch(setPleaseLogin(true))

      }
  }

//remove
  const removeFromWishlistHandle =(clothId) =>
  {
   setwishlistBtnId(clothId)
       const wishlistInfo = {
      clothsId:clothId
  }
      dispatch(removeWishlistAsync(wishlistInfo)).finally(()=>setwishlistBtnId(null))
  }

   //hanlde in cart

  const handleInCart = (clothId) => {

   if (isloggin)
   {
     const cartInfo = {
         clothsId: clothId,
         quantity:quantity,
      size:size
     }
  dispatch(addtoCartAsync(cartInfo))

    }
    else
    {
dispatch(setPleaseLogin(true))
      }
  }
  
  
  return (
    <>
      <div className="container p-4">
        
      <LoadingSpinner spinner={clothStatus === "fetch/loading"} />
      {clothStatus === "fetch/success" && (<div className="row mx-auto">
   <div className="col-lg-4">
  <div className="d-flex justify-content-center">
    <div className="cloth-container rounded p-4 position-relative">
      <img
        className="img-fluid object-fit-sm-contain cursor-pointer"
        src={cloth.imgUrl}
       style={{width:"100%",maxWidth:"800px"}}
        alt={cloth.title}
      />
              {wishlistItem.map(item => item.clothsId._id).includes(cloth._id) ?
                (
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
      <i className="fa-solid fa-heart" style={{ color: "red" }}></i>
    )}
  </button>
) : (
  <button
    onClick={() => addInWishlistHandle(cloth._id)}
     className="wishlist-btn-position"
    disabled={
      (wishlistStatus === "addWishlist/Loading")
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
  </div>
</div>
<div className="col-lg-8">
  <h1 className="display-6">{cloth.title}</h1>
  <p className={`fs-6 fw-bold p-0 ${cloth.rating >= 4 ? "btn btn-success" : cloth.rating >= 3 ? "btn btn-warning" : "btn btn-danger"} px-2`}>
    {cloth.rating}
  </p>
  <p>
    <span className='fs-4 fw-bold'>&#8377; {(cloth.discountedPrice).toFixed(2)} </span>
    <span className="fs-6 text-decoration-line-through fw-light">&#8377; {cloth.price}</span>
    <span className='text-success fs-5 fw-normal'> {cloth.discount}% off</span>
  </p> 
  <p>{(cloth.discountedPrice) > 500 ? "Free Delivery" : " ₹ 40 Delivery"}</p>
  <div>
    <button className="btn btn-primary" onClick={() => setQuantity(quantity => quantity <= 1 ? quantity : quantity - 1)}>-</button>
    <span className="px-3">{quantity}</span>
    <button className="btn btn-primary" onClick={() => setQuantity(quantity => quantity === 5 ? quantity : quantity + 1)}>+</button>
  </div>
  <br />
  <label className="mt-3 me-2">Size:</label>
  <select value={size} className="form-select w-auto" onChange={(e) => setSize(e.target.value)}>
    {cloth.size.map((size, index) =>
      <option value={size} key={index}>{size}</option>
    )}    </select>
            <div className="my-3">

              {isloggin ?  <Link state={orderDetails} to='/user/placeorder' className="btn btn-warning me-3">Buy Now</Link>
              : <button className="btn btn-warning me-3" onClick={()=>dispatch(setPleaseLogin(true))}>Buy Now</button>}

   
    
    {cartCloths.map(item => item.clothsId._id).includes(cloth._id) 
      ? <button className="btn btn-primary" onClick={() => navigate("/cart")}>Go to Cart</button>
              : <button className="btn btn-outline-primary"
                disabled={cartStatus === "addCart/Loading"?true:false}
                onClick={() => handleInCart(cloth._id)}>
                Add to Cart
                  <i className="fa-solid fa-circle-notch fa-spin" style={{
                    color: "grey", marginLeft: "10px", display: cartStatus !== "addCart/Loading" && "none"
                  }}></i></button>}
            </div>


  <p className="fs-4 fw-light mt-3">{cloth.description}</p>
</div>
      </div>)}
</div>
      {clothStatus === "fetch/success" &&
      
        <div>
        
          <h5 style={{ textAlign: "center" }}>Recomended</h5>
          
          <div style={{ display: "flex", justifyContent: "center" }}>
       
            <ProductsCard cloths={recomendedCloths} />
          </div>

        </div>}
    </>
  )
}

export default ProductsDetails