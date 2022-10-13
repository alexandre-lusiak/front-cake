import * as react from 'react';
import { Link } from 'react-router-dom';
import { Menu, Button, Text , Grid } from '@mantine/core';
import { IconUser, IconArrowBarRight, IconArrowBarLeft ,IconAd2,IconEggs } from '@tabler/icons';
const Navigation = () => {

const [user, setUser] = react.useState(true);

    return ( 
        <>
      
                <Grid style={{textAlign:'center', backgroundColor:'black', color:'white'}}>
                    <Grid.Col span={3}><Link  to={"/"}  >Home</Link></Grid.Col>
                    <Grid.Col span={3}><Link  to={"/cakes"}  >Vos Gateaux Favoris</Link></Grid.Col>
                    <Grid.Col span={3}><Link  to={"/contact"}  >contact</Link></Grid.Col>
                    <Grid.Col span={3}>
                        <Menu>
                            <Menu.Target>
                                <Button style={{backgroundColor:'black'}}><IconUser size={24} style={{backgroundColor:'black',color:'white'}}/></Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                               { user != true ?   
                               <>
                                    <Menu.Item icon={<IconArrowBarLeft size={14} />}><Link  to={"/contact"}  >connection</Link></Menu.Item>
                                    <Menu.Item icon={<IconAd2 size={14} />}><Link  to={"/contact"}  >inscription</Link></Menu.Item>
                                </>
                                :
                                <>
                                    <Menu.Item icon={<IconEggs  size={14} />}><Link  to={"/profil"}  >profil</Link></Menu.Item> 
                                    <Menu.Item icon={<IconUser   size={14} />}> <Link  to={"/commande"}  >commande</Link></Menu.Item> 
                                    <Menu.Item icon={<IconArrowBarRight  size={14} />}><Link  to={"/contact"}  >profil</Link></Menu.Item> 
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