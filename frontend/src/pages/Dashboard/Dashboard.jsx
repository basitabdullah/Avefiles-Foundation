import React, { useState } from "react";
import "./Dashboard.scss";
import image from "../../assets/photo.jpg";
import poor from "../../assets/poor.jpg";
import MetaData from "../../components/MetaData";
import { toast } from "react-hot-toast";
import axios from "../../lib/axios";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
const Dashboard = () => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  const cardData = [
    {
      id: 1,
      title: "Idea and Concept Development",
      desc: "Ideas inspire innovation; web development turns them into interactive experiences, blending creativity, technology, and functionality to solve problems.",
      image:
        "https://images.unsplash.com/photo-1654618977232-a6c6dea9d1e8?q=80&w=1372&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Branding and identity Creation",
      desc: "Branding shapes perceptions; identity creation crafts a unique voice, visuals, and values to connect with audiences and build trust.",
      image:
        "https://images.unsplash.com/photo-1661956600684-97d3a4320e45?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      title: "Buisness Registration and Legal Support",
      desc: "Business registration and legal support ensure compliance, protect your venture, and provide a strong foundation for sustainable growth.",
      image:
        "https://images.unsplash.com/photo-1562564055-71e051d33c19?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    { 
      id: 4,
      title: "Buisness Modal and Financial Planing",
      desc: "Business models and financial planning align strategies with goals, ensuring sustainability, profitability, and informed decision-making for growth.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      title: "Technology Setup",
      desc: "Technology setup integrates tools and systems, empowering businesses with efficiency, connectivity, and scalability for seamless operations.",
      image:
        "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 6,
      title: "Training and Capcity Building",
      desc: "Training and capacity building empower individuals and teams with skills, knowledge, and confidence to drive growth and innovation.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 7,
      title: "Funding and Investment Support",
      desc: "Funding and investment support provide resources and guidance to secure capital, fueling business growth and long-term success.",
      image:
        "https://images.unsplash.com/photo-1622186477895-f2af6a0f5a97?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 8,
      title: "Marketing Strategy and Materials",
      desc: "Marketing strategy and materials drive brand awareness, engage audiences, and deliver impactful messaging to achieve business goals.",
      image:
        "https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

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
          {cardData.map((i) => (
            <div className="card" key={i.id}>
              <img src={i.image} alt="Card 1" className="card-image" />
              <div className="card-content">
                <h3>{i.title}</h3>
                <p>{i.desc}</p>
                <Link
                  to={`/services/${i.id.toString()}`}
                  className="learn-more"
                >
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
            {loading ? "Sending..." : "Contact"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
