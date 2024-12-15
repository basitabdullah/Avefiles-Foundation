import "./ServicePage.scss";
import { useUserStore } from "../../stores/useUserStore";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const ServicePage = () => {
  const { services, fetchServices } = useUserStore();

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);
  console.log(services);

  return (
    services && (
      <section className="services">
        <div className="services__header">
          <span className="services__tag">Our Impact</span>
          <h2>How We Make A Difference</h2>
          <p>
            Through our dedicated services and initiatives, we're creating
            lasting change in communities worldwide
          </p>
        </div>
        <div className="services__grid">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </section>
    )
  );
};

const ServiceCard = ({ mainImage, mainTitle, mainDesc, _id }) => {
  return (
    <div className="service-card">
      <div className="service-card__image">
        <img src={mainImage} alt={mainTitle} />
      </div>
      <h3 className="">{mainTitle}</h3>
      <p className="service-card__description">{mainDesc}</p>
      <Link to={`/service/${_id}`}>
        <button className="service-card__button">Learn More</button>
      </Link>
    </div>
  );
};

export default ServicePage;
