import React, { useEffect, useState } from 'react';
import { TextInput, Checkbox, Button, Group, Box, Textarea, Grid } from '@mantine/core';
import { useForm } from '@mantine/form';
import useApi from '../../hooks/useApi';
import userRequest from '../../axios/user';
import NavigationAdmin from '../../components/Navigation/NavigationAdmin';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../Footer/Footer';
import './Contact.css'
import { ClassNames } from '@emotion/react';
import { showNotification } from '@mantine/notifications';
const ContactPage = () => {
  const { data: datatUser, request: requestgetCurrentUser } = useApi(userRequest.currentUser);
  const { request: requestSendContact } = useApi(userRequest.sendContact)
  useEffect(() => {
    requestgetCurrentUser()
      .then((res) => {
        console.log(res?.data);

        if (res.data !== null)
          form.setValues({
            lastName: res?.data?.lastName,
            firstName: res?.data?.firstName,
            email: res?.data?.email,
            phone: res?.data?.phone,
            city: res?.data?.adress?.city,
          })
      });

  }, [])

  const form = useForm({
    initialValues: {
      lastName: '',
      firstName: "",
      email: "",
      phone: "",
      city: "",
      content: "",

    },

    validate: {
      lastName: (value) => (value === "" ? 'champs obligatoire' : null),
      firstName: (value) => (value === "" ? 'champs obligatoire' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'email non vallide'),
      phone: (value) => (value.length < 10 ? 'champs obligatoire' : null),
      city: (value) => (value === "" ? 'champs obligatoire' : null),


    },
  });

  const handleSubmit = (values: any) => {

    requestSendContact(values).then((res) => {
      if(res?.data.code === 200)
      showNotification({
        title: 'SUCESS !!!',
        message: 'Message envoyé',
        color: 'green',

      })
     
    })
    .catch((err) => {
      console.log(err);
      showNotification({
          title: 'Erreur !!!',
          message: 'message perdu',
          color: 'red',

        })
    })
  }

  return (
    <>

      <Navigation/>
      <h1 className='title-content'>Contact</h1>
      <div className='contact-container'>
        <p className='text'>Envie de reserver son gateau ? une question ? </p>
        <div  className='box'>
          <form className='form' onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <div className='form-input'>
              <div className='aside'>
                <TextInput
                  className='input'
                  withAsterisk
                  label="lastName"
                  placeholder="lastName"
                  {...form.getInputProps('lastName')}
                />

                <TextInput
                  className='input'
                  withAsterisk
                  label="firstName"
                  placeholder="firstName"
                  {...form.getInputProps('firstName')}
                />


                <TextInput
                  className='input'
                  withAsterisk
                  label="Email"
                  placeholder="email"
                  {...form.getInputProps('email')}
                />


              </div>
              <div  className='aside'>
                <TextInput
                  className='input'
                  label="phone"
                  placeholder="phone"
                  {...form.getInputProps('phone')}
                />

                <TextInput
                  className='input'
                  label="city"
                  placeholder="city"
                  {...form.getInputProps('city')}
                />


                <Textarea
                  className='input'
                  withAsterisk
                  label="Contenue"
                  placeholder="Contenue"
                  {...form.getInputProps('content')}
                />
                <Checkbox required {...form.getInputProps('rgpd')} placeholder='rgpd' label='vente de votre email' />
              </div>
            </div>
              <Button className='button-send' type="submit">Envoyer</Button>
          </form>
        </div>

      </div>
      <Footer></Footer>
    </>
  );
}

export default ContactPage;