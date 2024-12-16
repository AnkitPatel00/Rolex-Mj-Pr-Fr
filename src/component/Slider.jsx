import React, { useEffect } from 'react';

const Slider = () => {
  useEffect(() => {
    const carouselElement = document.getElementById('carouselExampleControlsNoTouching');
    const interval = setInterval(() => {
      const nextButton = carouselElement.querySelector('.carousel-control-next');
      nextButton.click(); 
    }, 2000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container p-4">
      <div
        id="carouselExampleControlsNoTouching"
        className="carousel slide"
        data-bs-touch="false"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://c.media-amazon.com/images/S/aplus-media-library-service-media/7e2ce7c3-b582-4666-82c5-7b98f3bd6ae6.__CR0,0,4575,1875_PT0_SX1464_V1___.png"
              className="d-block w-100"
              alt="cloth image 1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://c.media-amazon.com/images/S/aplus-media-library-service-media/42799665-d691-435c-92a7-80b4573dd52b.__CR0,0,1464,600_PT0_SX1464_V1___.png"
              className="d-block w-100"
              alt="cloth image 2"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://c.media-amazon.com/images/S/aplus-media-library-service-media/8ae91b01-1720-4b8f-8685-f94242c3ec53.__CR0,0,4575,1875_PT0_SX1464_V1___.png"
              className="d-block w-100"
              alt="cloth image 3"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControlsNoTouching"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControlsNoTouching"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Slider;
