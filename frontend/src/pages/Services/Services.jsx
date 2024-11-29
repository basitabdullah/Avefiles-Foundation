import React, { useEffect } from "react";
import "./Services.scss";
import { useUserStore } from "../../stores/useUserStore";
import { useParams } from "react-router-dom";

const Services = () => {
  const { id } = useParams();
  const { fetchSingleService, singleService } = useUserStore();
  useEffect(() => {
    fetchSingleService(id);
  }, [id]);
  console.log(singleService);

  return (
    <div className="services">
      <div className="image-container">
        <img src={singleService?.mainImage} alt="err" />

        <div className="text">
          <h1>{singleService?.mainTitle}</h1>
          <p>{singleService?.mainDesc}</p>
        </div>
      </div>
      

      <div className="services-container">
        {singleService?.points.map((point) => (
          <div className="service" key={Math.floor(Math.random() * 100)}>
            <div
              className="number"
              style={{
                backgroundImage: `url(${point.image})`,
              }}
            >
              {`0${point.number}`}
            </div>
            <div className="description">
              <h1>{point.title}</h1>
              <hr />

              <p>{point.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
