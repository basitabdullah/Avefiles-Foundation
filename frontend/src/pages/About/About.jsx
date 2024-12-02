import React from 'react';
import './About.scss';
import { useState } from 'react';
const About = () => {
  const projects = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dz',
      title: 'Clean Water Initiative',
      location: 'Rural Communities, Africa',
      impact: '50,000+ beneficiaries'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Education for All',
      location: 'South Asia',
      impact: '10,000+ students'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Sustainable Agriculture',
      location: 'Latin America',
      impact: '500+ farmers'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Healthcare Access',
      location: 'Southeast Asia',
      impact: '25,000+ patients'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Youth Empowerment',
      location: 'Global Programs',
      impact: '15,000+ youth'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Environmental Conservation',
      location: 'Worldwide',
      impact: '100+ ecosystems'
    }
  ];

  return (
    <section className="about">
      <div className="about__content">
        <div className="about__text">
          <span className="about__tag">About Us</span>
          <h2>Making a Difference Since 2015</h2>
          <p className="about__description">
            For over 25 years, we've been at the forefront of positive change, working tirelessly to transform lives and communities across the globe. Our commitment to sustainable development and social justice has impacted millions of lives.
          </p>
          <div className="about__highlights">
            <div className="about__highlight">
              <h3>Our Mission</h3>
              <p>To create lasting solutions to poverty, inequality, and social injustice through innovative and sustainable approaches.</p>
            </div>
            <div className="about__highlight">
              <h3>Our Vision</h3>
              <p>A world where every individual has the opportunity to thrive and contribute to their community's development.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="about__gallery-section">
        <div className="about__gallery-header">
          <h2>Our Popular Projects</h2>
          <p>Discover some of our most impactful initiatives that are changing lives around the world</p>
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
          <div className="gallery__modal-content" onClick={e => e.stopPropagation()}>
            <button 
              className="gallery__modal-close"
              onClick={() => setActiveProject(null)}
            >
              ×
            </button>
            <img src={activeProject.image} alt={activeProject.title} />
            <div className="gallery__modal-info">
              <h3>{activeProject.title}</h3>
              <p className="gallery__modal-location">{activeProject.location}</p>
              <p className="gallery__modal-impact">Impact: {activeProject.impact}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;