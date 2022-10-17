import React from 'react'

import Loggin from '../../components/Auth/Loggin'
import Navigation from '../../components/Navigation/Navigation'
import './logginPage.css'

const LogginPage = () => {

  return (
    <>
    <Navigation></Navigation>
    <div className='loggin-container'>
      <h1>Loggin</h1>
      <Loggin></Loggin>
    
    </div>
    
    </>
  )
}

export default LogginPage