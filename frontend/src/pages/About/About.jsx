import React from "react";
import "./About.scss";
import { useState } from "react";
import { motion } from "framer-motion";
const About = () => {
  const projects = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dz",
      title: "Clean Water Initiative",
      location: "Rural Communities, Africa",
      impact: "50,000+ beneficiaries",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Education for All",
      location: "South Asia",
      impact: "10,000+ students",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Sustainable Agriculture",
      location: "Latin America",
      impact: "500+ farmers",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Healthcare Access",
      location: "Southeast Asia",
      impact: "25,000+ patients",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Youth Empowerment",
      location: "Global Programs",
      impact: "15,000+ youth",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Environmental Conservation",
      location: "Worldwide",
      impact: "100+ ecosystems",
    },
  ];

  return (
    <section className="about">
      <div className="about__content">
        <div className="about__text">
          <span className="about__tag">About Us</span>
          <h2>Making a Difference Since 2015</h2>
          <p className="about__description">
            For over 25 years, we've been at the forefront of positive change,
            working tirelessly to transform lives and communities across the
            globe. Our commitment to sustainable development and social justice
            has impacted millions of lives.
          </p>
          <div className="about__highlights">
            <div className="about__highlight">
              <h3>Our Mission</h3>
              <p>
                To create lasting solutions to poverty, inequality, and social
                injustice through innovative and sustainable approaches.
              </p>
            </div>
            <div className="about__highlight">
              <h3>Our Vision</h3>
              <p>
                A world where every individual has the opportunity to thrive and
                contribute to their community's development.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="about__gallery-section">
        <div className="about__gallery-header">
          <h2>Our Popular Projects</h2>
          <p>
            Discover some of our most impactful initiatives that are changing
            lives around the world
          </p>
        </div>
        <Gallery projects={projects} />
      </div>
    </section>
  );
};

const Gallery = ({ projects }) => {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <div className="gallery">
      <div className="gallery__grid">
        {projects.map((project) => (
          <div
            key={project.id}
            className="gallery__item"
            onClick={() => setActiveProject(project)}
          >
            <img src={project.image} alt={project.title} />
            <div className="gallery__item-overlay">
              <h3>{project.title}</h3>
              <p>{project.location}</p>
            </div>
          </div>
        ))}
      </div>

      {activeProject && (
        <div className="gallery__modal" onClick={() => setActiveProject(null)}>
          <div
            className="gallery__modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="gallery__modal-close"
              onClick={() => setActiveProject(null)}
            >
              ×
            </button>
            <img src={activeProject.image} alt={activeProject.title} />
            <div className="gallery__modal-info">
              <h3>{activeProject.title}</h3>
              <p className="gallery__modal-location">
                {activeProject.location}
              </p>
              <p className="gallery__modal-impact">
                Impact: {activeProject.impact}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="about-container">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="about-title"
        >
          About Our Mission
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="about-intro"
        >
          <p>
            We are dedicated to making a positive impact in our community
            through sustainable initiatives and meaningful partnerships.
          </p>
        </motion.div>

        <DirectorMessage />
        <OurTeam />
      </div>
    </div>
  );
};

const DirectorMessage = () => {
  return (
    <section className="director-section">
      <motion.div
        className="director-message"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="https://images.unsplash.com/photo-1560250097-0b93528c311a"
          alt="Director"
          className="director-image"
        />
        <div className="message-content">
          <h2>Message from Our Director</h2>
          <p>
            "Our commitment to social change goes beyond words. We believe in
            creating lasting impact through action, innovation, and community
            engagement. Together, we can build a better future for generations
            to come."
          </p>
          <h3>John Smith</h3>
          <p className="director-title">Executive Director</p>
        </div>
      </motion.div>
    </section>
  );
};

const OurTeam = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Operations Manager",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
    },
    {
      name: "Michael Chen",
      role: "Program Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    },
    {
      name: "Emily Williams",
      role: "Community Outreach",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    },
  ];
  return (
    <section className="team-section">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Our Team
      </motion.h2>

      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            className="team-member"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <img src={member.image} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
export default About;
