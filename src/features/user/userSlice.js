import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setPleaseLogin } from '../authentication/authenticationSlice'
import { useDispatch } from 'react-redux'

// const dispatch = useDispatch()

const apiUrl = "https://clothstoreserver.vercel.app"

const getAuthHeaders = () => {
  const token = localStorage.getItem("token")
  return {
    'Content-Type': 'application/json',
    'Authorization': token
  }
}

//fetch user

export const userFetchAsync = createAsyncThunk("fetch/user", async () => {

  const response = await fetch(`${apiUrl}/api/user/profile/get`,
    {
      method: "GET",
      headers: getAuthHeaders()
    })
  
  if (!response.ok) {

    const error = await response.json();
  
    throw new Error(error.error ||"Failed to fetch User");
  }
  const data = await response.json();
  return data;
})


//update user

export const userUpdateAsync = createAsyncThunk("update/user", async (userUpdateData) => {

  const response = await fetch(`${apiUrl}/api/users/profile/update`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(userUpdateData)
    })
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch User");
  }
  const data = await response.json();
  return data;
})

const userSlice = createSlice({

  name: "userSlice",
  initialState: {
     user: {},
    userStatus: "idle",
    message: null,
    userError: null,
  },
  reducers: {
},
  extraReducers: (builder) => {
   

   //fetch user

     builder.addCase(userFetchAsync.pending, (state) => {
      state.userStatus="userinfo/Loading"
    })
     builder.addCase(userFetchAsync.fulfilled, (state,action) => {
       state.userStatus = "userinfo/success"
       state.user = action.payload
       state.userError=null
       
     })
     builder.addCase(userFetchAsync.rejected, (state,action) => {
       state.userStatus = "userinfo/reject";
       state.userError = action.error.message;
       
     })


     //user profile update
     builder.addCase(userUpdateAsync.pending, (state) => {
      state.userStatus="userUpdate/Loading"
    })
     builder.addCase(userUpdateAsync.fulfilled, (state,action) => {
       state.userStatus = "userUpdate/success"
       state.message = null
       state.userError = null
       localStorage.setItem("user", JSON.stringify(action.payload))
       
     })
     builder.addCase(userUpdateAsync.rejected, (state,action) => {
       state.userStatus = "userUpdate/reject";
    state.userError = action.error.message;
     })


  }
})

export default userSlice.reducer







     