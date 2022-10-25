import React,{useState} from 'react'
import { Card, Image, Text, Badge, Button, Group ,Grid,TextInput,Checkbox} from '@mantine/core';
import useAuth from '../../Authentification/useAuth';
import { Link } from 'react-router-dom';
import { IconZoomReset } from '@tabler/icons';
import './Card.css'
const   CardCake = ({data}:any) =>  {
const { isAuthenticated } = useAuth();


  return (
    <>    
    <Card className='card-cake' shadow="xs" p="xs" radius="xs" withBorder>
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{data.name}</Text>
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