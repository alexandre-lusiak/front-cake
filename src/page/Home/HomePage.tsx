import  react,{useEffect,useState}  from "react";
import CarouselCard from "../../components/HomePage/Carrousel";
import Navigation from "../../components/Navigation/Navigation";
import './HomePage.css'
import { IconCake } from '@tabler/icons';
import Footer from "../../Footer/Footer";
import {GiHighKick} from 'react-icons/gi'
import useApi from "../../hooks/useApi";
import receiptRequest from "../../axios/receipt";
import useResize from "../../hooks/useSize";
const HomePage = () => {
    const size =useResize();
   const {data, request} = useApi(receiptRequest.getreceiptWeek)
    const [receipt, setReceipt] = useState<any>();

   useEffect(  () => {
    request()
        .then((res) => {
        setReceipt(res.data.data[0])
        })
        .catch((err) => console.log(err)
        )
   }, []);

   console.log(receipt);
   
    return (
        <>  
            <Navigation />
            <div className="home-container">
               <h1 className="title-hompage"> <GiHighKick className="icon-title"   color="black"/> WELCOME TO FRONT-CAKE  <GiHighKick className="icon-title reverse" style = {{transform: 'rotateY(180deg)' }}  color="black"/></h1> 
               <hr></hr>
                <div className="home-text">
                    <p>Bienvenu chez Front-cake , nous sommes la pour vour régaler à tous les niveaux! </p>
                    <p>petite faim coquine , gros gueulton entre amis , ou grosse receptions ,  nou somme la...</p>
                    <p>la... pour vous exploser... le bide!! et régaler vos papilles</p>
                </div>
                <CarouselCard />
                <hr></hr>
                <div className="home-receipt">
                    <h1 className="title-hompage"> Venez découvrir La Recette de la Semaine !!!
                        <p>Toutes les semaines , une nouvelle recette appaaitra pour amélioré ton art du Front-Cake</p>
                    </h1>
                    <div>
                        <h3>{receipt?.title} (4Pers)</h3>
                        <ul>
                            {receipt?.ingredient?.map((i:any) => {
                             return <li >{i?.name} {i.quantity}g</li>
                            })}
                        </ul>
                        <div className="receipt-text" dangerouslySetInnerHTML={{ __html: receipt?.description ?? '-' }} />
                    </div>
                </div>
            </div>
            <hr></hr>
            <Footer/>
        </>
    )
}


export default HomePage; 