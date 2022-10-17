import React, { useState } from "react";
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { useNavigate } from "react-router-dom";


import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
const  CarouselCard = () =>  {

    const navigate = useNavigate();

    const autoplay = useRef(Autoplay({ delay: 360000 }));
    return (
      <Carousel
      style={{marginTop:'150px'}}
        sx={{ maxWidth: 1000 }}
        mx="auto"
        withIndicators
        height={300}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        <Carousel.Slide> <Card shadow="sm" p="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src={'data'}
              height={160}
              alt="Norway"
            />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>Lorem Ipsum</Text>
            <Badge color="pink" variant="light">
              au TOP
            </Badge>
          </Group>

          <Text size="sm" color="dimmed">
          Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. 
          </Text>

          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            voir category
          </Button>
        </Card></Carousel.Slide>
            <Carousel.Slide> <Card shadow="sm" p="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src={'data'}
              height={160}
              alt="Norway"
            />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>Lorem Ipsum</Text>
            <Badge color="pink" variant="light">
              au TOP
            </Badge>
          </Group>

          <Text size="sm" color="dimmed">
          Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. 
          </Text>

          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            voir category
          </Button>
        </Card>
    </Carousel.Slide>
        
        
        <Carousel.Slide> <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={'data'}
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>Lorem Ipsum</Text>
        <Badge color="pink" variant="light">
          au TOP
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
      Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. 
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        voir category
      </Button>
    </Card></Carousel.Slide>
        {/* ...other slides */}
      </Carousel>
    );
  }

  export default CarouselCard