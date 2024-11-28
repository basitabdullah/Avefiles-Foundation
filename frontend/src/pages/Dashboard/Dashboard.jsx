import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import image from "../../assets/photo.jpg";
import poor from "../../assets/poor.jpg";
import MetaData from "../../components/MetaData";
import { toast } from "react-hot-toast";
import axios from "../../lib/axios";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useUserStore } from "../../stores/useUserStore";
const Dashboard = () => {
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
    <div className="dashboard">
      <MetaData title={"Avefiles | Home"} />
      <div className="section-one">
        <div className="left">
          <h1 className="headline">Avefiles Foundation</h1>
          <p>
            We are dedicated to creating meaningful change in the lives of those
            who need it most. Our mission is to empower communities through
            impactful initiatives, providing resources and opportunities for a
            brighter future. We are dedicated to creating meaningful change in
            the lives of those who need it most. Our mission is to empower
            communities through impactful initiatives, providing resources and
            opportunities for a brighter future.
          </p>

          <button className="donate-btn">Donate Now</button>
        </div>
        <div className="right">
          <img src={image} />
        </div>
      </div>
      <div className="full-width-image">
        <img src={poor} alt="Background" className="background-image" />
        <div className="overlay-text">
          <h1>Let's Come Together</h1>
          <p>Every Voice Needs To Be Heard</p>
        </div>
      </div>

      <div className="section-two">
        <h1>Our Services</h1>
        <div className="cards-container">
          {services?.map((i) => (
            <div className="card" key={i._id}>
              <img src={i.mainImage} alt="Card 1" className="card-image" />
              <div className="card-content">
                <h3>{i.mainTitle}</h3>
                <p>{i.mainDesc}</p>
                <Link to={`/services/${i._id}`} className="learn-more">
                  Learn More <MdKeyboardArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="contact-us">
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
      </div>
    </div>
  );
};

export default Dashboard;
