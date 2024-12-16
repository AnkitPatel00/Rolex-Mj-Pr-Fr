import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const getAuthHeaders = () => {
  const token = localStorage.getItem("token")
  return {
    'Content-Type': 'application/json',
    'Authorization':token
  }
}

const apiUrl = "https://major-project-one-backend-six.vercel.app"

//add order

export const addOrderAsync = createAsyncThunk('add/order',async (orderDetails) => {
      const response =await fetch(`${apiUrl}/api/order`, {
    method: "POST",
    headers: getAuthHeaders(),
    body:JSON.stringify(orderDetails)
      })
  if (!response.ok)
  {
    const error =await response.json()
    throw new Error(error.error || 'failed to order')
  }
  const data =await response.json() 
  return data
})

//fetch order

export const fetchOrderAsync = createAsyncThunk('fetch/order', async() => {
  
  const response = await fetch(`${apiUrl}/api/order/get`, {
    headers:getAuthHeaders()
  })

  if (!response.ok)
  {
    const error =await response.json()

    throw new Error(error.error || 'Failed to get Order')
  }

  const data = await response.json()

  return data

})


//cancel order

export const cancelOrderAsync = createAsyncThunk('cancel/order',async (orderId) => {
  const response = await fetch(`${apiUrl}/api/order/delete/${orderId}`, {
    method:"DELETE",
    headers:getAuthHeaders()
  })
 if (!response.ok)
  {
    const error =await response.json()

    throw new Error(error.error || 'Failed to Cancel Order')
  }

  const data = await response.json()

  return data

})

const orderSlice = createSlice({
  name: "orderState",
  initialState: {
    orders: [],
    orderStaus: 'idle',
    orderError:null
  },
  reducers:{

  },
  extraReducers: (builder) => {

//add order

    builder.addCase(addOrderAsync.pending, (state) => {
      state.orderStaus="addOrder/Loading"
    })
    builder.addCase(addOrderAsync.fulfilled, (state,action) => {
      state.orderStaus = "addOrder/Success"
      state.orders = [...state.orders,action.payload]
    })
    builder.addCase(addOrderAsync.rejected, (state,action) => {
      state.orderStaus = "addOrder/Rejected"
      state.orderError = action.error.message
    })

//fetch order

     builder.addCase(fetchOrderAsync.pending, (state) => {
      state.orderStaus="fetchOrder/Loading"
    })
    builder.addCase(fetchOrderAsync.fulfilled, (state,action) => {
      state.orderStaus = "fetchOrder/Success"
      state.orders = action.payload
      state.orderError =null
    })
    builder.addCase(fetchOrderAsync.rejected, (state,action) => {
      state.orderStaus = "fetchOrder/Rejected"
      state.orderError = action.error.message
    })

    //cancel order

     builder.addCase(cancelOrderAsync.pending, (state) => {
      state.orderStaus="cancelOrder/Loading"
    })
    builder.addCase(cancelOrderAsync.fulfilled, (state,action) => {
      state.orderStaus = "cancelOrder/Success" 
      state.orders = state.orders.filter((order)=>order._id !== action.payload._id)
    })
    builder.addCase(cancelOrderAsync.rejected, (state,action) => {
      state.orderStaus = "cancelOrder/Rejected"
      state.orderError = action.error.message
    })

  }
})
export default orderSlice.reducer