import { showNotification } from '@mantine/notifications';
import userEvent from '@testing-library/user-event';
import React ,{useState} from 'react'
import { Link } from 'react-router-dom';
import userRequest from '../../../axios/user';
import useApi from '../../../hooks/useApi';
import Navigation from '../../Navigation/Navigation';
import './pwd.css'

const ResetPwd = () =>  {

        const [email, setEmail] = useState('');
        const { data,request} = useApi(userRequest.forgotPasword)
        const[isSucess,setIsSucess] =useState<boolean>(false)

    const onChange = () => {

    }    
      const handleSubmit = (e:any,email:string) => {
        e.preventDefault();   
        request(email)
        .then((res) => {
        if (res.status === 200) {
            showNotification({
              title: 'SUCESS !!!',
              message: `Un email vous as été envoyé pour la réanitianlisation de votre mot de passe`,
              color: 'green',
            })
          }
          localStorage.setItem('reset_token',res.data.data)
          setIsSucess(true)
        }).catch((err) => {
            console.log(err.response.status );
           if(err.response.status === 403){
            showNotification({
                title: 'Error !!!',
                message: `${err?.response?.data}`,
                color: 'red',
        
              })  
           }
        }
        )   
      }  

    return (
        <>
        <Navigation/>
             <form className='form-pwd' >
                   <legend>Mot de passe Oublié</legend>
                    <label>Entrez votre email</label>
                <input  onChange={(e:any) => setEmail(e.target.value)} value={email} placeholder='email' className='link' type={"email"} name="email"/>
                <button  className='button-pwd' onClick= {(e) => handleSubmit(e,email)} type='submit' >Valider</button>
            </form>
            { isSucess && <Link to={'/reset/form'} >Reinitialiser Mot de passe</Link> }
        </>
           
    )

       
}

export default ResetPwd;