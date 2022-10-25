import React, { Component } from 'react'
import './Footer.css'
import LOGO from '../asset/site/img/logo.jpg'
import { Image } from '@mantine/core'
import {GiHighKick} from 'react-icons/gi'
const Footer = () => {

    return (
        <footer className='footer-container'>
            <div>
            <GiHighKick style = {{transform: 'rotate(10deg)' }} size={150} color="white"/>
            <img src={LOGO} width={200} style={{borderRadius:'50%'}} />
            </div>
                <div>
                    <h4>Ou nous suivre</h4>
                    <ul>
                        <li>FB</li>
                        <li>Insta</li>
                        <li>Pinterest</li>
                    </ul>
                </div>
                <div>
                    <h4>L'entrepise</h4>
                    <ul>
                        <li>L'histoire</li>
                        <li>nos principes</li>
                        <li>nos engagements</li>
                    </ul>
                </div>
                <div>
                    <h4>A propos</h4>
                    <ul>
                        <li>CGV</li>
                        <li>Mentions légales</li>
                        <li>Données personnelles</li>
                    </ul>
                </div>
                
        </footer>
    )
}

export default Footer;