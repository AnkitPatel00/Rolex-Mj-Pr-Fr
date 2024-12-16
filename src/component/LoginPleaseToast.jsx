import { useDispatch, useSelector } from "react-redux"
import {setPleaseLogin} from '../features/authentication/authenticationSlice'
import { useNavigate } from "react-router-dom"
const LoginPleaseToast = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { pleaselogin } = useSelector((state) => state.authenticationState);
  
  const handleLogin = () => {
    dispatch(setPleaseLogin(false))
    navigate('/login')
  }
  
  return (
    <>
   
       {pleaselogin && (
  <div
    style={{
      color: "white",
      width: "320px",
      height: "240px",
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
      zIndex: 2,
      backgroundColor: "rgba(0, 0, 0, 0.85)",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      padding: "20px",
    }}
  >
    <button
      onClick={() =>  dispatch(setPleaseLogin(false))}
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        backgroundColor: "transparent",
        border: "none",
        color: "white",
        fontSize: "18px",
        cursor: "pointer",
      }}
    >
      ✖
    </button>
    <h2 style={{ marginBottom: "20px" }}>Login Required</h2>
    <p style={{ marginBottom: "20px", fontSize: "14px" }}>
      Please log in and continue.
    </p>
    <button
      onClick={handleLogin}
      style={{
        padding: "10px 20px",
        backgroundColor: "#007BFF",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        transition: "background-color 0.3s",
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
      onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
    >
      Login
    </button>
  </div>
)}


    </>

  
  )
}
export default LoginPleaseToast
