import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ServiceCard.scss';

const ServiceCard = ({ title, image, description, points }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        className="service-card"
        whileHover={{ y: -10 }}
        onClick={() => setIsModalOpen(true)}
      >
        <img src={image} alt={title} />
        <h3>{title}</h3>
      </motion.div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <motion.div
            className="modal-content"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={e => e.stopPropagation()}
          >
            <h3>{title}</h3>
            <p>{description}</p>
            <ul>
              {points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ServiceCard;