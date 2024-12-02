import { useCartStore } from "../../stores/useCartStore";
import "./Product.scss";
import { Link } from "react-router-dom";
const Product = ({ product }) => {
  const { getCartItems, addToCart } = useCartStore();

  return (
    <div className="product-featured" key={product._id}>
      <img src={product.image} alt="err" />
      <div className="details">
        <h2>{product.name}</h2>
        <p>₹{product.price}</p>
        <div className="buttons">
        <button onClick={() => addToCart(product)}>Add to cart</button>
        <Link to={`/product-description/${product._id}`} >Details</Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
