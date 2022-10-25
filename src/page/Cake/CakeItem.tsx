import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import cakeRequest from '../../axios/cake'
import CardCake from '../../components/Card/Card'
import useApi from '../../hooks/useApi'
import { Card, Image, Text, Badge, Button, Group ,Grid,TextInput,Checkbox,NumberInput} from '@mantine/core';
import Navigation from '../../components/Navigation/Navigation'
import Footer from '../../Footer/Footer'
import './CardItem.css'
import userRequest from '../../axios/user'
import { useForm } from '@mantine/form'
import { ThemeContext } from '@emotion/react'
import useAuth from '../../Authentification/useAuth'
import exportedStorageAuth from '../../Authentification/storage'
import { AiFillHeart ,AiOutlineHeart} from "react-icons/ai";
import instance from '../../axios/axios'
const CakeItem = () => {
 const { isAuthenticated } = useAuth();
  useAuth()
    const {data,request:requestCake} = useApi(cakeRequest.getCake)
    const {request:requestLike} = useApi(cakeRequest.like);
    const {id} =  useParams();
    const [cake, setCake] = useState<any>();
    const {data:userInfo , request:requestgetCurrentUser} =useApi(userRequest.currentUser);
    const [liked, setLiked] = useState(false);
    const [user, setUser] = useState<any>();  
    const { request:requestPostComment} =useApi(userRequest.createComment);

    useEffect(() => {
      
        requestgetCurrentUser().then((res)=>{
          setUser(res.data)
        });
    }, []);

    useEffect( () => {
        requestCake(id).then((res) => {
          form.setValues({id:parseInt(res.data.data.id)})
        })
    }, []);


    const handleLike = () => {
      console.log(user.id);
      
      requestLike(id,(user.id)).then((res) => {
        console.log(res.data.message);
        
        if(res.data.message.includes('delete')){
            setLiked(false)
            console.log(res.data.data);
        }
        if(res.data.message.includes("add")){
          setLiked(true)
        }
        
      })
      
    }
console.log(data.data);

const form = useForm({
    initialValues:{
      content:"",
      id:0
    },
      validate:{
        content: (value) => (value == "" ||  value.length  < 5 ? 'champs trop court' : null)
      }
    
})

useEffect(() => {
  console.log(liked)
}, [liked]);


const handleSubmit= (values:any) => { 
  requestPostComment(user?.id,values)
  requestgetCurrentUser()
  requestCake(id)
  
}

console.log('DALENG',liked);

    return(
    <>

    <Navigation></Navigation>
    <div className='section-card-item'>
    <div className='card-item'>  
    <Card   p="xl" radius="xl" >
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{data.data?.name}</Text>
        <Badge color="pink" variant="light">
          {data.data?.category?.name}
        </Badge>
      </Group>
      <Card.Section component="a" href="https://mantine.dev/">
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={500}
          alt="Norway"
        />
      </Card.Section>
      <Text mt={'xl'} size="xl" color="dark">
        With Fjord Tours With Fjord Tours With Fjord Tours With Fjord 
        Tours With Fjord Tours With Fjord Tours With Fjord 
        Tours With Fjord Tours  With Fjord Tours With Fjord Tours With Fjord Tours With Fjord Tours With Fjord Tours With Fjord Tours With Fjord Tours With Fjord Tours With Fjord Tours
      </Text>
      <h6>Vous AIMEZ? LIkez!! </h6>
         { 
          liked && data.data.cakeLikes.length ? 
          <div className='Liked'>
              <Button onClick={handleLike} style={{backgroundColor:"white"}} >
                <AiFillHeart size={28} color='red' />
              </Button>
            </div> 
            :
            <div className='unLiked'>
               <Button onClick={() =>handleLike()} style={{backgroundColor:"white"}} >
                  <AiOutlineHeart size={28} color='red' />
                  </Button>
            </div>
         }
            
        
      
    </Card>
    </div>

        <section className='container-comment'>
          {
          isAuthenticated() ?
          <>
          <h3>Commentaire</h3>
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))} className='fomr-comment'>
                <legend>Vos Avis sont notre imaginations</legend>
                  <textarea  className='text-comment' onChange={(e) => form.setFieldValue('content',e.currentTarget.value)}></textarea>
                
                  <button>Valider</button>
            </form>
            </> 
            : 
            <>
            <h3>Commentaire</h3>
            <p>Inscrivez-vous , pour pouvoir commenter</p> </>  }  
            <hr></hr>
            {data?.data?.comments?.length > 0 ? data?.data?.comments?.map((comment:any,key:number) => {

            return <div key={comment?.id}>
              <p>ecrit par {comment?.user?.lastName} {comment?.user?.firstName}  <span> le : {new Intl.DateTimeFormat('fr-FR', { dateStyle: 'short' }).format( new Date(comment.createdAt?? new Date('1970-01-01')))}</span></p>
              <p>{comment.content}</p>
                <hr></hr>
            </div> })
            : <p>aucun Commentaie</p>
          }
           
             </section>
    </div>

    <div>

    </div>
    <Footer></Footer>
        </>
    )
}

export default CakeItem