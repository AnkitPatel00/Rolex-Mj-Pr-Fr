import { useEffect } from "react"
import { Link,useNavigate } from "react-router-dom"

const OrderSuccess = () => {

  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  useEffect(() => {
   const t=  setTimeout(() => {
      navigate(`/user/profile/${user.username}`)
    },3000)

    return () => {
    clearTimeout(t)
  }
  },[])

  return (
    <>
      <h1 className="text-center mt-5">Order Placed Successfully!</h1>
      <div style={{display:"flex",justifyContent:"center"}}>
        <Link className="btn btn-primary" style={{ width: '150px', textAlign: "center" }} to={`/user/profile/${user.username}`} >Go to Orders</Link>
      </div>
      <p className="text-center text-info">Redirecting to Orders...</p>
      
    </>
  )
}
export default OrderSuccess