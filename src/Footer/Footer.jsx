import React, { Component } from 'react'
import './Footer.css'
import LOGO from '../asset/site/img/LOGOFRontCAKEss.png'
import { Image } from '@mantine/core'
const Footer = () => {

    return (
        <footer className='footer-container'>
            <img src={LOGO} />
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