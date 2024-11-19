import React from "react";
import "./Dashboard.scss";
import image from "../../assets/photo.jpg";
import health from "../../assets/health.jpg";
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
      <div className="section-two">
        <div className="what-we-do">
          <div className="card">
            <div className="card-image">
              <img src={health} alt="Emergency Care" />
            </div>
            <div className="card-content">
              <h3 className="card-title">Health Care</h3>
              <p className="card-description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Corporis ducimus animi aspernatur atque molestias maxime ex vel
                officia. Delectus porro possimus, magni repellat vero pariatur
                consequatur perferendis voluptatibus cumque architecto?
              </p>
            </div>
          </div>
          {/* <div className="card">
            <img src={image} alt="Outpatient Services" className="card-image" />
            <div className="card-content">
              <h3 className="card-title">Education</h3>
              <p className="card-description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Corporis ducimus animi aspernatur atque molestias maxime ex vel
                officia. Delectus porro possimus, magni repellat vero pariatur
                consequatur perferendis voluptatibus cumque architecto?
              </p>
            </div>
          </div>
          <div className="card">
            <img src={image} alt="Surgical Expertise" className="card-image" />
            <div className="card-content">
              <h3 className="card-title">Entrepreneurs</h3>
              <p className="card-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
                eveniet iure delectus corporis maiores et molestias accusantium
                dolores cum laboriosam fuga eum commodi, saepe porro eaque quia
                mollitia fugit voluptates.
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
