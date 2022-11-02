import React from 'react'
import Navigation from '../../components/Navigation/Navigation';
import COW from '../../asset/site/img/vache.jpg'
import BIO from '../../asset/site/img/bio.jpg'
import ECO from '../../asset/site/img/eco.png'
import './About.css'
import Footer from '../../Footer/Footer';
const Engagement = () => {

    return (

        <>
            <Navigation />
            <h1 className='title-about-one'>Decouvrez Nos Engagements , on met des kick dans las grande surface !!!</h1>
            <div className='lala'>
            <section className='section-one'>
                <h3 className='title-about'>Anti-Gachi</h3>
                <div className='about-one'>
                    <img className='img-one' src={ECO}></img>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                        sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                </div>
            </section>
            <section className='section-one'>
                <h3 className='title-about'>Fermier Local</h3>
                <div className='about-one'>
                    <img className='img-one' src={BIO}></img>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                        sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                </div>
            </section>
            <section className='section-one'>
                <h3 className='title-about'>Nos amis Les Bêtes</h3>
                <div className='about-one'>
                    <img className='img-one' src={COW}></img>
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

export default Engagement;