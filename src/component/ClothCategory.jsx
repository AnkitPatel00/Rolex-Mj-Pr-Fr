import { Link } from 'react-router-dom'

const ClothCategory = () =>
{
  return (
    <>
       

<div className='container p-4'>
  <section className="row row-gap-3 py-5">
    <div className="col-md-6 text-center p-3 position-relative category-card">
      <Link className='link-underline link-underline-opacity-0' to={`/cloths`} state={"Men"}>
        <img className="category-image img-fluid h-100 rounded-end object-fit-sm-contain" src="https://c.media-amazon.com/images/I/81W1MnkmuxL._SX679_.jpg" height={200} width={600} />
        <div className="overlay-text">
          <h3 className="py-3 text-white">Men's Clothing</h3>
        </div>
      </Link>
    </div>
    <div className="col-md-6 text-center p-3 position-relative category-card">
      <Link className='link-underline link-underline-opacity-0' to={`/cloths`} state={"Women"}>
        <img className="category-image img-fluid h-100 rounded-start object-fit-sm-contain" src="https://c.media-amazon.com/images/I/81dss+u7tmL._SX679_.jpg" height={200} width={600} />
        <div className="overlay-text">
          <h3 className="py-3 text-white">Women's Clothing</h3>
        </div>
      </Link>
    </div>
  </section>
</div>


    </>
)
}

export default ClothCategory