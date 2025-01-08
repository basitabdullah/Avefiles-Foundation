import { useState } from "react";
import "./Services.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useUserStore } from "../../stores/useUserStore";
import { useEffect } from "react";
const Services = () => {
  const { services, fetchServices } = useUserStore();
  const displayServices = services?.slice(0, 3) ;
  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return (
    <section className="services">
      <h2>Our Services</h2>
      <div className="services-grid">
        {services && displayServices.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="explore-button"
      >
        <Link to="/services">Explore More</Link>
      </motion.button>
    </section>
  );
};

const ServiceCard = ({ mainTitle, mainImage, mainDesc, _id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        className="service-card"
        whileHover={{ y: -10 }}
        onClick={() => setIsModalOpen(true)}
      >
        <img src={mainImage} alt={mainTitle} />
        <h3>{mainTitle}</h3>
      </motion.div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <motion.div
            className="modal-content"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{mainTitle}</h3>
            <p>{mainDesc}</p>
            <Link to={`/service/${_id}`}>
              <button className="learn-more-btn">Learn More</button>
            </Link>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </motion.div>
        </div>
      )}
    </>
  );
};
export default Services;
