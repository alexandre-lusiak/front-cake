
import * as React from 'react';
import Register from '../../components/Auth/Register';
import Navigation from '../../components/Navigation/Navigation';
import './RegisterPAge.css'
import Footer from "../../Footer/Footer";
export const RegisterPage = () => {
    return (
        <div>
        <Navigation/>
        <div className='register-container'>
          <h1>Inscription</h1>
          <Register></Register>
        </div>
        <Footer></Footer>
        </div>
    );
};