import React from 'react';
import './ServicePage.scss';

const ServicePage = () => {
  const services = [
    {
      image: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?q=80&w=2132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Community Support",
      description: "Providing essential resources and support to communities in need through sustainable programs."
    },
    {
      image: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?q=80&w=2132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Education",
      description: "Empowering through education with innovative learning programs and scholarships."
    },
    {
      image: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?q=80&w=2132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Environmental Care",
      description: "Leading initiatives for environmental conservation and sustainable practices."
    },
    {
      image: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?q=80&w=2132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Social Welfare",
      description: "Creating positive social impact through targeted welfare programs and advocacy."
    }
  ];

  return (
    <section className="services">
      <div className="services__header">
        <span className="services__tag">Our Impact</span>
        <h2>How We Make A Difference</h2>
        <p>Through our dedicated services and initiatives, we're creating lasting change in communities worldwide</p>
      </div>
      <div className="services__grid">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
};


const ServiceCard = ({ image, title, description }) => {
  return (
    <div className="service-card">
      <div className="service-card__image">
        <img src={image} alt={title} />
      </div>
      <h3 className="">{title}</h3>
      <p className="service-card__description">{description}</p>
      <button className="service-card__button">Learn More</button>
    </div>
  );
};


export  default ServicePage;