import React from 'react';
import { motion } from 'framer-motion';
import './About.scss';

const About = () => {
  return (
    <section className="about-comp">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="about-content"
      >
        <h2>Avefiles Foundation</h2>
        <p>
          We are dedicated to creating lasting change in communities worldwide. Through our
          programs and initiatives, we empower individuals, support education, and provide
          essential resources to those in need.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="donate-button"
        >
          Donate Now
        </motion.button>
      </motion.div>
    </section>
  );
};

export default About;