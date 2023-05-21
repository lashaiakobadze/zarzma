import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './SlickSlider.module.css';

type SlickSliderProps = {
  images: string[];
  slidesToShow?: number;
  slidesToScroll?: number;
};

const SlickSlider: React.FC<SlickSliderProps> = ({ images, slidesToShow=1, slidesToScroll=1 }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll,
    autoplay: true,
    responsive: [
      {
        breakpoint: 2000, // Adjust the breakpoint as needed
        settings: {
          slidesToShow, // Show two slides in one slide at this breakpoint
          slidesToScroll, // Scroll two slides at a time at this breakpoint
        },
      },
    ]
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index} className={style.slider}>
          <img src={image} className={style.imgFluid}/>
        </div>
      ))}
    </Slider>
  );
};

export default SlickSlider;
