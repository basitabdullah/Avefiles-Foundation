import React, { useEffect, useState } from "react";
import "./Home.scss";
import MetaData from "../../components/MetaData";
import { toast } from "react-hot-toast";
import axios from "../../lib/axios";
import { useUserStore } from "../../stores/useUserStore";
import Loader from "../../components/Loaders/maxLoader/Loader";
import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import Services from "../../components/Services/Services";
import ContactForm from "../../components/ContactForm/ContactForm";

const Home = () => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const { services, fetchServices } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/send-email", { name, email, message });
      toast.success("Message Sent Successfully!");
      setLoading(false);
    } catch (error) {
      toast.error("Internal Server Error, Try Again!");
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);
  console.log(services);
  
  

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

          {/* <div className="contact-us">
            <h2>Seek Help !</h2>
            <p>If you're in need of support, we're here for you.</p>
            <form className="input-container" onSubmit={handleSubmit}>
              <div className="name-email-wrapper">
                <input
                  required
                  type="name"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
                <input
                  required
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Type the problem here..."
              />
              <button disabled={loading} type="submit">
                {loading ? "Sending..." : "Seek Help !"}
              </button>
            </form>
          </div> */}
        </div>
      )}
    </>
  );
};

export default Home;
