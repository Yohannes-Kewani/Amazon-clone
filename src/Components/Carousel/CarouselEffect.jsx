import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./Image/data";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import classes from "./Carousel.module.css"
function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imageItemLink,i) => {
          return <img src={imageItemLink} key={i}/>;
        })}
      </Carousel>
      <div className={classes.hero_img}></div>
    </div>
  );
}

export default CarouselEffect;
