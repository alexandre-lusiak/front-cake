import React from 'react'
import Navigation from '../../components/Navigation/Navigation';
import ABOUT_ONE from '../../asset/site/img/About-one.jpg'
import ABOUT_TWO from '../../asset/site/img/ouverture.jpg'
import ABOUT_THREE from '../../asset/site/img/ecole.jpg'
import './About.css'
import Footer from '../../Footer/Footer';
const About = () => {

    return (

        <>
            <Navigation />
            <h1 className='title-about-one'>Decouvrez la ou toute à Commencer !!!</h1>
            <div className='lala'>
            <section className='section-one'>
                <h3 className='title-about'>L'apprentissage</h3>
                <div className='about-one'>
                    <img className='img-one' src={ABOUT_THREE}></img>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                        sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                </div>
            </section>
            <section className='section-one'>
                <h3 className='title-about'>Le cemmencement</h3>
                <div className='about-one'>
                    <img className='img-one' src={ABOUT_ONE}></img>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                        sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                </div>
            </section>
            <section className='section-one'>
                <h3 className='title-about'>La Validation</h3>
                <div className='about-one'>
                    <img className='img-one' src={ABOUT_TWO}></img>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                        sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                </div>
            </section>
            <section className='section-one'>
                <h3 className='title-about'>Front Cake</h3>
                <div className='about-one'>
                    <img className='img-one' src={ABOUT_TWO}></img>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                        sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                </div>
            </section>
            </div>
            <Footer />
        </>
    )
}

export default About;