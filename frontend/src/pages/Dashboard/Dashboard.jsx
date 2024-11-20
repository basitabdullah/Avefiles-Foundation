import React from "react";
import "./Dashboard.scss";
import image from "../../assets/photo.jpg";
import health from "../../assets/health.jpg";
import poor from "../../assets/poor.jpg";
import MetaData from "../../components/MetaData";
const Dashboard = () => {
  return (
    <div className="dashboard">
      <MetaData title={"Avefiles | Home"} />
      <div className="section-one">
        <div className="left">
          <h1 className="headline">Avefiles Foundation</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab officia
            veritatis officiis vero aut, ex repudiandae assumenda cupiditate
            maiores quaerat quidem. Itaque, dignissimos assumenda dolorum dicta
            voluptatem sunt deserunt blanditiis? Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Voluptatum voluptatem eligendi
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
          <h1>Let's Come Togethrer</h1>
          <p>Every Voice Needs To Be Heard</p>
        </div>
      </div>

      <div className="section-two">
        <div className="cards-container">
          <div className="card">
            <img src={poor} alt="Card 1" className="card-image" />
            <div className="card-content">
              <h3>Card Title 1</h3>
              <p>Brief description for card 1 goes here.</p>
              <button className="learn-more-btn">Learn More</button>
            </div>
          </div>
          <div className="card">
            <img src={poor} alt="Card 1" className="card-image" />
            <div className="card-content">
              <h3>Card Title 1</h3>
              <p>Brief description for card 1 goes here.</p>
              <button className="learn-more-btn">Learn More</button>
            </div>
          </div>
          <div className="card">
            <img src={poor} alt="Card 1" className="card-image" />
            <div className="card-content">
              <h3>Card Title 1</h3>
              <p>Brief description for card 1 goes here.</p>
              <button className="learn-more-btn">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
