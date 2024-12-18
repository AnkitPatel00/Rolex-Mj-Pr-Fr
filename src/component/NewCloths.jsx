
import { fetchCloths } from "../features/cloths/clothSlice";
import { getCartAsync } from "../features/cart/cartSlice";
import { getWishlistAsync } from "../features/wishlist/wishlistSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect} from "react";
import ProductsCard from "./ProductsCard";
import LoadingSpinner from "./LoadingSpinner";
import '../index.css'
import ErrorMessage from "./ErrorMessage";
import { useLocation } from "react-router-dom";

const NewCloths = () => {

  const dispatch = useDispatch();
  const location = useLocation()

  const { isloggin } = useSelector((state) => state.authenticationState);
  const { cloths, clothStatus, clothError } = useSelector((state) => state.clothsState);
  
  useEffect(() => {
    if (clothStatus !== "fetch/success")
    {
      dispatch(fetchCloths());
    }
  }, [clothStatus, location.pathname]);
  


  useEffect(() => {
    if (isloggin)
    {
dispatch(getWishlistAsync()).then(() => {
       dispatch(getCartAsync())
    }) 
    }
  },[isloggin,location.pathname])

  const newArrivalCloths = cloths?.map((cloth) => cloth).slice(0, 4)
 
  return (
    <>
      <div className="bg-secondary text-light text-center py-4 mt-4">
        <h3>New Arrival</h3>
      </div>
         
      {/* new Arrival container */}
      
      <div style={{ display: "flex", justifyContent: "center"}}>

        <ErrorMessage error={clothError} />

        <LoadingSpinner spinner={clothStatus === "fetch/loading"} />

    {clothStatus === "fetch/success" && (
          <div >      
            <ProductsCard cloths={newArrivalCloths} />           
      </div>
    )}
      </div>
    </>
  );
};

export default NewCloths;
