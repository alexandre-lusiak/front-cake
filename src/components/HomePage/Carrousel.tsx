import React, { useState, useEffect } from "react";
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { Link, useNavigate } from "react-router-dom";
import CakeIMG from '../../asset/site/img/caketest.jpeg'
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import './../../App.css'
import useApi from "../../hooks/useApi";
import categoryRequest from "../../axios/category";
import cakeRequest from "../../axios/cake";
const CarouselCard = () => {

  const navigate = useNavigate();
  const { data, request } = useApi(categoryRequest.getCategories)
  useEffect(() => {
    request();
  }, []);
  console.log(data);


  const filtercake = data?.data?.filter((w:any) => {
      if(w.name != "snow"){
        return w
      }
  })
  const autoplay = useRef(Autoplay({ delay: 360000 }));
  return (
    <Carousel
      style={{ marginTop: '150px' }}
      sx={{ maxWidth: 1200 }}
      mx="auto"
      withIndicators
      height={600}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >

      {  data?.data?.length > 0  ?  filtercake.map((cat:any, key:number) => {

        return  <Carousel.Slide key={cat.id}> <Card shadow="sm" p="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src={CakeIMG}
              height={400}
              alt="gateaux"
            />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            {cat?.product?.map((p:any,key:number) => {
              return  <Link className="link" to={`/cake/${p.id}`} key={p.id} >{p?.name}</Link>
            })}
           
            <Badge color="pink" variant="light">
              {cat?.name}
            </Badge>
          </Group>

          <Text size="sm" color="dimmed">
           {cat.description}
          </Text>

          <Button ml="lg" variant="light" color="blue" mt="md" radius="md" >
            <Link className="link-acake" to='/cakes' >Gateaux</Link>
          </Button>
        </Card>
        </Carousel.Slide>
      })
        :
        <>
          <Carousel.Slide> <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section>
              <Image
                src={CakeIMG}
                height={400}
                alt="gateaux"
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

            <Button ml="lg" variant="light" color="blue" mt="md" radius="md" >
              voir category
            </Button>
          </Card>
          </Carousel.Slide>
          <Carousel.Slide> <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section>
              <Image
                src={CakeIMG}
                height={300}
                alt="gateaux"
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

            <Button ml="lg" variant="light" color="blue" mt="md" radius="md" >
              voir category
            </Button>
          </Card>
          </Carousel.Slide>
          <Carousel.Slide> <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section>
              <Image
                src={CakeIMG}
                height={400}
                alt="gateaux"
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

            <Button ml="lg" variant="light" color="blue" mt="md" radius="md" >
              voir category
            </Button>
          </Card>
          </Carousel.Slide>
        </>}

    </Carousel>
  );
}

export default CarouselCard