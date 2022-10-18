import  react ,{useEffect,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Button, Text , Grid } from '@mantine/core';
import { IconUser, IconArrowBarRight, IconArrowBarLeft ,IconAd2,IconEggs } from '@tabler/icons';
import useApi from '../../hooks/useApi';
import userRequest from '../../axios/user';
import useAuth from '../../Authentification/useAuth';
import './Navigation.css'
const Navigation = () => {

const { logout } = useAuth();           
const {data,request:requestGetCurrentUser} = useApi(userRequest.currentUser);

const [user, setUser] = useState({});
let navigate = useNavigate();
    useEffect(() => {
        requestGetCurrentUser()
    }, []);

    useEffect(() => {
        setUser(data);
    }, [user]);
    
    
    const handleLogout = () => {
        logout();
        window.location.reload()
    }
    
    return ( 
        <> 
             
        <Grid className='container-navigation'>
            <Grid.Col className='navigation-grid' span={3}><Link className='link'  to={"/"}  >Home</Link></Grid.Col>
            <Grid.Col className='navigation-grid' span={3}><Link  className='link' to={"/cakes"}  >Vos Gateaux Favoris</Link></Grid.Col>
            <Grid.Col className='navigation-grid' span={3}><Link  className='link' to={"/contact"}  >contact</Link></Grid.Col>
            <Grid.Col className='navigation-grid' span={3}>
                <Menu>
                    <Menu.Target >
                        <Button  style={{backgroundColor:'#FFFCF8'}}><p  style={{color:'black',backgroundColor:'#FFFCF8'}}> {data?.lastName} {data?.firstName} </p><IconUser  size={24} style={{backgroundColor:'#FFFCF8',color:'black'}}/></Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        { data === null  ?
                        <>
                            <Menu.Item icon={<IconArrowBarLeft size={14} />}><Link className='dropdow' to={"/loggin"}  >connection</Link></Menu.Item>
                            <Menu.Item icon={<IconAd2 size={14} />}><Link  className='dropdow'  to={"/register"}  >inscription</Link></Menu.Item>
                        </>
                        :  
                        <>
                            <Menu.Item icon={<IconEggs  size={14} />}><Link className='dropdow' to={"/profil"}  >profil</Link></Menu.Item> 
                            <Menu.Item icon={<IconUser   size={14} />}> <Link className='dropdow'  to={"/commande"}  >commande</Link></Menu.Item> 
                            <Menu.Item  icon={<IconArrowBarRight  size={14} />}> <Button onClick={handleLogout }>
                                    Se déconnecter
                                    </Button>
                            </Menu.Item> 
                        </>
                                                            
                        }
                    </Menu.Dropdown> 
                </Menu>
            </Grid.Col>
        </Grid>
              
        </>
    )
}

export default Navigation;