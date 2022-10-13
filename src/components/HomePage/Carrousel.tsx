import React, { useState } from "react";


import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';

import { useNavigate } from "react-router-dom";
import CardCollection from "../Card/Card";
const navigate = useNavigate();
    const [data, setData] = useState({
        title:'Bien la vie',
        description:'catégory poids lourd la',
        
    });

  const  handleClick = () => {
    navigate("/")
    }

function CarouselCard(heigt:number,maxWidth:number) {
    const autoplay = useRef(Autoplay({ delay: 2000 }));
    return (
      <Carousel
        sx={{ maxWidth: maxWidth }}
        mx="auto"
        withIndicators
        height={heigt}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        <Carousel.Slide><CardCollection title='lalal'  description='llllal' /></Carousel.Slide>
        <Carousel.Slide>2</Carousel.Slide>
        <Carousel.Slide>3</Carousel.Slide>
        {/* ...other slides */}
      </Carousel>
    );
  }

  export default CarouselCard