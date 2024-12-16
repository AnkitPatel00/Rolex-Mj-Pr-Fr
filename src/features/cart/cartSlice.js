import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiUrl ="https://major-project-one-backend-six.vercel.app"

const getAuthHeaders = () => {
  const token = localStorage.getItem("token")
  return {
    "Content-Type": 'application/json',
    "Authorization": token
  }
}

//add to cart

export const addtoCartAsync = createAsyncThunk("add/cart", async (cartInfo) => {

  const response = await fetch(`${apiUrl}/api/users/cart/add`, {
    method: "POST",
    headers: getAuthHeaders(),
    body:JSON.stringify(cartInfo)
  })

 if (!response.ok) {
   
   const error = await response.json();
   throw new Error(error.error || "failed to add in cart")

  }
  const data = await response.json();
  return data;
})


//remove cart items

export const removeCartItemAsync = createAsyncThunk("remove/cart", async (cartInfo) => {


  const response = await fetch(`${apiUrl}/api/users/cart/remove`, {
    method: "DELETE",
    headers: getAuthHeaders(),
    body:JSON.stringify(cartInfo)
  })
 if (!response.ok) {
   
   const error = await response.json();
   throw new Error(error.error || "failed to remove cart Item")
  }
  const data = await response.json();
  return data;
})


//update cart quantity

export const updateCartItemAsync = createAsyncThunk('update/cart', async(cartInfo) => {
   const response = await fetch(`${apiUrl}/api/users/cart/update`, {
    method: "POST",
    headers: getAuthHeaders(),
    body:JSON.stringify(cartInfo)
  })
 if (!response.ok) {
   
   const error = await response.json();
   throw new Error(error.error || "failed to remove cart Item")
  }
  const data = await response.json();
  return data;
})


//fetch cart items

export const getCartAsync = createAsyncThunk("get/cart", async () => {

  const response = await fetch(`${apiUrl}/api/users/cart/get/all/populate`, {
    method: "GET",
    headers: getAuthHeaders()
  })

if (!response.ok) {
   
   const error = await response.json();
   throw new Error(error.error || "failed to get cart items")

  }
  const data = await response.json();

  return data;
})


//remove all cart items

export const removeAllCartItemsAsync = createAsyncThunk('removeAll/cart', async () => {
  
  const response = await fetch(`${apiUrl}/api/users/cart/remove/all`, {
    method: "DELETE",
    headers: getAuthHeaders()
  })
  
  if (!response.ok)
  {
    const error = await response.json()
     throw new Error(error.error || 'failed to delete')
  }

  const data = await response.json()
  
  return data

})

const cartSlice = createSlice({
  name: "cartManagement",
  initialState: {
    cartCloths: [],
    cartStatus: 'idle',
    totalCartItem:0,
    cartError:null
  },
  reducers: {
    cartReset: (state) => {
      state.totalCartItem = 0
      state.cartCloths = []
      state.cartError = null
      state.cartStatus = 'idle'
    }
  },
  extraReducers: (builder) => {

     //add to cart

    builder.addCase(addtoCartAsync.pending, (state) => {
      state.cartStatus = "addCart/Loading"
    })
    builder.addCase(addtoCartAsync.fulfilled, (state, action) => {

      state.cartStatus = "addCart/success"
        state.totalCartItem +=1 
          state.cartCloths = [...state.cartCloths, action.payload]
    })
    builder.addCase(addtoCartAsync.rejected, (state,action) => {

      state.cartStatus = "addCart/rejected"
       state.cartError = action.error.message;
    })

      //remove from cart

     builder.addCase(removeCartItemAsync.pending, (state) => {
      state.cartStatus = "removeCart/Loading"
      
     })
    
    builder.addCase(removeCartItemAsync.fulfilled, (state, action) => {

      state.cartStatus = "removeCart/success"

      state.totalCartItem -= 1 

       state.cartCloths = state.cartCloths.filter((cloth) => cloth.clothsId._id != action.payload.clothsId)


    })
    builder.addCase(removeCartItemAsync.rejected, (state,action) => {

      state.cartStatus = "removeCart/rejected"
       state.cartError = action.error.message;
      
    })

    //update cartItem

    builder.addCase(updateCartItemAsync.pending, (state,action) => {
state.cartStatus = "updateCart/Loading"
    })
    
     builder.addCase(updateCartItemAsync.fulfilled, (state,action) => {

       state.cartStatus = "updateCart/success"
       const index = state.cartCloths.findIndex((cartCloth) => cartCloth._id === action.payload._id)
       
       state.cartCloths[index].size = action.payload.size
        state.cartCloths[index].quantity = action.payload.quantity

    })
    builder.addCase(updateCartItemAsync.rejected, (state,action) => {

      state.cartStatus = "updateCart/rejected"
       state.cartError = action.error.message;
      
    })


     //get  cart items

     builder.addCase(getCartAsync.pending, (state,action) => {
state.cartStatus = "getCart/Loading"
    })
    
     builder.addCase(getCartAsync.fulfilled, (state,action) => {

       state.cartStatus = "getCart/success"
       
       state.cartCloths = action.payload 

       state.totalCartItem = state.cartCloths.length

       state.cartError =null
    })
    builder.addCase(getCartAsync.rejected, (state,action) => {

      state.cartStatus = "getCart/rejected"
       state.cartError = action.error.message;
      
    })


    //remove all from cart

    builder.addCase(removeAllCartItemsAsync.pending, (state) => {
    state.cartStatus ="removeAllcart/Loading"
    })

    builder.addCase(removeAllCartItemsAsync.fulfilled, (state) => {
      state.cartStatus = "removeAllcart/success"
      state.cartCloths = []
      state.totalCartItem =0
    })

    builder.addCase(removeAllCartItemsAsync.rejected, (state,action) => {
      state.cartStatus = "removeAllcart/rejected"
      state.cartError = action.error.message
    })

    
  }
})

export const {cartReset} = cartSlice.actions

export default cartSlice.reducer
