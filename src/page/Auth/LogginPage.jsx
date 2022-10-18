import React from 'react'

import Loggin from '../../components/Auth/Loggin'
import Navigation from '../../components/Navigation/Navigation'
import './logginPage.css'
import Footer from "../../Footer/Footer";
const LogginPage = () => {

  return (
    <div>
    <Navigation></Navigation>
    <div className='loggin-container'>
      <h1>Loggin</h1>
      <Loggin></Loggin>
    </div>
    <Footer></Footer>
    </div>
  )
}

export default LogginPage