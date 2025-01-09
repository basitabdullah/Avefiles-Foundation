import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Hero.scss';

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const slides = [
    {
      image: 'https://lh3.googleusercontent.com/p/AF1QipMat-7sCqY0swWGm2hQXSVKbFhx1TMIDL5sEPiD=s1360-w1360-h1020',
      title: 'Making a Difference',
      description: 'Supporting communities in need',
    },
    {
      image: 'https://lh3.googleusercontent.com/p/AF1QipM_5QVgl3-Ye22J_vgJRZAYZYOBC99q5X-yWSjp=s1360-w1360-h1020',
      title: 'Volunteer Impact',
      description: 'Creating positive change together',
    },
    {
      image: 'https://lh3.googleusercontent.com/p/AF1QipOSSzvgTfWOScsTvG8FPEkjFEdA4eopceJTgEr6=s1360-w1360-h1020',
      title: 'Building Communities',
      description: 'Strengthening bonds, empowering lives',
    },
  ];

  return (
    <section className="hero">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="hero-slide">
            <img src={slide.image} alt={slide.title} />
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Hero;