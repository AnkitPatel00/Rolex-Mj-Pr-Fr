import Header from './component/Header.jsx'
import { useEffect, useState} from 'react'
import Footer from './component/Footer.jsx'
import { Outlet,useLocation} from 'react-router-dom'
import LoginPleaseToast from './component/LoginPleaseToast.jsx'
import { useDispatch,useSelector } from "react-redux";
import { useLogout } from './useLogout.js'


function App() {

   const timeStamp = localStorage.getItem("logoutTime")
  const currentTime = Date.now()
const logoutTime = (timeStamp-currentTime)

  const { logoutDispatch } = useLogout()

  const { isloggin ,authStatus,error} = useSelector((state) => state.authenticationState)
  

  useEffect(() => {
    console.log('Logout useEffect Run without timeout')
    if (logoutTime > 0)
    {
      console.log('setTimeout Start with:',logoutTime)
       const t = setTimeout(() => {
      console.log('logout')
      logoutDispatch()
    },logoutTime)
    return (() => {
      clearTimeout(t)
    })
    }  
  },[logoutTime])
  


  
  // console.log(new Date().setMinutes(new Date().getMinutes() + 1))
  
  return (
    <>
      <LoginPleaseToast/>
      <Header  />
     <Outlet />
      <Footer/>
    </>
  )
}

export default App
