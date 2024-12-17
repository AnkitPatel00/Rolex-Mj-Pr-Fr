import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const apiUrl = "https://clothstoreserver.vercel.app"


//regsiter user

export const userRegisterAsync = createAsyncThunk("register/user",async (registerUserdata) => {

   const response = await fetch(`${apiUrl}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registerUserdata)
   })
  
 if (!response.ok) {
   
   const error = await response.json();
    throw new Error(error.error || "Register failed");
 }

  const data = await response.json();
  return data;
})




export const userLoginAsync = createAsyncThunk("login/user", async (userCredentials) => {

  const response = await fetch(`${apiUrl}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userCredentials)
  })
  if (!response.ok) {
   
    const error = await response.json();
    throw new Error(error.error || "Login failed"); 
  }

  const data = await response.json();
  return data;
})

//keep alive server

export const keepAlive = createAsyncThunk("keep/alive", async () => {

  const response = await fetch(apiUrl)

  if (!response.ok) {
   
    const error = await response.json();
    throw new Error(error.error || "Keep alive failed"); 
  }

  const data = await response.text();

  return data;
})


const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    isloggin: Boolean(localStorage.getItem("token")),
    authStatus: "idle",
    registerStatus: "idle",
    aliveStatus:'idle',
    message: null,
    pleaselogin:false,
    error:null
  },
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      localStorage.removeItem("logoutTime")
      state.isloggin = false
      state.error = null
      state.authStatus ='idle'
    },
    setPleaseLogin: (state,action) => {
      state.pleaselogin = action.payload
    },


  },


  extraReducers: (builder) => {

    //register user
    
    builder.addCase(userRegisterAsync.pending, (state) => {
      state.registerStatus="userRegister/Loading"
    })
     builder.addCase(userRegisterAsync.fulfilled, (state,action) => {
       state.registerStatus = "userRegister/success"
       state.message = action.payload.message
       
     })
     builder.addCase(userRegisterAsync.rejected, (state,action) => {
      state.registerStatus = "userRegister/reject";
       state.error = action.error.message;
     })


    //user login

    builder.addCase(userLoginAsync.pending, (state) => {
      state.authStatus="userLogin/Loading"
    })
     builder.addCase(userLoginAsync.fulfilled, (state,action) => {
       state.authStatus = "userLogin/success"
       state.message = null
       const minutes = new Date().setMinutes(new Date().getMinutes()+59)
        localStorage.setItem("logoutTime", minutes)
       localStorage.setItem("token", action.payload.token)
       localStorage.setItem("user", JSON.stringify(action.payload.user))

       state.isloggin = true
      //  state.error=null
       
     })
     builder.addCase(userLoginAsync.rejected, (state,action) => {
      state.authStatus = "userLogin/reject";
       state.error = action.error.message;
     })
        
    //keep alive
    
    builder.addCase(keepAlive.pending, (state) => {
      state.aliveStatus="keepAlive/Loading"
    })
     builder.addCase(keepAlive.fulfilled, (state,action) => {
       state.aliveStatus = "keepAlive/success"

       
     })
     builder.addCase(keepAlive.rejected, (state,action) => {
      state.aliveStatus = "keepAlive/reject";
       state.error = action.error.message;
     })

    
  }
})

export const {logoutUser,resetAuthStatus,setPleaseLogin,setErrorAuth} = authenticationSlice.actions
export default authenticationSlice.reducer