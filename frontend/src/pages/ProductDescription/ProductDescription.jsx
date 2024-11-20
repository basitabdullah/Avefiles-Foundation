import "./ProductDescription.scss";
import {useParams} from "react-router-dom"
import {useProductStore} from "../../stores/useProductStore"
import { useEffect } from "react";
import { useCartStore } from "../../stores/useCartStore";
const ProductDescription = () => {

  const {id} = useParams()
  const {fetchSingleProduct,product} = useProductStore()
  const {addToCart} = useCartStore()

  useEffect(() => {
    fetchSingleProduct(id)
  }, [id])


  return (
    <div className="product-description-page">
      <div className="top">
        <div className="left">
          <img
            src={product?.image}
            alt="error"
          />
        </div>
        <div className="right-product-description">
          <h1>{product?.name}</h1>
          <p className="price">${product?.price}</p>
          <p className="desc">
            {product?.description}
          </p>
          <p className="note">
            <span>Note:</span> Your entire payment contributes to making a difference: 50% supports our operations, while the remaining 50% is directly donated to those in need.
          </p>
          <button onClick={()=>addToCart(product)}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
