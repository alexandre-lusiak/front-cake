import { Menu, Button, Text , Grid } from '@mantine/core';        
import { Link } from 'react-router-dom';
import './Navigation.css'

const NavigationAdmin = () => {
   
    return (
        <Grid className='container-navigation' >
            <Grid.Col className='navigation-grid' span={2}><Link className='link'  to={"/admin"}  >Espace Admin</Link></Grid.Col>
            <Grid.Col className='navigation-grid' span={2}><Link className='link'  to={"/admin/cake"}  >Espace Gateaux</Link></Grid.Col>
            <Grid.Col className='navigation-grid' span={2}><Link  className='link' to={"/admin/oeil"}>Espace Big Brother</Link></Grid.Col>
            <Grid.Col className='navigation-grid' span={2}><Link  className='link' to={"/admin/comment"}  >Espce commentaire</Link></Grid.Col>
            <Grid.Col className='navigation-grid' span={2}><Link  className='link' to={"/admin/commande"}  >Espace Commandes</Link></Grid.Col>
            <Grid.Col className='navigation-grid' span={2}><Link  className='link' to={"/"}  >Site</Link></Grid.Col>
        </Grid>

    )
}        
        
export default NavigationAdmin ; 