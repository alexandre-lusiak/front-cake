import React ,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Menu, Button, Text , Grid } from '@mantine/core';
import NavigationAdmin from '../../../components/Navigation/NavigationAdmin';
import UserList from './UserList';
import useApi from '../../../hooks/useApi';
import requestStat from '../../../axios/stats';
import { IconUsers ,IconCake  ,IconMessages,IconThumbUp } from '@tabler/icons';
import FooterAdmin from '../../../Footer/FooterAdmin';
const AdminPage = () => {
    const{data,request} =useApi(requestStat.getStats);

    useEffect(() => {
        request();

    }, []);

    console.log('DATAA',data);
    return (
    <>      
    <NavigationAdmin/>

    <h1 className='title-list-user'>Stat Front Cake</h1>
    <section className='section-stat'>
        <div className='item-stat cake-stat'>
            <h6><IconCake size={100}/></h6>
            <p className='stat'>{data?.data?.prod}</p>
        </div>
        <div className='item-stat cake-stat'>
            <h6><IconUsers size={100}/></h6>
            <p className='stat'> {data?.data?.User}</p>
        </div>
        <div className='item-stat cake-stat'>
            <h6><IconMessages size={100}/></h6>
            <p className='stat'>{data?.data?.com}</p>
        </div>
        <div className='item-stat cake-stat'>
            <h6><IconThumbUp size={100}/></h6>
            <p className='stat'> {data?.data?.like}</p>
        </div>
    </section>
        <UserList/>
        <FooterAdmin/>
    </> 
    )
}

export default AdminPage;