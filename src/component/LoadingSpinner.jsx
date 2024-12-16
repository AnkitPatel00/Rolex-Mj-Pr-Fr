
const LoadingSpinner = ({spinner}) => {
  return (
    <>
     {spinner && <div className='d-flex justify-content-center align-middle my-5'>
             <div className="spinner-border"  role="status">
  <span className="visually-hidden">Loading...</span>
</div>
</div>}
    </>
    
  )
}
export default LoadingSpinner