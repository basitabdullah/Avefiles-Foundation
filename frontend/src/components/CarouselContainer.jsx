import { Link } from "react-router-dom"

const CarouselContainer = ({image,name,feature,desc}) => {
  return (
    <div className="carousel-image-container">
          <img src={image} />
          <div className="description">
            <div className="top">
              <p className="product-name">{name}</p>
              
            </div>
            <div className="bottom">
              <p>{desc}</p>
              <Link  className="shop-now" to={"/search"}>Shop Now</Link>
            </div>
          </div>
        </div>
  )
}

export default CarouselContainer