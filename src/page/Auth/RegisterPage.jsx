
import * as React from 'react';
import Register from '../../components/Auth/Register';
import Navigation from '../../components/Navigation/Navigation';
import './RegisterPAge.css'
export const RegisterPage = () => {
    return (
        <>
        <Navigation></Navigation>
        <div className='register-container'>
          <h1>Inscription</h1>
          <Register></Register>
        
        </div>
        
        </>
    );
};