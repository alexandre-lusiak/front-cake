import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Button, Text , Grid } from '@mantine/core';
import NavigationAdmin from '../../../components/Navigation/NavigationAdmin';

const AdminPage = () => {

    return (
    <> 
      <div>ADmin</div>
        <NavigationAdmin></NavigationAdmin>

        <section>
            {/* // faire un google chart des commande par mois  */}
            <h1>les derniere commandes</h1>
        </section>
    </> 
    )
}

export default AdminPage;