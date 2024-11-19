import "./ProductDescription.scss";
import {useParams} from "react-router-dom"
import {useProductStore} from "../../stores/useProductStore"
import { useEffect } from "react";
const ProductDescription = () => {

  const {id} = useParams()
  const {fetchSingleProduct,product} = useProductStore()

  useEffect(() => {
    fetchSingleProduct(id)
  }, [id])


  return (
    <div className="product-description">
      <div className="top">
        <div className="left">
          <img
            src={product?.image}
            alt="error"
          />
        </div>
        <div className="right">
          <h1>{product?.name}</h1>
          <p className="price">${product?.price}</p>
          <p className="desc">
            {product?.description}
          </p>
          <p className="note">
            <span>Note:</span> All the amout you pay is going in our bank
            account, so spend it wisely 👍
          </p>
          <button>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
