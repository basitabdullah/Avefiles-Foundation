import React from "react";
import "./Dashboard.scss";
import image from "../../assets/photo.jpg";

const Dashboard = () => {
  return (
    <div className="dashboard">
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
        <div class="what-we-do">
          <div class="card">
            <img src={image} alt="Emergency Care" class="card-image" />
            <div class="card-content">
              <h3 class="card-title">Health Care</h3>
              <p class="card-description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Corporis ducimus animi aspernatur atque molestias maxime ex vel
                officia. Delectus porro possimus, magni repellat vero pariatur
                consequatur perferendis voluptatibus cumque architecto?
              </p>
            </div>
          </div>
          <div class="card">
            <img src={image} alt="Outpatient Services" class="card-image" />
            <div class="card-content">
              <h3 class="card-title">Education</h3>
              <p class="card-description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Corporis ducimus animi aspernatur atque molestias maxime ex vel
                officia. Delectus porro possimus, magni repellat vero pariatur
                consequatur perferendis voluptatibus cumque architecto?
              </p>
            </div>
          </div>
          {/* <div class="card">
            <img src={image} alt="Surgical Expertise" class="card-image" />
            <div class="card-content">
              <h3 class="card-title">Entrepreneurs</h3>
              <p class="card-description">
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
