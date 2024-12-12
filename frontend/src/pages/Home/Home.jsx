import React, { useEffect, useState } from "react";
import "./Home.scss";
import MetaData from "../../components/MetaData";
import Loader from "../../components/Loaders/maxLoader/Loader";
import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import Services from "../../components/Services-Home/Services";
import ContactForm from "../../components/ContactForm/ContactForm";

const Home = () => {

  const services = [
    {
      image:
        "https://images.unsplash.com/photo-1484788984921-03950022c9ef?q=80&w=2132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Community Support",
      description:
        "Providing essential resources and support to communities in need through sustainable programs.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1484788984921-03950022c9ef?q=80&w=2132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Education",
      description:
        "Empowering through education with innovative learning programs and scholarships.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1484788984921-03950022c9ef?q=80&w=2132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Environmental Care",
      description:
        "Leading initiatives for environmental conservation and sustainable practices.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1484788984921-03950022c9ef?q=80&w=2132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Social Welfare",
      description:
        "Creating positive social impact through targeted welfare programs and advocacy.",
    },
  ];
 



 
  
  

  return (
    <>
      {!services ? (
        <Loader />
      ) : (
        <div className="home">
          <MetaData title={"Avefiles | Home"} />
          <Hero />
          <About />
          <Services />
          <ContactForm />
        </div>
      )}
    </>
  );
};

export default Home;
