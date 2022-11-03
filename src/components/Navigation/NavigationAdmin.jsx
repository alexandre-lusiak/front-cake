import { Menu, Button, Text, Grid } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import useResize from '../../hooks/useSize';
import './NavigationAdmin.css'
import { IconUser, IconArrowBarRight, IconArrowBarLeft, IconAd2, IconEggs, IconCake, IconAddressBook, IconChefHat,IconMessages  } from '@tabler/icons';
import useAuth from '../../Authentification/useAuth';
const NavigationAdmin = () => {
    const{logout} = useAuth()
    let size = useResize();
    let navigate = useNavigate()
    const handleLogout = () => {
        logout();
        navigate('/')
    }
    return (
        <>
            {size.width === 0 ? size.width = window.innerWidth : size.width < 760 ? <>
                <div className="nav-mobile">
                    <div className='container-navigation'>
                        <Menu size={"xl"}>
                            <Menu.Target>
                                <Button className='button-nav-mobile'>Navigation</Button>
                            </Menu.Target>

                            <Menu.Dropdown className='dropdown-menu'>
                                <Menu.Item icon={<IconEggs size={20} />}><Link className='link' to={"/admin"}  >Admin</Link></Menu.Item>
                                <Menu.Item icon={<IconCake size={20} />}><Link className='link' to={"/admin/cake"}  >Gateaux</Link></Menu.Item>
                                <Menu.Item icon={<IconMessages size={20} />}><Link className='link' to={"/admin/comment"}  >commentaire</Link></Menu.Item>
                                <Menu.Item icon={<IconMessages size={20} />}><Link className='link' to={"/admin/receipt"}  >Recette</Link></Menu.Item>
                                <Menu.Item icon={<IconChefHat size={20} />}><Link className='link' to={"/"}  >Site</Link></Menu.Item>
                                <Menu.Item icon={<IconArrowBarRight size={20} />}><Button className='btn-crud' onClick={handleLogout}>Se déconnecter</Button></Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </div>
                </div>
            </>
                :

                <div className='container-navigation admin' >
                    <Link className='link' to={"/admin"}  >Espace Admin</Link>
                    <Link className='link' to={"/admin/cake"}  >Espace Gateaux</Link>
                    <Link className='link' to={"/admin/comment"}  >Espce commentaire</Link>
                    <Link className='link' to={"/admin/receipt"}  >Recettes</Link>
                    <Link className='link' to={"/"}  >Site</Link>
                    <Button className='btn-crud' onClick={handleLogout}>Se déconnecter</Button>
                  

                </div>
            }
        </>
    )
}

export default NavigationAdmin; 