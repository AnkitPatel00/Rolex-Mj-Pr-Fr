import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterAsync } from "../features/authentication/authenticationSlice";
import { useNavigate ,Link} from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerStatus, error,message,authStatus } = useSelector((state) => state.authenticationState);

  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");

  useEffect(() => {
    if (registerStatus === "userRegister/success")
    {
      setUsername("")
      setFirstname("")
      setLastname("")
      setEmail("")
      setPassword("")
      setMobilenumber("")
    }
},[registerStatus])

  const handleRegister = (e) => {
    e.preventDefault();
    const registrationData = {
      username,
      firstname,
      lastname,
      email,
      password,
      mobilenumber,
    };
    dispatch(userRegisterAsync(registrationData));
  };

  const handleLogin = (e) => {
    e.preventDefault()
    navigate('/login')
  }

  

  return (

       <div style={{border:"0px solid red",maxWidth:"100%",display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center",gap:"30px",marginTop:"20px"}}>

      {/* image card */}
      <div style={{border:"0px solid green"}}>
      <img src="https://madfrog.in/wp-content/uploads/2024/08/3-imageee.png.webp" style={{width:"100%",maxWidth:"600px"}} alt="cloths image" />
      </div>
       {/* login form */}
     
      
      <div 
  style={{
          border: "0.5px solid lightgrey", 
          boxShadow: "1px 2px 3px  grey",
    width: "100%", 
    maxWidth: "600px", 
    maxHeight: "600px", 
    display: "flex", 
    alignItems: "center", 
          justifyContent: "center",
          margin: "0px 50px",
    borderRadius:"50px"
  }}
>
  <form action="submit" onSubmit={handleRegister} style={{ width: "100%", maxWidth: "400px",padding:"20px" }}> {/* Set form width */}
          <h1 style={{ marginBottom: "20px" }}>Register</h1>
          
    <div className="mb-3">
      <input
              className="form-control form-control-lg"
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ fontSize: "1.2rem" }}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control form-control-lg"
              type="text"
              value={firstname}
              placeholder="First Name"
              onChange={(e) => setFirstname(e.target.value)}
              required
              style={{ fontSize: "1.2rem" }}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control form-control-lg"
              type="text"
              value={lastname}
              placeholder="Last Name"
              onChange={(e) => setLastname(e.target.value)}
              required
              style={{ fontSize: "1.2rem" }}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control form-control-lg"
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ fontSize: "1.2rem" }}
            />
          </div>

           <div className="mb-4">
            <input
              className="form-control form-control-lg"
              type="tel"
              value={mobilenumber}
              placeholder="Mobile Number"
              onChange={(e) => setMobilenumber(e.target.value)}
              required
              style={{ fontSize: "1.2rem" }}
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control form-control-lg"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ fontSize: "1.2rem" }}
            />
          </div>
         
          


         
          <button disabled={registerStatus === "userRegister/Loading"} style={{ padding: "10px 20px", marginRight: "20px", backgroundColor: "DodgerBlue", color: "white", border: "1px solid DodgerBlue", borderRadius: "10px", marginBottom: "20px" }}>
           {registerStatus === "userRegister/Loading" ? "Please Wait" : "Register"} 
          </button>
           <button onClick={handleLogin} style={{ padding: "10px 20px" ,marginRight:"20px",backgroundColor:"MediumSeaGreen",color:"white",border:"1px solid MediumSeaGreen",borderRadius:"10px"}}>Login</button>
{registerStatus ==="userRegister/success" && message && <p className="text-info mt-1" style={{ fontSize: "1.1rem" }}>{message}</p> }
     {registerStatus === "userRegister/reject" && error && <p className="text-danger mt-3" style={{ fontSize: "1.1rem" }}>{error}</p>}
        </form>
</div>

      <div style={{margin:"0px 50px"}}>
        <img src="https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/50d8d070-705b-4e05-8707-62263b4897df._CR0%2C0%2C3000%2C600_SX1500_.png" style={{width:"100%",maxWidth:"1200px"}} alt="cloths image" />
</div>

    </div>
  );
};

export default Register;
