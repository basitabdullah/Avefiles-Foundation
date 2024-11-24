import React from "react";
import "./Services.scss";

const Services = () => {
  return (
    <div className="services">
      {/* <div className="image-container">
        <img src="" alt="err" />
      </div> */}
      <div className="services-container">
        <div className="service reverse">
          <div className="number">01</div>
          <div className="description">
            <h1>Rsearch And Analyse</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
              asperiores vel numquam a possimus eius aliquam veritatis pariatur
              dolore quia.
            </p>
          </div>
        </div>

        <div className="service">
          <div className="number">02</div>
          <div className="description">
            <h1>Steal And Kill</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
              asperiores vel numquam a possimus eius aliquam veritatis pariatur
              dolore quia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
