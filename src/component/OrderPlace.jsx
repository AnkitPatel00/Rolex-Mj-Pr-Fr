import { useEffect,useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { userFetchAsync } from "../features/user/userSlice"
import { fetchAddressAsync } from "../features/address/addressSlice"
import { addOrderAsync, fetchOrderAsync } from "../features/order/orderSlice"
import {removeAllCartItemsAsync} from "../features/cart/cartSlice"
import LoadingSpinner from "../component/LoadingSpinner"
import OrderSuccess from "../component/OrderSuccess"

const OrderPlace = () => {

  const [orderCloths, setOrderCloths] = useState([])
  
    const [paymentMethod, setPaymentMethod] = useState("")

  const [orderDetails, setOrderDetails] = useState({})
  const [selectedAdress, setSelectedAddress] = useState("")

  const [error, setError] = useState(false)
  
 
  // console.log("set",selectedAdress)
  
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const { isloggin } = useSelector((state) => state.authenticationState)

  const orderState = location.state && location.state

    useEffect(() => {
    if (!isloggin)
    {
      navigate('/login')
    }
      }, [isloggin])

   useEffect(() => {
    if (isloggin) 
    {
       dispatch(userFetchAsync()).then(()=>dispatch(fetchAddressAsync()))
      
     }
   
   }, [location.pathname])
  
    
  
const orderClothsComp = orderState.cloths.map((cloth) => (
  <li key={cloth.clothsId._id} className="list-group-item d-flex align-items-center justify-content-between p-3">
    <div className="d-flex align-items-center">
      <img
        src={cloth.clothsId.imgUrl}
        alt={cloth.clothsId.title}
        className="img-fluid rounded me-3"
        style={{ width: "80px", height: "auto" }}
      />
      <div>
        <h6 className="mb-1">{cloth.clothsId.title}</h6>
        <p className="mb-0 text-muted">
          <small>Quantity: {cloth.quantity}</small>
          <br />
          <small>Size: {cloth.size}</small>
           <br />
          <small>Final Price: &#8377; {(cloth.clothsId.price- (cloth.clothsId.price * cloth.clothsId.discount * 0.01)).toFixed(2)}</small>
        </p>
      </div>
    </div>
  </li>
));


  const { user, userStatus } = useSelector((state) => state.userState)
  
  const { address, addressStatus, addressError } = useSelector((state) => state.addressState)
  
  const { orderStaus } = useSelector((state) => state.orderState)

  const defaultAddress = address?.find((address) => address.setasDefault)

  //  console.log("sadasd",defaultAddress)

  const allAddress = address?.map((address) => Object.values(address).slice(2, 10).join(', '))


   const deliveryTotal =parseInt(orderState.priceDetails.totalAmount) + 40

   const handlePayment = (e) => {
    setPaymentMethod(e.target.value)
   }
  
  
  useEffect(() => {
    if (defaultAddress && !selectedAdress)
    {
setSelectedAddress(Object.values(defaultAddress).slice(2, 10).join(', '))
    }
  },[defaultAddress])


  useEffect(() => {
    dispatch(fetchOrderAsync())
  },[orderState])

  useEffect(() => {
      
    if (orderState)
    {
const cloths = orderState.cloths.map((cloth) => ({ clothsId: cloth.clothsId._id, quantity: cloth.quantity, size: cloth.size }))   
 setOrderCloths(cloths)
    }  

  }, [orderState])

    useEffect(() => {

      const order = {address:selectedAdress,priceDetails:orderState.priceDetails,paymentMethod:paymentMethod}  
      
      setOrderDetails(order)
    
    }, [addressStatus,paymentMethod,selectedAdress])
  

    const handleOrder = () => {
    if (allAddress && paymentMethod)
    {
      const order = {
        cloths: orderCloths,
        ...orderDetails
      }

      console.log("order",order)

      dispatch(addOrderAsync(order)).then(() => {
        dispatch(removeAllCartItemsAsync())
      })

      setError(false)
      }
      else
    {
      setError(true)
      }
  }


  const loadingCondition = userStatus === "userinfo/Loading" || addressStatus==="userAddress/Loading"

  const renderCondition = orderState && userStatus === "userinfo/success" && addressStatus === "userAddress/success" 
  

  const userInfo = (
    <>
      <p>Name: {user.firstname} {user.lastname}</p>
      <p>Email: {user.email}</p>
      <hr />
      <p>
        Address: {allAddress.length<1 ? "Add Atleast One Address":selectedAdress?selectedAdress : "Select Address"}
      </p>
      <div>
      {allAddress && allAddress.map((address) => {
       return(<div className="form-check" key={address}>
         <input className="form-check-input" checked={selectedAdress===address} type="radio" name="address" id={address} value={address} onChange={(e)=>setSelectedAddress(e.target.value)} />
         <label htmlFor={address} >{address}</label>

        </div>)
      })}
 </div>

      {error && <p className="text-danger">Please Add All Information</p>}
      <div className="d-flex align-items-center mt-3">
        <button className="btn btn-warning me-2" onClick={handleOrder}>
          {orderStaus === "addOrder/Loading" ? "Please Wait" : "Place Order"}
        </button>

         {allAddress.length<1 && <Link className="fs-6 btn btn-primary" to={`/user/profile/address`}>Add New Address</Link>}
        
      </div>
    </>
  )


  return (
    <>
      { orderState &&  orderStaus !== "addOrder/Success" &&<div className="container py-4">

        <h1>Order Details</h1>
      
        <div>
          <ul>
            {orderClothsComp}
          </ul>
         
           <>
            
             <h5>PRICE DETAILS</h5>
           
            <hr />
            <p><span>Pirce ({orderState.cloths.length} Items) : </span><span> &#8377;{orderState.priceDetails.totalPrice}</span></p>
            <p>Discount: <span style={{ color: "green" }}>&minus;&#8377;{orderState.priceDetails.discount}</span></p>
             <p>Discounted Price: <span style={{color:"green"}}>&#8377;{orderState.priceDetails.discountedPrice}</span></p>
            <p>Delivery Charges: 
             
              
                 {orderState.priceDetails.deliveryCharges === 0 ?
             <> <span className="fs-6 text-decoration-line-through fw-light "> &#8377;40</span>
               <span className='text-success fs-6 fw-normal'> Free </span></> :
              <span>+40 Delivery</span>
                }
                 
                </p>
             
          <hr/>
            <h5 className="fs-4">Total Amount: &#8377;<span >{orderState.priceDetails.totalAmount >= 500 ? orderState.priceDetails.totalAmount : deliveryTotal}</span></h5>
            
<p style={{color:"green"}}>You will save &#8377;{orderState.priceDetails.discount} on this order</p>
          </>

        </div>

        <h5>Payment method: {paymentMethod}</h5>

        <div className="d-flex flex-wrap gap-3 align-items-center">
  <div className="form-check">
    <input
      className="form-check-input"
      type="radio"
      name="paymentMethod"
      value="Credit or debit card"
              id="creditordebitcard"
              onChange={handlePayment}
    />
    <label className="form-check-label" htmlFor="creditordebitcard">
      Credit or debit card
    </label>
  </div>

  <div className="form-check">
    <input
      className="form-check-input"
      type="radio"
      name="paymentMethod"
      value="Net Banking"
              id="netBanking"
              onChange={handlePayment}
    />
    <label className="form-check-label" htmlFor="netBanking">
      Net Banking
    </label>
  </div>

  <div className="form-check">
    <input
      className="form-check-input"
      type="radio"
      name="paymentMethod"
      value="Other UPI Apps"
              id="otherUPIApps"
              onChange={handlePayment}
    />
    <label className="form-check-label" htmlFor="otherUPIApps">
      Other UPI Apps
    </label>
  </div>

  <div className="form-check">
    <input
      className="form-check-input"
      type="radio"
      name="paymentMethod"
      value="Cash On Delivery"
              id="cashOnDelivery"
              onChange={handlePayment}
    />
    <label className="form-check-label" htmlFor="cashOnDelivery">
      Cash On Delivery
    </label>
  </div>
</div>

        
        <hr />

        <LoadingSpinner spinner={loadingCondition} />
        
        <div>
          
  {renderCondition && userInfo}
</div>

      </div>}

       {orderStaus === "addOrder/Success" && <OrderSuccess />}
      
    </>
  )

}
export default OrderPlace