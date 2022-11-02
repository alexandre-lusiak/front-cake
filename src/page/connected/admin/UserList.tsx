
import React,{useEffect,useState} from 'react'
import userRequest from '../../../axios/user'
import useApi from '../../../hooks/useApi'
import { Table,Grid,TextInput,Button } from '@mantine/core';
import { IconZoomReset } from '@tabler/icons';
import ChartAdmin from '../../../components/Chart/Chart';
import Navigation from '../../../components/Navigation/Navigation';
const UserList= () => {

    const {data,request:requestGetUsers} = useApi(userRequest.getUsers)
    console.log(data);
    
    const [filter,setFilter] = useState({
        lastNameUser:"",
        phoneUser: "" ,
        emailUser: "",
        statut:"",
        city:""

    })

   

 useEffect(() => {
        requestGetUsers();
    }, []);

    const resetFilter= () => {
        setFilter({
            lastNameUser:"",
            phoneUser: "" ,
            emailUser: "",
            statut:"",
            city:""
        })
    }


    const FilterUser =  data?.data?.filter((user:any) => {
       
        
         return user?.lastName?.toLowerCase().includes(filter.lastNameUser.toLowerCase()) && 
                user?.phone?.includes(filter.phoneUser) &&
                user?.email?.toLowerCase().includes(filter.emailUser.toLowerCase()) &&
                user?.adress?.city?.toLowerCase().includes(filter.city.toLowerCase()) 
       })



    const rows = FilterUser?.map((user:any) => (
        <tr key={user?.id}>
          <td>{user?.lastName ?? '-'} {user?.firstName ?? '-' }</td>
          <td>{user?.email ?? '-' }</td>
          <td>{user?.phone ?? '-' }</td>
          <td>{user?.adress.adress1 ?? '-' }</td>
          <td>{user?.adress.adress2 ?? '-' }</td>
          <td>{user?.adress?.city ?? '-' }</td>
          <td>{user?.adress?.country ?? '-' }</td>
          <td>{user?.adress.postalCode ?? '-' }</td>
          <td>{new Intl.DateTimeFormat('fr-FR', { dateStyle: 'short' }).format( new Date(user?.registeredAt ?? new Date('1970-01-01')))} </td>
          <td>{user?.roles.includes('ROLE_ADMIN') ? 'Admin' : 'Client' }</td>
          <td> 
            {/* <Button style={{marginRight:'5px', backgroundColor:'white'}}  onClick={() => {setOpenedDeleteCategory(true); setCategoryId(category?.id)}}><IconTrash color='red' /></Button> 
            <Button style={{marginLeft:'5px', backgroundColor:'white'}} onClick={() =>{ setOpenededitCake(true) ; setCakeId(category?.id)}}><IconPencil color="green" /></Button> */}
          </td>
        </tr>
      ));
    return (
        <>
         <Navigation/>
        <h1>list client:</h1>
        <Grid>
            <Grid.Col sm={'auto'} span={1} mx='xl'>
                        <TextInput type="text" name='lastName' 
                                onChange={({target}) => setFilter({...filter , lastNameUser: target.value})}
                                placeholder='Nom Client'
                                value={filter.lastNameUser}
                            />
            </Grid.Col>
            <Grid.Col sm={'auto'} span={1} mx='xl'>
            <TextInput type="text" name='email' 
                    onChange={({target}) => setFilter({...filter , emailUser: target.value})}
                    placeholder='Email Client'
                    value={filter.emailUser}
                />
            </Grid.Col>

            <Grid.Col sm={'auto'} span={1} mx='xl'>
            <TextInput type="text" name='phone' 
                    onChange={({target}) => setFilter({...filter , phoneUser: target.value})}
                    placeholder='Téléphone Client'
                    value={filter.phoneUser}
                />
            </Grid.Col>
            <Grid.Col sm={'auto'} span={1} mx='xl'>
            <TextInput type="text" name='city' 
                    onChange={({target}) => setFilter({...filter , city: target.value})}
                    placeholder='Ville'
                    value={filter.city}
                />
            </Grid.Col>

            <Grid.Col sm={'auto'} span={1} mx='xl'>
            <Button onClick={resetFilter} ><IconZoomReset/></Button>
            </Grid.Col>

            
        </Grid>                   
                           
        <Grid>
            <Grid.Col sm={'auto'} span={8} mx='xl'>
        <Table className='table-user' withBorder={true} fontSize={15} highlightOnHover={true} style={{textAlign:'center'}} m='lg' verticalSpacing="xs"  horizontalSpacing="xs">
        <thead>
            <tr  style={{textAlign:'center'}}>
              <th  style={{textAlign:'center'}}>Nom</th>
              <th  style={{textAlign:'center'}}>Email</th>
              <th  style={{textAlign:'center'}}>Phone</th>
              <th  style={{textAlign:'center'}}>Adress1</th>
              <th  style={{textAlign:'center'}}>Adress2</th>
              <th  style={{textAlign:'center'}}>Ville</th>
              <th  style={{textAlign:'center'}}>Pays</th>
              <th  style={{textAlign:'center'}}>CP</th>
              <th  style={{textAlign:'center'}}>Date d'inscription</th>
              <th  style={{textAlign:'center'}}>Statut</th>
            </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      </Grid.Col>
      </Grid>  
      <ChartAdmin/></> 
      
      
    )
}

export default UserList;
