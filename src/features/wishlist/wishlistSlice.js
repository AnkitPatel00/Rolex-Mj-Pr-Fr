import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setPleaseLogin } from '../authentication/authenticationSlice';

//add wishlist items

const apiUrl ="https://major-project-one-backend-six.vercel.app"

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    "Authorization": token
  };
};

export const addWishlistAsync = createAsyncThunk("add/wishlist", async (wishlistInfo) => {

  const response = await fetch(`${apiUrl}/api/users/wishlist/add`, {
    method: "POST",
    headers: getAuthHeaders(),
    body:JSON.stringify(wishlistInfo)
  })

 if (!response.ok) {
   
   const error = await response.json();
   throw new Error(error.error || "failed to add wishlist")

  }
  const data = await response.json();
  return data;
})

//remove wishlist items

export const removeWishlistAsync = createAsyncThunk("remove/wishlist", async (wishlistInfo) => {

  const response = await fetch(`${apiUrl}/api/users/wishlist/remove`, {
    method: "DELETE",
    headers: getAuthHeaders(),
    body:JSON.stringify(wishlistInfo)
  })

 if (!response.ok) {
   
   const error = await response.json();
   throw new Error(error.error || "failed to add wishlist")

  }
  const data = await response.json();
  return data;
})

//fetch wishlist items

export const getWishlistAsync = createAsyncThunk("get/wishlist", async (wishlistInfo) => {

  const response = await fetch(`${apiUrl}/api/users/wishlist/get/all/populate`, {
    method: "GET",
    headers: getAuthHeaders()
  })

if (!response.ok) {
   
   const error = await response.json();
   throw new Error(error.error || "failed to get wishlist")

  }
  const data = await response.json();

  return data;
})

const wishlistSlice = createSlice({
  name: "wishlistApp",
  initialState: {
    wishlistItem: [],
    totalWishlistItems:0,
    wishlistStatus: "idle",
    wishlistError: null
  },
  reducers: {
    wishlistReset: (state) => {
      state.totalWishlistItems = 0
      state.wishlistItem = []
      state.wishlistError = null
    }
  },
  extraReducers: (builder) => {

    //add to wishlist

    builder.addCase(addWishlistAsync.pending, (state) => {
      state.wishlistStatus = "addWishlist/Loading"
      
    })
    builder.addCase(addWishlistAsync.fulfilled, (state, action) => {

      state.wishlistStatus = "addWishlist/success"

        state.totalWishlistItems +=1 
         state.wishlistItem = [...state.wishlistItem, action.payload]

    })
    builder.addCase(addWishlistAsync.rejected, (state,action) => {

      state.wishlistStatus = "addWishlist/rejected"
       state.wishlistError = action.error.message;
      
    })

    //remove from wishlist

     builder.addCase(removeWishlistAsync.pending, (state) => {
      state.wishlistStatus = "removeWishlist/Loading"
      
    })
    builder.addCase(removeWishlistAsync.fulfilled, (state, action) => {

      state.wishlistStatus = "removeWishlist/success"
 
       state.totalWishlistItems -=1 

      const wishlist = state.wishlistItem.filter((cloth) => cloth.clothsId._id != action.payload.clothsId)

       state.wishlistItem = wishlist
    })
    builder.addCase(removeWishlistAsync.rejected, (state,action) => {

      state.wishlistStatus = "removeWishlist/rejected"
       state.wishlistError = action.error.message;
      
    })

    //get  wishlist items'

     builder.addCase(getWishlistAsync.pending, (state,action) => {
state.wishlistStatus = "getWishlist/Loading"
     })
    
     
    
    builder.addCase(getWishlistAsync.fulfilled, (state, action) => {

    

       state.wishlistStatus = "getWishlist/success"
      
      state.wishlistItem = action.payload

       state.totalWishlistItems = state.wishlistItem.length

    })
    builder.addCase(getWishlistAsync.rejected, (state,action) => {

      state.wishlistStatus = "getWishlist/rejected"
       state.wishlistError = action.error.message;
      
    })

    
  }
})

export const {wishlistReset} = wishlistSlice.actions
export default wishlistSlice.reducer