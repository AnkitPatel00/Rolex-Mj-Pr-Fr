import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const apiUrl = "https://major-project-one-backend-six.vercel.app/api/cloths/get/all"

//fetch cloths


export const fetchCloths = createAsyncThunk('fetch/cloths', async () => {
  try {
    const response = await fetch(apiUrl)
    if (!response.ok)
    {
       const error = await response.json()
      throw new Error(error.error ||'Cant Fetch Cloths')
    }
  const data = await response.json()
  return data
  }
  catch (error)
  {
throw error
  }

})


const clothSlice = createSlice({
  name: "cloth",
  initialState: {
    cloths: [],
    clothStatus: 'idle',
    searchInput: "",
    clothError:null
  },
  reducers: {
     searchInputValue: (state,action) => {
      state.searchInput=action.payload
    }
  },
  extraReducers: (builder) => {
    //fetch cloths
    builder.addCase(fetchCloths.pending, (state) => {
      state.clothStatus="fetch/loading"
    })
    builder.addCase(fetchCloths.fulfilled, (state, action) => {

      state.clothStatus = "fetch/success" 

      const cloths = action.payload.data.products
      state.clothError =null
      
    const clothsWithDiscountedPrice = cloths?.map((cloth) => ({...cloth,discountedPrice:cloth.price - cloth.price * (cloth.discount * 0.01)}))
      state.cloths = clothsWithDiscountedPrice.toReversed()

    })
    builder.addCase(fetchCloths.rejected, (state, action) => {
       state.clothStatus = "fetch/error"
      state.clothError =action.error.message
    })
  }


})

export const {searchInputValue} = clothSlice.actions

export default clothSlice.reducer
