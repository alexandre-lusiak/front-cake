import React , {useEffect,useState} from 'react';
import { TextInput, Checkbox, Button, Group, Box, Textarea, Grid } from '@mantine/core';
import { useForm } from '@mantine/form';
import useApi from '../../hooks/useApi';
import userRequest from '../../axios/user';
import NavigationAdmin from '../../components/Navigation/NavigationAdmin';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../Footer/Footer';
import './Contact.css'
import { ClassNames } from '@emotion/react';
const ContactPage = () => {
    const{data:datatUser , request:requestgetCurrentUser} = useApi(userRequest.currentUser);
    const {request:requestSendContact} =useApi(userRequest.sendContact)
    useEffect(() => {
      requestgetCurrentUser()
        .then((res) => {
          console.log(res?.data);
          
          if(res.data !== null)
          form.setValues({
            lastName:res?.data?.lastName,
            firstName:res?.data?.firstName,
            email: res?.data?.email,
            phone : res?.data?.phone,
            city: res?.data?.adress?.city,
          })
        });
     
  },[])
    
    const form = useForm({
        initialValues: {
            lastName: '',
            firstName:"",
            email:"",
            phone:"",
            city:"",
            content:""
        },
    
        validate: {
            lastName: (value) => (value === "" ? 'champs obligatoire' : null),
            firstName: (value) => (value === "" ? 'champs obligatoire' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'email non vallide'),
            phone: (value) => (value.length < 10 ? 'champs obligatoire' : null),
            city: (value) => (value === ""  ? 'champs obligatoire' : null),
           
        },
      });

      const handleSubmit = (values:any) => {
        
        requestSendContact(values).then((data) => {
          console.log(data)
          
        }).catch((err) => console.log(err.response.message)
        )
      }
    
      return (
        <>
        <div className='contact-container'>
        <Navigation></Navigation>
        <Box sx={{ maxWidth:'100%'}} mx="auto">
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Grid>
            <Grid.Col span={4} >
            <TextInput
              withAsterisk
              label="lastName"
              placeholder="lastName"
              {...form.getInputProps('lastName')}
            />

            <TextInput
              withAsterisk
              label="firstName"
              placeholder="firstName"
              {...form.getInputProps('firstName')}
            />


            <TextInput
              withAsterisk
              label="Email"
              placeholder="email"
              {...form.getInputProps('email')}
            />

            </Grid.Col>
            <Grid.Col span={8}>

            <TextInput
              label="phone"
              placeholder="phone"
              {...form.getInputProps('phone')}
            />

            <TextInput
              label="city"
              placeholder="city"
              {...form.getInputProps('city')}
            />
            
            
            <Textarea
              withAsterisk
              label="Contenue"
              placeholder="Contenue"
              {...form.getInputProps('content')}
            />
            </Grid.Col>
        </Grid>
            <Group position="right" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
            
          </form>
        </Box>
        <Footer></Footer>
       
        </div>
        </>
      );
    }

export default ContactPage;