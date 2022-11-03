import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import userRequest from '../../axios/user';
import useApi from '../../hooks/useApi';
import { showNotification } from '@mantine/notifications';
import './Register.css'
const Register = () => {
const [user,setUser] = useState({});
const [messageError ,setMessageError] = useState('');

const {data, request:registerRequest} =useApi(userRequest.register)
let navigate = useNavigate()
const form = useForm({
  initialValues: {
    password :'',
    firstName:'',
    phone:'',
    lastName :'',
    email: '',
    address1:'',
    postalCode:0,
    city:'',
    country:''
    
  },
  validate: {
    lastName: (value) => (value === "" ? 'champs obligatoire' : null),
    firstName: (value) => (value === "" ? 'champs obligatoire' : null),
    email: (value) => (/^\S+@\S+$/.test(value) ? null : 'email non vallide'),
    password: (value) => (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(value) ? null : 'Mot de passe doit etre composer au 1 majuscule,1 caractere special et un chiffre'),
    firstName: (value) => (value == ""  ? 'champs obligatoire' : null),
    lastName: (value) => (value === ""  ? 'champs obligatoire' : null),
    phone: (value) => (value.length < 8 ? 'champs obligatoire' : null),
    address1: (value) => (value === ""  ? 'champs obligatoire' : null),
    city: (value) => (value === ""  ? 'champs obligatoire' : null),
    country: (value) => (value === "" ? 'champs obligatoire' : null),  
  },
  
});

useEffect(() => {
  
}, [user]);

const handleSubmit = (values) => {
    registerRequest(values).then((datas) => {
    if(datas.status === 200) {
      showNotification({
          title: 'SUCESS !!!',
          message: 'Bienvenue à toi',
          color: 'green',
          
        })

       setTimeout(() => {
         navigate('/loggin')
       }, 2000)

    }
    
  })

    
    .catch((err) => { showNotification({
      title: 'Erreur',
      message: err.response.data,
      color: 'red',
    })})

}

  return (
    <Box  className='form-container' sx={{ maxWidth: 680 }} mx="auto">
      <form  onSubmit={form.onSubmit((values) => handleSubmit(values) )}>
        <div className='form-control'>
        <div>
        <TextInput
         className='input-container'
          required
          withAsterisk
          label="Nom"
          placeholder="Nom"
          {...form.getInputProps('lastName')}
        />

        <TextInput
         className='input-container'
          required
          withAsterisk
          label="Prénom"
          placeholder="Prénom"
          {...form.getInputProps('firstName')}
        />

        <TextInput
         className='input-container'
        type={'number'}
        required
        withAsterisk
        label="Tel."
        placeholder="Tel."
        {...form.getInputProps('phone')}
        />

        <TextInput
         className='input-container'
           required
          withAsterisk
          label="Email"
          placeholder="email"
          {...form.getInputProps('email')}
        />

        <TextInput
         className='input-container'
          type={'password'}
          required
          withAsterisk
          label="Mot de passe"
          placeholder="Mot de passe"
          {...form.getInputProps('password')}
        />
      </div>
      <div>
        <TextInput 
        className='input-container'
          required
          withAsterisk
          label="Pays"
          placeholder="Pays"
          {...form.getInputProps('country')}
        />


      <TextInput
          className='input-container'
          required
          withAsterisk
          label="Adresse"
          placeholder="Adresse"
          {...form.getInputProps('address1')}
        />


        <TextInput
          className='input-container'
          required
          withAsterisk
          label="Ville"
          placeholder="Ville"
          {...form.getInputProps('city')}
        />

        <TextInput
         className='input-container'
         type={'number'}
          required
          withAsterisk
          label="CP"
          placeholder="CP"
          {...form.getInputProps('postalCode')}
        />
        <Checkbox required label='accepter les régles des données personnels' />
        </div>
        </div>
          <Button className='button' type="submit">Valider</Button>
      
      </form>
    </Box>
  )    
}

export default Register;