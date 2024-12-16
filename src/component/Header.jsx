import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {searchInputValue } from "../features/cloths/clothSlice";
import { getWishlistAsync, wishlistReset } from "../features/wishlist/wishlistSlice";
import { getCartAsync ,cartReset} from "../features/cart/cartSlice";
import { logoutUser } from "../features/authentication/authenticationSlice";
import { FaHeart, FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import  '../index.css'

const Header = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  const { isloggin } = useSelector((state) => state.authenticationState);

  const {wishlistStatus,totalWishlistItems } = useSelector((state) => state.wishlistState);
  const {cartStatus,totalCartItem } = useSelector((state) => state.cartState)

  const localUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(searchInputValue(search));
  }, [search, dispatch]);

  useEffect(() => {
    if (isloggin)
    {   
      dispatch(getWishlistAsync()).then(() => {
    dispatch(getCartAsync())
 })
       
    }
  },[])

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(wishlistReset())
    dispatch(cartReset())
  };

  return (

    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="../icons/clothstore.svg" alt="logo" width={50} />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <NavLink className="nav-link" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/cloths">Cloths</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">About</NavLink>
              </li>
            </ul>

            {location.pathname === "/cloths" && (
              <div className="d-flex mx-auto w-50">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Cloths..."
                  />
                  <span className="input-group-text bg-primary text-white">
                    <FaSearch />
                  </span>
                </div>
              </div>
            )}

            <ul className="navbar-nav ms-auto">
              
              {isloggin ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={`/user/profile/${localUser.username}`}>
                      <FaUser className="me-1" /> {localUser.username}/ Orders
                    </NavLink>
                  </li>
                  <li className="nav-item me-4">
                    <button className="btn nav-link" onClick={handleLogout}>Logout</button>
                  </li>
                </>
              ) : (
                <li className="nav-item me-4">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
              )}

              <li className="nav-item">
                <NavLink className="nav-link" to="/wishlist">
                  <FaHeart className="me-1" />
                  <span>{totalWishlistItems}</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">
                  <FaShoppingCart className="me-1" />
                  <span>{totalCartItem}</span>
                </NavLink>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;


