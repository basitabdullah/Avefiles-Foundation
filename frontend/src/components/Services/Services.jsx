import React from 'react';
import ServiceCard from './ServiceCard';
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
        'Free primary education',
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

export default Services;