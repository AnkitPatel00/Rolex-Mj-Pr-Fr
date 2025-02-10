
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUserAddress ,updateUserAddress, setasDeafultUserAddress} from "../features/address/addressSlice";

const AddAndUpdateAddress = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const localUser = JSON.parse(localStorage.getItem("user"));


 const {address,addressStatus,addressError} = useSelector((state)=>state.addressState)

  const [flatHouseNoBuildingCompanyApartment, setFlatHouseNoBuildingCompanyApartment] = useState("");
  const [areaStreetSectorVillage, setAreaStreetSectorVillage] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber,setPhoneNumber] = useState("");

   const [isAddressDefault, setIsAddressDefault] = useState(false);

  const isUpdate = location.state;

  useEffect(() => {
    if (isUpdate) {
      setFlatHouseNoBuildingCompanyApartment(isUpdate.flatHouseNoBuildingCompanyApartment);
      setAreaStreetSectorVillage(isUpdate.areaStreetSectorVillage);
      setLandmark(isUpdate.landmark);
      setCity(isUpdate.city);
      setState(isUpdate.state);
      setCountry(isUpdate.country);
      setPincode(isUpdate.pincode);
      setPhoneNumber(isUpdate.phoneNumber);
      setIsAddressDefault(isUpdate.setasDefault)
    }
  }, [location]);

  useEffect(() => {
    if (addressStatus === "addAddress/success" || addressStatus === "updateAddress/success") {
      navigate(`/user/profile/${localUser.username}`)
    }
  }, [addressStatus, navigate]);

  const handleSetDefault = (e) => {

    const { checked } = e.target
    
    if (checked)
    {
setIsAddressDefault(true)
    }
    else
    {
      setIsAddressDefault(false)
      } 
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const addressData = {
      userId: localUser._id,
      flatHouseNoBuildingCompanyApartment,
      areaStreetSectorVillage,
      landmark,
      city,
      state,
      country,
      pincode,
      phoneNumber
    };

    if (isUpdate) {
      const updatedData = {
        addressId: isUpdate._id,
        ...addressData,
      };
      
      if (isAddressDefault)
      {
        dispatch(updateUserAddress(updatedData));
        dispatch(setasDeafultUserAddress({ addressId: isUpdate._id}))
      }
      else
      {
        dispatch(updateUserAddress(updatedData));
        }

    } else {
      dispatch(addUserAddress(addressData));

    }
  };

  return (
    <div className="container py-4">
      <h1>{isUpdate ? "Update Address" : "Add New Address"}</h1>
      <form onSubmit={handleFormSubmit}>
        <label className="form-label">HouseNo/BuildingNo/Appartment: </label>
        <input className="form-control mb-3" type="text" value={flatHouseNoBuildingCompanyApartment} onChange={(e) => setFlatHouseNoBuildingCompanyApartment(e.target.value)} />
        <label className="form-label">Street/Area/Village: </label>
        <input className="form-control mb-3" type="text" value={areaStreetSectorVillage} onChange={(e) => setAreaStreetSectorVillage(e.target.value)} />
        <label className="form-label">Landmark: </label>
        <input className="form-control mb-3" type="text" value={landmark} onChange={(e) => setLandmark(e.target.value)} />
        <label className="form-label">City: </label>
        <input className="form-control mb-3" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        <label className="form-label">State: </label>
        <input className="form-control mb-3" type="text" value={state} onChange={(e) => setState(e.target.value)} />
        <label className="form-label">Country: </label>
        <input className="form-control mb-3" type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
        <label className="form-label">Pincode: </label>
        <input className="form-control mb-3" type="number" value={pincode} onChange={(e) => setPincode(e.target.value)} />
        <label className="form-label">Phone Number: </label>
        <input className="form-control mb-3" type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        {isUpdate && <><input type="checkbox" checked={isAddressDefault}  className="form-checkbox me-2"id="default" onChange={handleSetDefault}/><label className="form-label" htmlFor="default">Set as Default</label><br/></>}
        
        {isUpdate?<button className="btn btn-primary" disabled={addressStatus==="updateAddress/Loading"|| addressStatus==="defaultAddress/Loading" ?true:false}>{addressStatus==="updateAddress/Loading" || addressStatus==="defaultAddress/Loading" ?"Updating...":"Update Address"}</button>:
        <button className="btn btn-primary" disabled={addressStatus==="addAddress/Loading"?true:false}>{addressStatus==="addAddress/Loading"?"Saving...":"Add New Address"}</button>}

        
      </form>
    </div>
  );
};

export default AddAndUpdateAddress;
