import { useEffect, useState } from "react"
import { userLoginAsync } from "../features/authentication/authenticationSlice"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

   const { isloggin ,authStatus,error} = useSelector((state) => state.authenticationState)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

   const localUser = JSON.parse(localStorage.getItem('user'))
  
  const handleLogin = (e) => {
    e.preventDefault()
    const loginData = {
      email,
      password
    }
    dispatch(userLoginAsync(loginData))
  }

  const handleRegister = (e) => {
    e.preventDefault()
     navigate('/register')
  }

  useEffect(() => {
    if (isloggin)
    {
      navigate('/')
     }
   
  }, [localUser, authStatus])
  
  
  return (

    <div style={{border:"0px solid red",maxWidth:"100%",display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center",gap:"20px",marginTop:"100px"}}>

    
      <div style={{border:"0px solid green"}}>
      <img src="https://madfrog.in/wp-content/uploads/2024/08/3-imageee.png.webp" style={{width:"100%",maxWidth:"500px"}} alt="cloths image" />
      </div>
     
      
      <div 
  style={{
          border: "0.5px solid lightgrey", 
          boxShadow: "1px 2px 3px  grey",
    width: "100%", 
    maxWidth: "500px", 
    height: "400px", 
    display: "flex", 
    alignItems: "center", 
          justifyContent: "center",
          margin: "0px 50px",
          borderRadius: "50px",
    
  }}
>
  <form action="submit" onSubmit={handleLogin} style={{ width: "100%", maxWidth: "400px",padding:"20px" }}> 
          <h1 style={{ marginBottom: "20px" }}>Login</h1>
          
          <div className="mb-3">
<input 
            
            value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
      className="form-control form-control-lg" 
            type="email" 
            placeholder="email@domain.com"
    />
          </div>
          
          <div className="mb-3">
 <input 
             value={password}
 onChange={(e) => setPassword(e.target.value)}
required
       className="form-control form-control-lg"
            type="password" 
             placeholder="Password"
          />
          </div>
         
          
          <button disabled={authStatus === "userLogin/Loading"} style={{ padding: "10px 20px" ,marginRight:"20px",backgroundColor:"DodgerBlue",color:"white",border:"1px solid DodgerBlue",borderRadius:"10px",marginBottom:"20px"}}>{authStatus === "userLogin/Loading" ? "Please Wait" : "Login"} </button>
           <button onClick={handleRegister} style={{ padding: "10px 20px" ,marginRight:"20px",backgroundColor:"MediumSeaGreen",color:"white",border:"1px solid MediumSeaGreen",borderRadius:"10px"}}>Register</button>
  {authStatus === "userLogin/reject" && error && <p className="text-danger mt-3" style={{ fontSize: "1.1rem" }}>{error}</p>}
        </form>
</div>

      <div style={{margin:"0px 50px"}}>
        <img src="https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/50d8d070-705b-4e05-8707-62263b4897df._CR0%2C0%2C3000%2C600_SX1500_.png" style={{width:"100%",maxWidth:"1200px"}} alt="cloths image" />
</div>

    </div>


  )
}
export default Login