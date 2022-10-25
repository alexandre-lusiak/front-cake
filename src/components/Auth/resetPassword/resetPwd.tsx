import userEvent from '@testing-library/user-event';
import React ,{useState} from 'react'
import userRequest from '../../../axios/user';
import useApi from '../../../hooks/useApi';
import Navigation from '../../Navigation/Navigation';


const ResetPwd = () =>  {

        const [email, setEmail] = useState('');
        const { data,request} = useApi(userRequest.forgotPasword)


    const onChange = () => {

    }    
      const handleSubmit = (e:any,email:string) => {
        e.preventDefault();   
        request(email)
        .then((res)=> console.log(res))
        
        .catch((err) =>{ console.log(err)} )
       
            
      }  
console.log(data)
console.log(email)
    return (
        <>
        <Navigation></Navigation>
             <form  style={{width:300, padding:"5px", marginLeft:'auto' ,marginRight:'auto' ,marginTop:'200px',display:'flex', border:'3px solid black',flexDirection:'column',justifyContent:'center'}}>
                   <legend>Mot de passe Oublié</legend>
                
                    <label>Entrez votre email</label>
                <input onChange={(e:any) => setEmail(e.target.value)} value={email} placeholder='email' className='link' type={"email"} name="email"/>
                <button  onClick= {(e) => handleSubmit(e,email)} type='submit' >Valider</button>
            </form>
        </>

           
    )

       
}

export default ResetPwd;