import * as react  from "react";
import CarouselCard from "../../components/HomePage/Carrousel";
import Navigation from "../../components/Navigation/Navigation";
import './HomePage.css'
import { IconCake } from '@tabler/icons';
import Footer from "../../Footer/Footer";
const HomePage = () => {


    return (

        <>  
            <div className="home-container">
                <Navigation></Navigation>
               <h1> <IconCake size={150} color="black"/> WELCOME TO FRONT-CAKE  <IconCake size={150}  color="black"/></h1> 
                <div className="home-text">
                    <p>Bienvenu chez Front-cake , nous sommes la pour vour régaler à tous les niveaux! </p>
                    <p>petite faim coquine , gros gueulton entre amis , ou grosse receptions ,  nou somme la...</p>
                    <p>la... pour vous exploser... le bide!! et régaler vos papilles</p>
                </div>
                <CarouselCard></CarouselCard>
            </div>
            <Footer></Footer>
        </>
    )
}


export default HomePage; 