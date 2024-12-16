
const ErrorMessage = ({error}) => {

  return (
    <>
       {error && <p style={{textAlign:"center",fontSize:"30px",color:"red",padding:"20px"}}>{error}</p>}
    </>
)
  
}
export default ErrorMessage