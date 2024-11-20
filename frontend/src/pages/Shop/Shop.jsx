import "./Shop.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Product from "../../components/Product/Product";
import MetaData from "../../components/MetaData.jsx";
import CarouselContainer from "../../components/CarouselContainer.jsx";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useProductStore } from "../../stores/useProductStore.js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "../../lib/axios.js";
import apperalsImg from "../../assets/categories-apperals.jpeg";
import stationaryImg from "../../assets/categories-stationary.webp";
import bioImg from "../../assets/categories-bio.jpeg";

const Shop = () => {
  const { getFeaturedProducts, products } = useProductStore();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/send-email", { name, email, message });
      toast.success("Message Sent Successfully!");
      setLoading(false);
    } catch (error) {
      toast.error("Internal Server Error, Try Again!");
      setLoading(false);
    }
  };
  useEffect(() => {
    getFeaturedProducts();
  }, [getFeaturedProducts]);

  const categories = [
    {
      href: "/stationary",
      name: "Stationary",
      imageUrl: stationaryImg,
    },
    {
      href: "/apperal",
      name: "Apperal",
      imageUrl: apperalsImg,
    },
    {
      href: "/bio-degradable",
      name: "Bio Degradable",
      imageUrl: bioImg,
    },
  ];
  return (
    <div className="shop">
      <MetaData title={"Avefiles | Shop"} />
      <Carousel
        showStatus={false}
        showThumbs={false}
        showArrows={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={3000}
      >
        <CarouselContainer
          image={
            "https://images.unsplash.com/photo-1634798428682-56236f8490db?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          feature={"Poor"}
          name={"Helping"}
          desc={"Shop for change, because every item tells a story of betterment."}
        />
        <CarouselContainer
          image={
            "https://images.unsplash.com/photo-1630868313487-7e20af009ad5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          feature={"Needy "}
          name={"Empowering"}
          desc={"The new way to wear your favorite sneaker"}
        />
      </Carousel>
      <h2 id="categories" className="categories-heading">
        Explore Categories
      </h2>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="categories"
      >
        {categories?.map((cat) => (
          <Link to={`/category${cat.href}`} key={cat.name}>
            <div className="category">
              <img src={cat.imageUrl} alt="err" loading="lazy" />
              <div className="category-title">{cat.name}</div>
            </div>
          </Link>
        ))}
      </motion.div>

      <div className="slogan">
        <img
          src="https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_2053/cms/3gaucwAUA2KXTW2QeloccX/02d479630932580eb29bc1329e0ec6fd/24Q3_AugustCore_Statement_Module_Site_Desktop_IMG_2880x720.jpg"
          alt="err"
        />
        <div className="text">
          <h2>Every purchase you make plants a seed of hope.</h2>
          <p>
          We make a living by what we get, but we make a life by what we give.
          </p>
          <span>avefiles</span>
        </div>
      </div>

      <h2 className="products-heading">Featured Products</h2>

      <div className="featured-products">
        {products.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </div>

      {/* <div className="contact-us">
        <h2>Hire the developer😁</h2>
        <p>Contact the developer to build MERN stack web applictions.</p>
        <form className="input-container" onSubmit={handleSubmit}>
          <div className="name-email-wrapper">
            <input
              required
              type="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <input
              required
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Message here..."
          />
          <button disabled={loading} type="submit">
            {loading ? "Sending..." : "Contact"}
          </button>
        </form>
      </div> */}
    </div>
  );
};

export default Shop;
