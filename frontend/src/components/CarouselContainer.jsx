
const CarouselContainer = ({image,name,feature,desc}) => {
  return (
    <div className="carousel-image-container">
          <img src={image} />
          <div className="description">
            <div className="top">
              <p className="product-name">{name}</p>
              <div className="product-feature">
                <p className="classic">{feature}</p>
                <p className="nature">by donation</p>
              </div>
            </div>
            <div className="bottom">
              <p>{desc}</p>
              <a href="#categories" className="shop-now">Donate</a>
            </div>
          </div>
        </div>
  )
}

export default CarouselContainer