import React,{useState,useEffect,useRef, useContext} from 'react'
import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import  instance  from '../../axios/axios'
import { showNotification } from '@mantine/notifications';
import AuthContext from '../../context/AuthProvider';
import services from '../../utils/token';
import exportedAuthApi from '../../axios/auth';
import { AuthToken } from '../../entity/AuthToken';
import useAuth from '../../Authentification/useAuth';

import { Link, useNavigate } from "react-router-dom";
import useApi from '../../hooks/useApi';
import userRequest from '../../axios/user';
import './Loggin.css';
// import { sizes } from '@mantine/core/lib/Slider/SliderRoot/SliderRoot.styles';
const Loggin = () => {
  const auth = useAuth();
  const navigation = useNavigate();
  // const [email , setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [sucess, setSucess] = useState(false);
  const [users, setUsers] = useState([]);

const {dataCurrentUser , request:requestCurrentUser} = useApi(userRequest.currentUser)


  const handleSubmit = async (values) => {
    console.log('values',values);
     
          const response = await exportedAuthApi.login(values.username, values.password)
            .catch((err) => { showNotification({
              title: err.response.data.message,
              message: 'email et/ou mot de passe incorrect',
              color: 'red'
            })})
          const token = new AuthToken(response.data.token);

          await auth.logIn(token)

          requestCurrentUser().then(res => {
            if (auth.isAuthenticated()) {
              navigation('/')
              requestCurrentUser()
              window.location.reload()
            }else {
              navigation('/loggin')
            }
        })

    }

    const form = useForm({
      initialValues: {
        password :'',
        username: '',
        
      },

      // validate: {
      //   username: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email Invalide'),
      //   password: (value) => (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(value) ? null : 'Invalid password'),
      // },
      
    });


  return (
    
    <Box className='form-container' sx={{ maxWidth: 300 }} mx="auto">
       { sucess &&   <p>succés</p>}
        {errMsg &&  <p  >{errMsg}</p>}
      <form onSubmit={form.onSubmit((values) =>handleSubmit(values) )}>
        
        <TextInput
        className='input-container'
           required
          withAsterisk
          label="Email"
          placeholder="email"
          {...form.getInputProps('username')}
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

          <Button  className='button' type="submit">Valider</Button>
      
      <p>Mot de passe oublié ?</p>
      <Link className='link' to={'/reset/password'}>Mot de passe oulié ?</Link> 
      </form>

      <p>pas de comptes ?</p>
      <Link className='link' to={'/register'}>s'inscrire</Link>
    </Box>

   
  )
}

export default Loggin