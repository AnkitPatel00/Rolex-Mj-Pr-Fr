import '../index.css'
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchCloths,searchInputValue } from "../features/cloths/clothSlice"
import ProductsCard from './ProductsCard'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'

const ClothsList = () => {
   const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const { cloths, clothStatus, searchInput, clothError } = useSelector((state) => state.clothsState)
 
  const [search, setSearch] = useState("");
  
  const [category, setCategory] = useState(location.state ? [location.state] : [])
  const [rating, setRating] = useState("")
  const [price, setPrice] = useState("")
  const [highPrice, setHighPrice] = useState(0)
  const [lowPrice, setLowPrice] = useState(0)
  const [range, setRange] = useState(0)


  useEffect(() => {
    if (clothStatus !== "fetch/success")
    {
dispatch(fetchCloths());
    }
  }, [clothStatus]);

  useEffect(() => {
    navigate(location.pathname,{state:null})
  }, [])

 useEffect(() => {
  if (clothStatus === "fetch/success") {

    const filteredCloths = category.length > 0
      ? cloths.filter(cloth => category.includes(cloth.category))
      : cloths;


    const maxPrice = Math.max(...filteredCloths.map(cloth => cloth.discountedPrice));
    const minPrice = Math.min(...filteredCloths.map(cloth => cloth.discountedPrice));


    setHighPrice(maxPrice);
    setLowPrice(minPrice);
    setRange((maxPrice + minPrice) / 2);  
  } else {
    setHighPrice(0);
    setLowPrice(0);
    setRange(0);
  }
}, [ category, clothStatus]);

  const categoryHandle = (event) => {
    const { checked, value } = event.target
    if (checked) {
      setCategory((prev) => [...prev, value])
    } else {
      setCategory((prevSelected) => prevSelected.filter((category) => category !== value))
    }
  }


  const priceHandle = (event) => {
    const { checked, value } = event.target
    if (checked) {
      setPrice(value)
    } else {
      setPrice("")
    }
  }

  const searchFilter = search ? cloths?.filter(cloth => cloth.title.includes(search) || cloth.title.toLowerCase().includes(search)) : [...cloths]
  
  const rangeFilter = range ? searchFilter?.filter((cloth) => (cloth.discountedPrice) <= range) : searchFilter

  const categoryFilter = category.length > 0 ? rangeFilter.filter((cloth)=>category.includes(cloth.category)): rangeFilter

  const ratingFilter = rating ? categoryFilter.filter((cloth) => cloth.rating >= rating) : categoryFilter
  const priceSortBy = price ? ratingFilter.sort((clothOne, clothTwo) => {
    if (price === "lowToHigh") {
      return (clothOne.discountedPrice) - (clothTwo.discountedPrice)
    } else {
      return (clothTwo.discountedPrice) - (clothOne.discountedPrice)
    }
  }) : ratingFilter

  const handleClearFilter = (e) => {
    e.preventDefault()
    setCategory([])
    setRating('')
    setPrice('')
    setRange(highPrice - lowPrice)
  }

  return (
    <>
      
      {/* main container */}

      <div className='cloth-list-container' >
        

         {/* filter container */}

<div className='filter-container'>
  <h5 style={{textAlign:"center",marginBottom:"10px"}}>Filters</h5>

  {/* Clear Filters Button */}
  <button
    className="btn btn-danger w-100 mb-3"
    
    onClick={handleClearFilter}
  >
    Clear Filters
  </button>

  {/* Price Range Filter */}
  <div className="mb-4">
    <label htmlFor="priceRange" className="form-label">
      Price Range: <span className="fw-bold">{range.toFixed(2)}</span>
    </label>
    <input
      type="range"
      className="form-range"
      id="priceRange"
      min={lowPrice}
      max={highPrice}
      value={range}
      step={0.01}
      onChange={(e) => setRange(parseFloat(e.target.value))}
    />
  </div>

  <hr />

  {/* Category Filter */}
  <div className="mb-4">
    <label className="form-label">Category</label>
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        id="menChk"
        checked={category.includes("Men")}
        value="Men"
        onChange={categoryHandle}
      />
      <label className="form-check-label" htmlFor="menChk">
        Men's Clothing
      </label>
    </div>
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        id="womenChk"
        checked={category.includes("Women")}
        value="Women"
        onChange={categoryHandle}
      />
      <label className="form-check-label" htmlFor="womenChk">
        Women's Clothing
      </label>
    </div>
  </div>

  <hr />

  {/* Rating Filter */}
  <div className="mb-4">
    <label className="form-label">Rating</label>
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <div className="form-check d-flex align-items-center mb-1" key={star}>
          <input
            className="form-check-input me-2"
            type="radio"
            id={`rating${star}`}
            name="rating"
            value={star}
            checked={rating === star}
            onChange={() => setRating(star)}
          />
          <label htmlFor={`rating${star}`} className="form-check-label">
            {Array.from({ length: star }).map((_, idx) => (
              <i key={idx} className="fa-solid fa-star text-warning"></i>
            ))}
          </label>
        </div>
      ))}
    </div>
  </div>

  <hr />

  {/* Sort By Filter */}
  <div className="mb-4">
    <label className="form-label">Sort By</label>
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        id="lowToHigh"
        checked={price === "lowToHigh"}
        name="price"
        value="lowToHigh"
        onChange={priceHandle}
      />
      <label className="form-check-label" htmlFor="lowToHigh">
        Price: Low to High
      </label>
    </div>
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        id="highToLow"
        checked={price === "highToLow"}
        name="price"
        value="highToLow"
        onChange={priceHandle}
      />
      <label className="form-check-label" htmlFor="highToLow">
        Price: High to Low
      </label>
    </div>
  </div>
</div>

       
        
        {/* product container */}
       
        <div className='product-container' style={{ maxWidth: "1500px", width: "100%" }}>
  <div className="row justify-content-center my-4">
    <div className="col-md-6">
      <div className="input-group px-3">
        <input
          type="text"
          className="form-control"
                  placeholder="Search for cloths..."
                  onChange={(e)=>setSearch(e.target.value)}
        />
        <button className="btn btn-primary" type="button">
         <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </div>
  </div>

  <ErrorMessage error={clothError} />

  <LoadingSpinner spinner={clothStatus === "fetch/loading"} />

  {clothStatus === "fetch/success" && (
    <ProductsCard cloths={priceSortBy} />
  )}
</div>

        
          {/* product container */}
         
      </div>
    </>
  )
}

export default ClothsList;

