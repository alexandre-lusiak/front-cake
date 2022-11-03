import React, { useState, useEffect } from 'react'
import { showNotification } from '@mantine/notifications';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';
import userRequest from '../../../axios/user';
import useApi from '../../../hooks/useApi';
import Navigation from '../../Navigation/Navigation';
import './pwd.css'
import { useForm } from '@mantine/form';
import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
const ResetPwdForm = () => {
  let navigate = useNavigate()
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { data, request } = useApi(userRequest.resetPwd)
  const [reset_token, setResetToken] = useState<any>();

  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: '',
      reset_token: 0
    },
    validate: {
      password: (value) => (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(value) ? null : 'Invalid password'),
      confirmPassword: (value) => (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(value) ? null : 'Invalid password'),
    },
  })

  useEffect(() => {
    setResetToken( localStorage.getItem('reset_token'))
    form.setFieldValue("reset_token", reset_token);
  }, [reset_token]);
  
  
  const handleSubmit = (values: any) => {


    request(values)
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          showNotification({
            title: 'SUCESS !!!',
            message: `Réinitialisation  effectué`,
            color: 'green',
          })
          navigate('/loggin')

          localStorage.removeItem('reset_token')
        }
      }).catch((err) => {
        console.log(err);
        if (err.response.status === 403) {
          showNotification({
            title: 'Error !!!',
            message: `Erreur lors de la réanitialisation`,
            color: 'red',
          })
        }
      }
      )
  }

  return (
    <>
      <Navigation/>
      <form className="form-pwd" onSubmit={form.onSubmit((values) =>handleSubmit(values) )}>

      <TextInput
          
          type={'password'}
          required
          withAsterisk
          label="nouveau Mot de passe"
          placeholder="nouveau Mot de passe"
          {...form.getInputProps('password')}
        />
        <TextInput
          type={'password'}
          required
          withAsterisk
          label="Confirme Mot de passe"
          placeholder=" ConfirmeMot de passe"
          {...form.getInputProps('confirmPassword')}
        />

        <TextInput
          value={reset_token}
          type={'hidden'}
          {...form.getInputProps('reset_token')}
          onChange={() => console.log('ee')
          }
        />
        
        <Button className='button' type="submit">Valider</Button>
      </form>
    </>

  )


}

export default ResetPwdForm;