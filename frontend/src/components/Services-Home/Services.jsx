import {useState} from 'react';
import './Services.scss';
import {Link} from 'react-router-dom';
import { motion } from 'framer-motion';
const Services = () => {
  const services = [
    {
      title: 'Web Development',
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: 'Providing quality education to underprivileged children.',
      points: [
        'Build visually appealing, responsive, and intuitive UI/UX designs using frameworks like React.js',
        'School supplies distribution',
        'Teacher training programs',
        'Digital learning initiatives'
      ]
    },
    {
      title: 'Healthcare',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Ensuring access to essential healthcare services.',
      points: [
        'Mobile medical camps',
        'Preventive healthcare',
        'Mental health support',
        'Medical supplies distribution'
      ]
    },
    {
      title: 'Community Development',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Building stronger, self-sustaining communities.',
      points: [
        'Skills training workshops',
        'Infrastructure development',
        'Environmental projects',
        'Women empowerment programs'
      ]
    }
  ];

  return (
    <section className="services">
      <h2>Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
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
export default Services;