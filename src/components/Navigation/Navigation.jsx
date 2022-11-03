import react, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Button, Text, Grid, Burger } from '@mantine/core';
import { IconUser, IconArrowBarRight, IconArrowBarLeft, IconAd2, IconEggs , IconCake,IconAddressBook ,IconChefHat } from '@tabler/icons';
import useApi from '../../hooks/useApi';
import userRequest from '../../axios/user';
import useAuth from '../../Authentification/useAuth';
import './Navigation.css'
import useResize from '../../hooks/useSize';
const Navigation = () => {

    const { logout, isAuthenticated } = useAuth();
    const { data, request: requestGetCurrentUser } = useApi(userRequest.currentUser);
    let size = useResize()
    const [user, setUser] = useState({});
    let navigate = useNavigate();

    useEffect(() => {
        requestGetCurrentUser()
    }, []);

    useEffect(() => {
        setUser(data);
    }, [user,size]);


    const handleLogout = () => {
        logout();
        navigate('/')
        window.location.reload()
    }

const [sizeW, setSizeW] = useState(1000);

console.log('size',size.width);
console.log(window.innerHeight);
    return (
        <>
            {
              size.width === 0 ? size.width = window.innerWidth :  size.width < 760 ? <>
                    <div className="nav-mobile">
                        <div className='container-navigation'>
                            <Menu>
                                <Menu.Target>
                                    <Button  className='button-nav-mobile'>Navigation</Button>
                                </Menu.Target>

                                <Menu.Dropdown className='dropdown-menu'>
                                <Menu.Item icon={<IconEggs size={15} />}><Link className='menu-item' to={"/"}  >Home</Link></Menu.Item>
                                <Menu.Item icon={<IconCake size={15} />}><Link className='menu-item' to={"/cakes"}  >Cake</Link></Menu.Item>
                                <Menu.Item icon={<IconAddressBook size={15} />}><Link className='menu-item' to={"/contact"}  >Contact</Link></Menu.Item>
                                <Menu.Item icon={<IconChefHat size={15} />}><Link className='menu-item' to={"/about"}  >Nous</Link></Menu.Item>
                                <Menu.Item icon={<IconChefHat size={15} />}><Link className='menu-item' to={"/engagement"}  >Action</Link></Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </div>
                        <div className='container-navigation'>
                            <Menu>
                                <Menu.Target >
                                    <Button className='button-nav' style={{ backgroundColor: '#FFFCF8' }}><p style={{ color: 'black', backgroundColor: '#FFFCF8' }}> {data?.lastName} {data?.firstName} </p><IconUser size={24} style={{ backgroundColor: '#FFFCF8', color: 'black' }} /></Button>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    {!isAuthenticated() ?
                                        <>
                                            <Menu.Item icon={<IconArrowBarLeft size={14} />}><Link  className='menu-item' to={"/loggin"}  >connection</Link></Menu.Item>
                                            <Menu.Item icon={<IconAd2 size={14} />}><Link  className='menu-item' to={"/register"}  >inscription</Link></Menu.Item>
                                        </>
                                        :
                                        <>
                                            <Menu.Item icon={<IconEggs size={14} />}><Link c className='menu-item'to={"/profil"}  >profil</Link></Menu.Item>
                                            <Menu.Item icon={<IconUser size={14} />}> <Link  className='menu-item' to={"/commande"}  >commande</Link></Menu.Item>
                                            <Menu.Item icon={<IconArrowBarRight size={14} />}> <Button className='btn-crud' onClick={handleLogout}>
                                                Se déconnecter
                                            </Button>
                                            </Menu.Item>
                                        </>

                                    }
                                </Menu.Dropdown>
                            </Menu>
                        </div>
                    </div>
                </>
                    :

                    <div className='container-navigation'>
                        <Link className='link' to={"/"}  >Home</Link>
                        <Link className='link' to={"/cakes"}>Vos Gateaux</Link>
                        <Link className='link' to={"/about"}  >Qui Somme Nous?</Link>
                        <Link className='link' to={"/contact"}  >contact</Link>
                        <Link className='link' to={"/engagement"}  >Engagement</Link>
                        {
                            isAuthenticated && data?.roles?.includes('ROLE_ADMIN') &&
                            <Link className='link' to={"/admin"}  >Admin</Link>
                        }

                        <Menu>
                            <Menu.Target >
                                <Button className='button-nav' style={{ backgroundColor: '#FFFCF8' }}><p style={{ color: 'black', backgroundColor: '#FFFCF8' }}> {data?.lastName} {data?.firstName} </p><IconUser size={24} style={{ backgroundColor: '#FFFCF8', color: 'black' }} /></Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                                {!isAuthenticated() ?
                                    <>
                                        <Menu.Item icon={<IconArrowBarLeft size={14} />}><Link className='dropdow' to={"/loggin"}>Connection</Link></Menu.Item>
                                        <Menu.Item icon={<IconAd2 size={14} />}><Link className='dropdow' to={"/register"}>Inscription</Link></Menu.Item>
                                    </>
                                    :
                                    <>
                                        <Menu.Item icon={<IconEggs size={14} />}><Link className='dropdow' to={"/profil"}  >profil</Link></Menu.Item>
                                        <Menu.Item icon={<IconUser size={14} />}> <Link className='dropdow' to={"/commande"}  >commande</Link></Menu.Item>
                                        <Menu.Item icon={<IconArrowBarRight size={14} />}> <Button className='btn-crud' onClick={handleLogout}>
                                            Se déconnecter
                                        </Button>
                                        </Menu.Item>
                                    </>

                                }
                            </Menu.Dropdown>
                        </Menu>

                    </div>
            }


        </>
    )
}

export default Navigation;