import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import cakeRequest from '../../axios/cake'
import CardCake from '../../components/Card/Card'
import useApi from '../../hooks/useApi'
import { Card, Image, Text, Badge, Button, Group, Grid, TextInput, Checkbox, NumberInput } from '@mantine/core';
import Navigation from '../../components/Navigation/Navigation'
import Footer from '../../Footer/Footer'
import './CardItem.css'
import userRequest from '../../axios/user'
import { useForm } from '@mantine/form'
import { ThemeContext } from '@emotion/react'
import useAuth from '../../Authentification/useAuth'
import exportedStorageAuth from '../../Authentification/storage'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import instance from '../../axios/axios'
import { URL_API_FILES } from '../../const/URL_API'
import { showNotification } from '@mantine/notifications'
const CakeItem = () => {
  const { isAuthenticated } = useAuth();
  useAuth()
  const { data, request: requestCake } = useApi(cakeRequest.getCake)
  const { request: requestLike } = useApi(cakeRequest.like);
  const { id } = useParams();
  const [cake, setCake] = useState<any>();
  const { data: userInfo, request: requestgetCurrentUser } = useApi(userRequest.currentUser);
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState<any>();
  const { request: requestPostComment } = useApi(userRequest.createComment);

  useEffect(() => {

    requestgetCurrentUser().then((res) => {
      setUser(res.data)
    });
  }, []);

  useEffect(() => {
    requestCake(id).then((res) => {
      form.setValues({ id: parseInt(res.data.data.id) })
    })
    
  }, []);

  useEffect(() => {
   
user?.cakeLikes?.filter((w:any) => {
  if(w?.product?.id === data?.data?.id){
    console.log('wwww',w);
    
    setLiked(true);
    
  }
  
})

  }, [liked,user]);

  const handleLike = () => {


    requestLike(id, (user.id)).then((res) => {
      console.log(res.data.message);

      if (res.data.message.includes('delete')) {
        setLiked(false)
        console.log(res.data.data);
      }
      if (res.data.message.includes("add")) {
        setLiked(true)
      }

    })
    
  }
  useEffect(() => {
 
 
  
  }, [data]);


  const form = useForm({
    initialValues: {
      content: "",
      id: 0
    },
    validate: {
      content: (value) => (value == "" || value.length < 5 ? 'champs trop court' : null)
    }

  })



  const handleSubmit = (values: any) => {
    requestPostComment(user?.id, values).then((res) => {
      if(res.data.code === 200){
        showNotification({
          title: 'SUCESS !!!',
          message: 'commetaire écrit',
          color: 'green',

        })
        requestgetCurrentUser()
        requestCake(id)
      }
    }).catch(err => {
      showNotification({
        title: 'Erreur!!!',
        message: 'Commentaire Fail',
        color: 'red',

      })
    })

  }

  console.log('DALENG', liked);

  return (
    <>

      <Navigation/>
      <div className='section-card-item'>
        <div className='card-item'>
          <Card p="xl" radius="xl" >
            <Group position="apart" mt="md" mb="xs">
              <Text className='title-card' weight={500}>{data.data?.name}</Text>
              <Badge size={'lg'} color="pink" variant="light">
                {data.data?.category?.name}
              </Badge>
            </Group>
            <Card.Section component="a" href="https://mantine.dev/">
              <Image
                src={`${URL_API_FILES}/${data?.data?.file?.filePath}`}
                alt="Cake"
              className='cake-img'
              />
            </Card.Section>
            <Text mt={'xl'} size="xl" color="dark">
            {data.data?.category?.description}
            </Text>
            {
              liked && data.data.cakeLikes.length ?
             <> <h5>J'aime plus? </h5>
                <div className='Liked'>
                  <Button onClick={handleLike} style={{ backgroundColor: "white" }} >
                    <AiFillHeart size={28} color='red' />
                  </Button>
                </div></>
                :
                <>
                <h5>J'aime  ? </h5>
                <div className='unLiked'>
                  <Button onClick={() => handleLike()} style={{ backgroundColor: "white" }} >
                    <AiOutlineHeart size={28} color='red' />
                  </Button>
                </div>
                </>
            }
          </Card>
        </div>

      </div>
        <section className='container-comment'>
          {
            isAuthenticated() ?
              <div className='form-comment'>
                <h2>Place aux Avis!!</h2>
                <form onSubmit={form.onSubmit((values) => handleSubmit(values))} className='fomr-comment'>
                  <legend>Vos Avis sont notre imaginations</legend>
                  <textarea className='text-comment' placeholder='Commentez....' onChange={(e) => form.setFieldValue('content', e.currentTarget.value)}></textarea>

                  <button className='button-comment'>Valider</button>
                </form>
              </div>
              :
              <>
                <h3 className='title-com'>Commentaire</h3>
                <p>Inscrivez-vous , pour pouvoir commenter</p> </>}
          <hr></hr>
          {data?.data?.comments?.length > 0 ? data?.data?.comments?.map((comment: any, key: number) => {

            return <div className='comment-item' key={comment?.id}>
              <p className='author'>{comment?.user?.lastName} {comment?.user?.firstName}  </p>
              <span className='date'>Le  {new Intl.DateTimeFormat('fr-FR', { dateStyle: 'short' }).format(new Date(comment.createdAt ?? new Date('1970-01-01')))}</span>
              <p className="content">{comment.content}</p>
              
            </div>
          })
            : <p className='content'>aucun Commentaie</p>
          }

        </section>

      <div>

      </div>
      <Footer/>
    </>
  )
}

export default CakeItem