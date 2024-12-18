import { useNavigate ,useLocation, Link} from "react-router-dom"
import { fetchAddressAsync ,deleteAddresAsync} from "../features/address/addressSlice"
import { userFetchAsync } from "../features/user/userSlice"
import { useDispatch,useSelector } from "react-redux"
import React, { useEffect } from "react"
import LoadingSpinner from "../component/LoadingSpinner"
import OrderList from "../component/OrderList"
import { fetchOrderAsync } from "../features/order/orderSlice"
import ErrorMessage from '../component/ErrorMessage'

const UserProfile = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

   const { isloggin} = useSelector((state) => state.authenticationState)
  const { userStatus, user, userError } = useSelector((state) => state.userState)
  const {address,addressStatus,addressError} = useSelector((state)=>state.addressState)
  const { orders, orderStaus, orderError } = useSelector((state) => state.orderState)
  
    useEffect(() => {
    if (!isloggin)
    {
navigate('/login')
    }
  }, [isloggin])

  useEffect(() => {
    if (isloggin)
    {
      if (userStatus !== 'userinfo/success' && addressStatus !== 'userAddress/success' && orderStaus !=='fetchOrder/Success')
      {
        dispatch(userFetchAsync()).then(() => {
      dispatch(fetchAddressAsync()).then(() => {
       dispatch(fetchOrderAsync())  
   })
 })
      }

    }  
  }, [location.pathname,orderStaus])

    const handleAddressDelete = (addressId) => {
    dispatch(deleteAddresAsync({ addressId })) 
    }
  
  useEffect(() => {
    if (userStatus === 'userUpdate/success')
    {
dispatch(userFetchAsync())
    }
    
  },[userStatus])

  useEffect(() => {
    if (addressStatus === "deleteAddress/success" || addressStatus === 'addAddress/success' || addressStatus ==='updateAddress/success' )
    {
        dispatch(fetchAddressAsync())
    }
  }, [addressStatus])
  
  useEffect(() => {
    if(orderStaus === "cancelOrder/Success" || orderStaus === "addOrder/Success")
    {
      dispatch(fetchOrderAsync())
 }   
  }, [orderStaus])


   const emptyOrders =  (<div className="mt-5 mb-5">
        <h1 className="text-center display-5">No Orders!</h1>
  </div>)

     const emptyAddress =  (<div className="mt-5 mb-5">
        <h1 className="text-center display-5">No Address!</h1>
  </div>)

  const banner = <div style={{margin:"40px 50px"}}>
        <img src="https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/50d8d070-705b-4e05-8707-62263b4897df._CR0%2C0%2C3000%2C600_SX1500_.png" style={{width:"100%",maxWidth:"1200px"}} alt="cloths image" />
</div>

  const loginDetails = <div>
    <div className="container py-5">
      
      {/* User Info Section */}
      
  <div className="row">
    <div className="col-md-4" >
          <div className="card shadow-sm border-0" >

            <ErrorMessage error={userError} />

              <LoadingSpinner spinner={isloggin && userStatus === "userinfo/Loading"} />
            
{ isloggin && userStatus === "userinfo/success" &&
            <div className="card-body" style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
              <div style={{background:"lightgrey",width:"200px",height:"200px",border:"1px solid lightgrey",borderRadius:"100px",display:"flex",justifyContent:"center",alignItems:"center"}}>
 <h3 className="display-7 text-light">{user.firstname} {user.lastname}</h3>
              </div>
          <p className="fs-5 text-muted">Username: {user.username}</p>
          <p className="fs-6 text-muted">Email: {user.email}</p>
          <p className="fs-6 text-muted">Phone: {user.mobilenumber}</p>
          <Link className="btn btn-outline-primary mt-3" to="/user/profile/edit" state={user}>Edit Profile</Link>
            </div>
            
}
      </div>
    </div>

    {/* Address Section */}
    <div className="col-md-8">
          <div className="card shadow-sm border-0">
            
        <div className="card-body">
          <h3 className="card-title text-primary mb-4">Address Information</h3>

              <Link className="btn btn-success mb-4" to="/user/profile/address">+ Add New Address</Link>

                 <ErrorMessage error={addressError} />
              
              <LoadingSpinner spinner={addressStatus === "userAddress/Loading"} />
              

              { addressStatus === "userAddress/success"  && address.length<1 && emptyAddress  }
              

              {  isloggin && addressStatus === "userAddress/success"  &&
          
              <div className="row">

            {addressStatus==="userAddress/success" && address?.map((address) => (
              <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={address._id}>
                <div className="card border-light p-3 shadow-sm">
             <h5 className="card-title text-dark">
  Address: {address.setasDefault && <span style={{ color: 'green' }}><i className="fa-solid fa-check"></i></span>}</h5>
                  <p><strong>House No./Building:</strong> {address.flatHouseNoBuildingCompanyApartment}</p>
                  <p><strong>Street/Area:</strong> {address.areaStreetSectorVillage}</p>
                  <p><strong>Landmark:</strong> {address.landmark}</p>
                  <p><strong>City:</strong> {address.city}</p>
                  <p><strong>State:</strong> {address.state}</p>
                  <p><strong>Country:</strong> {address.country}</p>
                  <p><strong>Pincode:</strong> {address.pincode}</p>

                  <div className="d-flex justify-content-between mt-3">
                    <Link className="btn btn-outline-warning" to="/user/profile/address" state={address}>Edit</Link>
                    <button disabled={addressStatus==="deleteAddress/Loading"?true:false} className="btn btn-outline-danger" onClick={() => handleAddressDelete(address._id)}>{addressStatus==="deleteAddress/Loading"?"Deleting...":"Delete"}</button>
                  </div>
                </div>
              </div>
            ))}     
                </div>            
}
        </div>   
      </div>
    </div>
      </div>
      
</div>
  </div>

  return (

    <>
      <div className="container py-4">

        {loginDetails} 

      <hr/>

      {orders?.length === 0 && emptyOrders}

        {orderStaus === "fetchOrder/Success" && orders?.length > 0 && <OrderList orders={orders} />}

         <ErrorMessage error={orderError} />
        
         <LoadingSpinner spinner={orderStaus === "fetchOrder/Loading" || orderStaus === "cancelOrder/Loading"} />
      
        <hr />
        
      {banner}
        
    </div>
</>

  
  )
}

export default UserProfile