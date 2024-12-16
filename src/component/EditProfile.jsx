import { useEffect, useState } from 'react'
import { useLocation ,useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { userUpdateAsync } from '../features/user/userSlice'
const EditProfile = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [firstname, setfirstname] = useState("")
  const [lastname, setlastname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [mobilenumber, setmobilenumber] = useState("")


    const {userStatus,userError} = useSelector((state)=>state.userState)
  
    const { isloggin ,authStatus,error} = useSelector((state) => state.authenticationState)

  const location = useLocation()

  const userInfo = location.state

  useEffect(() => {
    setUsername(userInfo.username)
    setfirstname(userInfo.firstname)
    setlastname(userInfo.lastname)
    setemail(userInfo.email)
    setmobilenumber(userInfo.mobilenumber)
  },[location])

  const handleEditSubmit = (e) => {

    e.preventDefault()

    const userUpdateData = {
      username,
      firstname,
      lastname,
      email,
      mobilenumber,
      password
    }
    
    if (username && firstname && lastname && email && mobilenumber && password)  
    {
      dispatch(userUpdateAsync(userUpdateData))
      } 
  }

  const localUser = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
    if (userStatus ==="userUpdate/success")
    {
      navigate(`/user/profile/${localUser.username}`)
      }
    
    }, [userStatus])
  

  return (
    <div className="container py-4">
      <h1>Update Profile</h1>
      <form onSubmit={handleEditSubmit}>

        <input className='form-control mb-2' type="text" placeholder='User Name' value={username} onChange={(e) => setUsername(e.target.value)} required/>
        <input className='form-control mb-2' type="text" placeholder='First Name' value={firstname} onChange={(e) => setfirstname(e.target.value)} required/>
        <input className='form-control mb-2' type="text" placeholder='Last Name' value={lastname} onChange={(e) => setlastname(e.target.value)} required/>
        <input className='form-control mb-2' type="text" placeholder='Email' value={email} onChange={(e) => setemail(e.target.value)} required/>
        <input className='form-control mb-2' type="text" placeholder='Mobile Number' value={mobilenumber} onChange={(e) => setmobilenumber(e.target.value)} required/>
        <h3>Enter Login Paasword for Update Profile</h3>
            <input className='form-control mb-2' type="password" placeholder='Password' value={password} onChange={(e) => setpassword(e.target.value)}required />
        <button disabled={userStatus==="userUpdate/Loading" ? true : false} className='btn btn-primary' > {userStatus==="userUpdate/Loading" ? "Updating":"Update Profile"}</button>
        {userError && <p className='text-danger fs-5'>{userError}</p>}
      </form>
    </div>
)  
}

export default EditProfile

