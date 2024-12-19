const RatingStars = ({rating}) => {
  return (
    <>
      <div>
      {Array.from({ length: 5 }, (_, index) => {     
        return index < Math.floor(rating) ? <i className="fa-solid fa-star text-warning"></i> :
          index < rating ? <i className="fa-solid fa-star-half-stroke text-warning"></i> :
            <i className="fa-regular fa-star text-warning"></i>
      })}
        </div>
    </>
  )
}
export default RatingStars