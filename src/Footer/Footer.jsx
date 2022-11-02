import React, { Component } from 'react'
import './Footer.css'
import LOGO from '../asset/site/img/logo.jpg'
import { Image } from '@mantine/core'
import {GiHighKick} from 'react-icons/gi'
import useResize from '../hooks/useSize'
import { 
    IconBrandFacebook ,
    IconBrandPinterest,
    IconBrandInstagram,
    IconHistory,
    IconUsers,
    IconGavel ,
    IconWorld ,IconUser} 
    
    from '@tabler/icons';

import { Link } from 'react-router-dom'

const Footer = () => {
    const size =useResize();
    return (
        <footer className='footer-container'>
            {/* <div>
            <GiHighKick style = {{transform: 'rotate(10deg)' }} size={  150} color="white"/>
            <img src={LOGO} width={150} style={{borderRadius:'50%'}} />
            </div> */}
                <div className='footer-item'>
                <h4>Ou nous suivre ?</h4>
                    <ul className='list-footer social'>
                        <li><a href='https://www.facebook.com/'><IconBrandFacebook color='white' size={30}/></a></li>
                        <li><a href='https://www.instagram.com/'><IconBrandInstagram color='white' size={30}/></a></li>
                        <li><a href='https://www.pinterest.com/'><IconBrandPinterest color='white' size={30}/></a></li>
                    </ul>
                </div>
                <div className='hr'></div>
                <div className='footer-item '>
                    <h4>Front Cake</h4>
                    <ul className='list-footer'>
                    <li>
                        <Link className='link-footer'  to={'/about'}>
                          L'histoire
                        </Link>
                    </li>
                    <li>
                        <Link className='link-footer'   to={'/about'}>
                           Nos Principes
                        </Link></li>
                    <li>
                        <Link className='link-footer'  to={'/about'}>
                            Nos Engagement
                        </Link>
                    </li>
                    </ul>
                </div>
                <div className='hr'></div>
                <div className='footer-item'> 
                    <h4>A propos</h4>
                    <ul className='list-footer'>
                    <li>
                        <Link className='link-footer'  href='https://www.pinterest.com/'>
                            CGV
                        </Link>
                    </li>
                    <li>
                        <Link className='link-footer' to={'/RGPD'}>
                           Mentions légales
                        </Link></li>
                    <li>
                        <Link className='link-footer'  to={'/about'}>
                           Données personnelles
                        </Link>
                    </li>
                   </ul>
                </div>
                
        </footer>
    )
}

export default Footer;