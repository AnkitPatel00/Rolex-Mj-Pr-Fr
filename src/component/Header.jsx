import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {searchInputValue } from "../features/cloths/clothSlice";
import { getWishlistAsync} from "../features/wishlist/wishlistSlice";
import { getCartAsync } from "../features/cart/cartSlice";
import { FaHeart, FaShoppingCart} from "react-icons/fa";
import '../index.css'
import clothstoreLogo from '../../icons/clothstore.svg'
import { useLogout } from "../useLogout";

const Header = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const {logoutDispatch} = useLogout()

  const { isloggin } = useSelector((state) => state.authenticationState);

  const {wishlistStatus,totalWishlistItems } = useSelector((state) => state.wishlistState);
  const {cartStatus,totalCartItem } = useSelector((state) => state.cartState)

  const localUser = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
      logoutDispatch()
  };



  useEffect(() => {
    if (isloggin)
    {   
      dispatch(getWishlistAsync()).then(() => {
    dispatch(getCartAsync())
 })
    }
  },[isloggin])



  return (

    <header style={{marginBottom:"80px"}}>

      <nav className="navbar navbar-expand-sm bg-body-tertiary fixed-top">
      <div className="container">
          <Link className="navbar-brand me-auto" to="/">
           <img src={clothstoreLogo} alt="logo" width={50} />
          </Link>
       
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <Link className="navbar-brand me-auto" to="/">
           <img src={clothstoreLogo} alt="logo" width={50} />
          </Link>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cloths">Cloths</Link>
              </li>
             <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
                </li>
              </ul>  

             

              <div className="navbar-nav justify-content-end flex-grow-1 pe-3">

             

                {isloggin ? (
                < >
              <div style={{display:"flex"}}>
              <NavLink style={{color:"white",display:"flex",justifyContent:"center",alignItems:"center",fontSize:"20px", backgroundColor: "lightgrey", width: "40px", height: "40px",borderRadius:"20px"}} className="nav-link me-3 " to={`/user/profile/${localUser.username}`}>
                  {localUser.firstname.charAt(0)}
                </NavLink>
      
                    <button className="btn btn-danger me-3" onClick={handleLogout}>Logout</button>
            </div>
                </>
              ) : (
             
                  <NavLink className="me-3 btn btn-primary nav-list" to="/login">Login</NavLink>
     
              )}
                
              </div>
            </div>
          </div>

          <NavLink className="nav-link me-2" to="/wishlist">
                   <FaHeart className="me-1" />
                  <span>{totalWishlistItems}</span>
                </NavLink>
        
          
               <NavLink className="nav-link" to="/cart">
                  <FaShoppingCart className="me-1" />
                  <span>{totalCartItem}</span>
                </NavLink>
          
           <button
          className="navbar-toggler ms-3"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
      </div>
    </nav>

    </header>

  );
};

export default Header;


