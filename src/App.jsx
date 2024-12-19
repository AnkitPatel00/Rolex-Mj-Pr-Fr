import Header from './component/Header.jsx'
import { useEffect} from 'react'
import Footer from './component/Footer.jsx'
import { Outlet} from 'react-router-dom'
import LoginPleaseToast from './component/LoginPleaseToast.jsx'
import {useSelector } from "react-redux";
import { useLogout } from './useLogout.js'


function App() {

   const timeStamp = localStorage.getItem("logoutTime")
   const currentTime = Date.now()
   const logoutTime = (timeStamp-currentTime)

  const { logoutDispatch } = useLogout()

  const { isloggin ,authStatus,error} = useSelector((state) => state.authenticationState)

  if (timeStamp < Date.now() && isloggin)
  {
    logoutDispatch()
  }

  useEffect(() => {
    if (logoutTime > 0)
    {
       const t = setTimeout(() => {
      logoutDispatch()
    },logoutTime)
    return (() => {
      clearTimeout(t)
    })
    }  
  },[logoutTime])
  
  
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
