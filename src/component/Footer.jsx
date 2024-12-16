import { useLocation } from "react-router-dom"
const Footer = () =>
{
  const location = useLocation()


  return (
    <>
    { location.pathname === "/" &&  <footer className="bg-dark text-center py-3 text-light" style={{}}>
      <p>&copy; 2024 Cloth Brand. All Rights Reserved.</p>
</footer> }
    </>
  )
  
}
export default Footer