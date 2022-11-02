import React,{useState,useEffect} from 'react';
import CardCake from '../../components/Card/Card';
import useApi from '../../hooks/useApi';
import cakeRequest from '../../axios/cake';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../Footer/Footer';
import { IconZoomReset } from '@tabler/icons';
import {TextInput,Grid,Button,Select} from '@mantine/core';
import './Cakelist.css'
import categoryRequest from '../../axios/category';
import userRequest from '../../axios/user';
import useResize from '../../hooks/useSize';
const CakeList = () => {

const {data:dataCakes , request:requestCakes} = useApi(cakeRequest.getCakes)
const {data:dataCategories , request:requestCategories} = useApi(categoryRequest.getCategories)

const size = useResize();



const [filter,setFilter] = useState({
    cakeName:"",
    category: "" ,
})

  const resetFilter= () => {
  setFilter({
    cakeName:"",
    category: "" ,
  })
}

const FilterCake = dataCakes?.data?.filter((cake) => {
        return cake?.name?.toLowerCase().includes(filter.cakeName.toLowerCase()) &&
            cake?.category?.name?.toLowerCase().includes(filter.category.toLowerCase())
})



useEffect(() => {
    requestCakes()
    requestCategories()
}, []);


    return(
    <>   
    <Navigation/>
    <h1>Nos Fameux Gateaux</h1>
        <section>
        <p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et 
            la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie 
            depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux 
            de texte pour réaliser un livre spécimen de polices de texte. 
            Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, 
            sans que son contenu n'en soit modifié</p>
        <h3>Filtre</h3>
            <Grid>
            <Grid.Col xl={1} sm={'auto'} span={2} mx='lg'>
            <Button onClick={resetFilter} ><IconZoomReset/></Button>
            </Grid.Col> 
            <Grid.Col xl={1}  sm={'content'} mx='lg' span={4}>
                        <input  className='filter' type="text" name='Nom' 
                                onChange={({target}) => setFilter({...filter , cakeName: target.value})}
                                placeholder='Nom'
                                value={filter.cakeName}
                            />
            </Grid.Col>
            <Grid.Col xl={1} sm={'auto'} span={4} mx='lg'>
            <select className='filter' name="category"
                                onChange={({target}) => setFilter({...filter , category: target.value})}
                                placeholder='Category'
                                value={filter.category}
                            >
                                <option value="" disabled selected>Category</option>
                                { dataCategories?.data?.map((cat, key) => 
                                  cat.name !== 'snow'&& <option key={cat.id} value={cat.name}>{cat.name}</option>
                                )}
            </select>
            </Grid.Col>
        </Grid>  
        <div className='section-cake'> 
            { FilterCake?.length > 0 ? FilterCake?.map((cake) => { 
           return  cake.isActif && cake.category.name !== "snow" &&  <CardCake className='card-cake' data={cake}></CardCake> 
                           
                    
    }) : <div style={{marginBottom:'500px'}}> Aucun Produit pour cette categorie</div>}</div>   </section>  
    <Footer></Footer>
    </>
    )
}

export default CakeList;