import React, { useEffect, useState } from "react";
import "./Home.scss";
import MetaData from "../../components/MetaData";
import Loader from "../../components/Loaders/maxLoader/Loader";
import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import Services from "../../components/Services-Home/Services";
import ContactForm from "../../components/ContactForm/ContactForm";

const Home = () => {
  return (
    <>
      <div className="home">
        <MetaData title={"Avefiles | Home"} />
        <Hero />
        <About />
        <Services />
        <ContactForm />
      </div>
    </>
  );
};

export default Home;
