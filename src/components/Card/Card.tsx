import React,{useState} from 'react'
import { Card, Image, Text, Badge, Button, Group ,Grid,TextInput,Checkbox} from '@mantine/core';
import useAuth from '../../Authentification/useAuth';
import { Link } from 'react-router-dom';
import { IconZoomReset } from '@tabler/icons';
import './Card.css'
import CakeIMG from '../../asset/site/img/caketest.jpeg'
import { URL_API_FILES } from '../../const/URL_API';
const   CardCake = ({data}:any) =>  {
const { isAuthenticated } = useAuth();



console.log('URlIMAGE/',`${URL_API_FILES}/${data?.file?.filePath}`);


  return (
    <>    
    <Card className='card-cake'  shadow="xs" p="xl" radius="md" withBorder>
      <Card.Section >
        <Image
        className='img-card'
           src={`${URL_API_FILES}/${data?.file?.filePath}`}
           height={'100%'}
           width={'100%'}
           alt="Norway"
         /> 
            
        {/* // <Image
        //   src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
        //   height={160}
        //   alt="Norway"
        // /> 
       */}
     
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text align='left' weight={800}>{data.name}</Text>
        <Badge color=  {data?.isActif === true ?"green"  :"red" } variant="light">
        {data?.category?.name}
        </Badge>
      </Group>
      <Button className='button-card' variant='filled' fullWidth color={"dark"} mt="md" radius="md">
       <Link className='link-card' to={`/cake/${data.id}`}>Voir Le Mets</Link>
      </Button>
      {isAuthenticated() ?  
       <Button className='button-card' variant='filled' color={"dark"} fullWidth  mt="md" radius="md">
        reserver
      </Button> : 
      <>
       <Button className='button-card' variant='filled' color={"dark"} fullWidth  mt="md" radius="md">
      <Link  className='link-card' to='/loggin'>se connecter</Link> 
     </Button> 
      <Button className='button-card' variant='filled' color={"dark"} fullWidth  mt="md" radius="md">
      <Link  className='link-card' to='/register'>s'inscrire</Link> 
     </Button> </>
       }
     
    </Card>

    </>
  );
}

export default CardCake