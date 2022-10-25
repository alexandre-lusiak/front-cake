import React from 'react'

import Loggin from '../../components/Auth/Loggin'
import Navigation from '../../components/Navigation/Navigation'
import './logginPage.css'
import Footer from "../../Footer/Footer";
import { Link } from 'react-router-dom';
const LogginPage = () => {

  return (
    <div>
    <Navigation></Navigation>
    <div className='loggin-container'>
      <h1>Loggin</h1>
      <Loggin></Loggin>
    </div>
    <p>pas de comptes ?</p>
      <Link className='link' to={'/register'}>sign in</Link>
      <p>Mot de passe oublié ?</p>
      <Link className='link' to={'/reset/password'}>sign in</Link> 
    <Footer></Footer>
    </div>
  )
}

export default LogginPage