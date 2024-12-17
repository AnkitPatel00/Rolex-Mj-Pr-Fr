import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const apiUrl = "https://clothstoreserver.vercel.app"

const getAuthHeaders = () => {
  const token = localStorage.getItem("token")
  return {
    "Content-Type": "application/json",
    "Authorization": token
  }
}



//fetch address

export const fetchAddressAsync = createAsyncThunk("fetch/address", async () => {

  const response = await fetch(`${apiUrl}/api/users/profile/address/get`,
    {
      method: "GET",
      headers: getAuthHeaders()
    })
     if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch User Address")
  }
  const data = await response.json();
  return data;
  
})

//add adresss

export const addUserAddress = createAsyncThunk("add/address", async (addressData) => {

  const response = await fetch(`${apiUrl}/api/users/profile/address/add`,
    {
      method: "POST",
      headers:getAuthHeaders(),
      body:JSON.stringify(addressData)
    })
  
  if (!response.ok) {
   
    const error = await response.json();
    throw new Error(error.error || "Failed to add User Address")
  }
  const data = await response.json();

  return data;
  
})



//update adresss

export const updateUserAddress = createAsyncThunk("update/address", async (addressData) => {


  const response = await fetch(`${apiUrl}/api/users/profile/address/update`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body:JSON.stringify(addressData)
    })
  
  if (!response.ok) {
   
    const error = await response.json();
    throw new Error(error.error || "Failed to add User Address")
  }
  const data = await response.json();

  return data;
  
})

//set address as default

export const setasDeafultUserAddress = createAsyncThunk("setDefault/address", async (addressId) => {

  const response = await fetch(`${apiUrl}/api/users/profile/address/setdefault`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body:JSON.stringify(addressId)
    })
  
  if (!response.ok) {
   
    const error = await response.json();
    throw new Error(error.error || "Failed to add User Address")
  }
  const data = await response.json();

  return data;
  
})


//delete adresss

export const deleteAddresAsync = createAsyncThunk("delete/address", async (addressId) => {
  const response = await fetch(`${apiUrl}/api/users/profile/address/delete`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body:JSON.stringify(addressId)
    })
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to delete User Address")
  }
  const data = await response.json();
  return data;
})


const addressSlice = createSlice({
  name: "addressState",
  initialState: {
      address:[],
    addressStatus: "idle",
    message: null,
    addressError:null
  },
  reducers: {
    
  },
  extraReducers: (builder) => {

      //fetch user address
    
     builder.addCase(fetchAddressAsync.pending, (state) => {
      state.addressStatus="userAddress/Loading"
    })
     builder.addCase(fetchAddressAsync.fulfilled, (state,action) => {
       state.addressStatus = "userAddress/success"
       state.address = action.payload
        state.addressError =null
       
     })
     builder.addCase(fetchAddressAsync.rejected, (state,action) => {
      state.addressStatus = "userAddress/reject";
    state.addressError = action.error.message;
     })
    
    
        
      //add user address
    
builder.addCase(addUserAddress.pending, (state) => {
      state.addressStatus="addAddress/Loading"
    })
     builder.addCase(addUserAddress.fulfilled, (state,action) => {
       state.addressStatus = "addAddress/success"
       state.address = [...state.address,action.payload]
       
     })
     builder.addCase(addUserAddress.rejected, (state,action) => {
      state.addressStatus = "addAddress/reject";
    state.addressError = action.error.message;
     })
    
    
     //update user address
    
builder.addCase(updateUserAddress.pending, (state) => {
      state.addressStatus="updateAddress/Loading"
    })
     builder.addCase(updateUserAddress.fulfilled, (state,action) => {
       state.addressStatus = "updateAddress/success"

       const index = state.address.findIndex((address)=>address._id===action.payload._id)
       state.address[index] = action.payload
       
     })
     builder.addCase(updateUserAddress.rejected, (state,action) => {
      state.addressStatus = "updateAddress/reject";
    state.addressError = action.error.message;
     })
    
    
     //set default user address
    
builder.addCase(setasDeafultUserAddress.pending, (state) => {
      state.addressStatus="defaultAddress/Loading"
    })
     builder.addCase(setasDeafultUserAddress.fulfilled, (state,action) => {
       state.addressStatus = "defaultAddress/success"

       state.address = action.payload
       
     })
     builder.addCase(setasDeafultUserAddress.rejected, (state,action) => {
      state.addressStatus = "defaultAddress/reject";
    state.addressError = action.error.message;
     })
    
    
     //delete user address
    
builder.addCase(deleteAddresAsync.pending, (state) => {
      state.addressStatus="deleteAddress/Loading"
    })
     builder.addCase(deleteAddresAsync.fulfilled, (state,action) => {
       state.addressStatus = "deleteAddress/success"

      state.address = state.address.filter((address)=>address._id !== action.payload._id)
       
     })
     builder.addCase(deleteAddresAsync.rejected, (state,action) => {
      state.addressStatus = "deleteAddress/reject";
    state.addressError = action.error.message;
     })
    
    
  }

})


export default addressSlice.reducer