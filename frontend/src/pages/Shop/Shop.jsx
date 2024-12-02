import "./Shop.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Product from "../../components/Product/Product";
import MetaData from "../../components/MetaData.jsx";
import CarouselContainer from "../../components/CarouselContainer.jsx";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useProductStore } from "../../stores/useProductStore.js";
import { useEffect } from "react";
import apperalsImg from "../../assets/categories-apperals.jpeg";
import stationaryImg from "../../assets/categories-stationary.webp";
import bioImg from "../../assets/categories-bio.jpeg";
import Loader from "../../components/Loaders/maxLoader/Loader";

const Shop = () => {
  const { getFeaturedProducts, products } = useProductStore();

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
  return !products ? (
    <Loader />
  ) : (
    <div className="shop">
      <MetaData title={"Avefiles | Shop"} />
      <div className="note">
        Your entire payment contributes to making a difference: 50% supports our
        operations, while the remaining 50% is directly donated to those in
        need.
      </div>
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
            "https://res.cloudinary.com/dfntxbbxh/image/upload/v1732987399/products/nspytm8xdaeyrd61ftbj.jpg"
          }
          name={"Bacta Serve"}
          desc={
            "BactaServe Organic Kitchen Cleaner"
          }
        />
        <CarouselContainer
          image={
            "https://res.cloudinary.com/dfntxbbxh/image/upload/v1732987212/products/mu3ht8cji9zmdkylsyam.jpg"
          }
          name={"Bacta Serve"}
          desc={
            "BactaServe Organic Drain Cleaner"
          }
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
          <Link to={`/search`} key={cat.name}>
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
    </div>
  );
};

export default Shop;
