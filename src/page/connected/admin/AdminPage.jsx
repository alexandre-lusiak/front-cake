import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Button, Text , Grid } from '@mantine/core';
import NavigationAdmin from '../../../components/Navigation/NavigationAdmin';
import UserList from './UserList';

const AdminPage = () => {

    return (
    <> 
            <UserList/>
     
    </> 
    )
}

export default AdminPage;