
import React,{useState,useEffect} from 'react';
import { TextInput, Checkbox, Button, Group, Box ,Select,Table,Modal,useMantineTheme, Text ,FileInput,Grid  } from '@mantine/core';
import { useForm } from '@mantine/form';
import useApi from '../../../hooks/useApi';
import categoryRequest from '../../../axios/category';
import cakeRequest from '../../../axios/cake';
import { showNotification } from '@mantine/notifications';
import NavigationAdmin from '../../../components/Navigation/NavigationAdmin';
import Footer from '../../../Footer/Footer';
import { Link } from 'react-router-dom';
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import './AdminPage.css'
import { IconTrash,IconPencil,IconUpload, IconPhoto, IconX  } from '@tabler/icons';
import { IconZoomReset } from '@tabler/icons';
import { calculateNewValue } from '@testing-library/user-event/dist/utils';
import { MdUploadFile } from "react-icons/md";
import fileRequest from '../../../axios/file';


const CakePage = () => {
const theme = useMantineTheme();
const {data:dataCakes, request:requestGetAllCake} = useApi(cakeRequest.getCakes)
const {request:requestDeleteCake} = useApi(cakeRequest.deleteCake)
const {request:requestPostCake  } = useApi(cakeRequest.createCake); 
const {request:requestPutCake } = useApi(cakeRequest.edit);
const {data:dataCategories , request:requestCategories} = useApi(categoryRequest.getCategories)
const {request:requestDeleteCategory} = useApi(categoryRequest.deleteCategory)
const {request:requestPostCategory  } = useApi(categoryRequest.create);
const [categories, setCategories] = useState<any>();
const [categorySelected, setCategorySelected] = useState<number>(0);
const [cakes, setCakes] = useState<any>();
const [opened, setOpened] = useState<boolean>(false);
const [openedCategory, setOpenedCategory] = useState<boolean>(false);
const [openededitCake, setOpenededitCake] = useState<boolean>(false);
const [cakeId, setCakeId] = useState<number>();
const [cakeEdit, setCakeEdit] = useState<any>();
const[categoryName,setCategoryName] = useState<String>('');
const {request:requestUpload} = useApi(cakeRequest.uploadfile)
const [openedDelete, setOpenedDelete] = useState<boolean>(false);
const [openedDeleteCategory, setOpenedDeleteCategory] = useState<boolean>(false);
const [categoryId, setCategoryId] = useState<number>();
const [checked, setChecked] = useState<boolean>(false);
const [file, setFile] = useState();
const [iconColor, setIconColor] = useState();

const {data:dataUpload,request:requestUploadFile} = useApi(cakeRequest.postFile);
const [filter,setFilter] = useState({
  nameCake:"",
  category: "" ,
  Actif: true,

})
const [filterCat,setFilterCat] = useState({
  nameCat:"",
})

const resetFilterCat= () => {
  setFilterCat({
    nameCat:""
   
  })
}

const resetFilter= () => {
  setFilter({
    nameCake:"",
    category: "" ,
    Actif: true,

  })
}

const FilterCat =  dataCategories?.data?.filter((cat:any) => {
  
  return cat?.name?.toLowerCase().includes(filterCat.nameCat.toLowerCase())
  

})

const FilterCake =  dataCakes?.data?.filter((cake:any) => {
  
    return cake?.name?.toLowerCase().includes(filter.nameCake.toLowerCase())&& 
    cake?.category.name?.includes(filter.category)  &&
    cake.isActif === filter.Actif

})


// const handleSubmitProdemial = (arrValues: any) => {
//   console.log(arrValues);
  
//   if (arrValues.length > 0) {
//     const data = new FormData();
//     // @ts-ignore
//     data.append("file", arrValues[0]);

//     console.log('FILE',data);
    
//     const headers = {
//       "Content-Type": "multipart/form-data",
//   };
//   reuestUploadFile(data);
//   }
// };

console.log(cakeId);

const onSelectFile = (e : React.ChangeEvent<HTMLInputElement>) => {
  const { target } = e
  console.log(e);
  
  let file = new FormData();
  
  if(!target.files) throw new Error("No file find in the input")
  console.log(target.files[0]);
  file.append("files", target.files[0]);
  console.log('IDDDD',cakeId);
  
  requestUploadFile(cakeId,{file});
}

useEffect(() => {
 
  
}, [cakeId]);

useEffect(() => {
  requestCategories().then((value) => {
   setCategories( value?.data?.data?.map((category:any) => {
    setCategoryName(category.id.toString())
      return {
        label:category?.name,
        value:category?.id
      }
    })
   )
})}, []);




const CategoryIdConversion = (CategoryId: string) => {
  
  
  setCategoryName(CategoryId);
  categories?.find((name:any) => {
    
    //@ts-ignore
    if (name.value === CategoryId) {
      // console.log('NAME',name);
      // console.log('CAAA',CategoryId);
      //@ts-ignore
      form.setFieldValue("category", name.label);
    }
  });
};
const form = useForm({
    initialValues: {
        name:"" , 
        category: 0, 
        priceTTC: 0 , 
        nbPerson: 0 , 
        weight: 0,
        file: [],
        isActif:false
    },
    validate: {
      name: (value) => (value === "" ? 'on a oublié son petit Nom ?' : null),
      category: (value) => ( value === 0 ? 'il lui faut une catégory maMEn' : null ),
      priceTTC: (value) => ( value === 0 ? "c'est gratuit ?" : null ),
      nbPerson: (value) => ( value === 0 ? "Au moin une personnes non ?" : null ),
      weight: (value) => ( value === 0 ? "on a oublié la petite pesée ?" : null ),
    },
  }
)

const handleDeleteCake = () => {
  
  
    requestDeleteCake(cakeId).then((res) => {
      if(res.status === 200) {
        showNotification({
          title: 'SUCESS !!!',
          message: `Aurevoir gateaux ${res.data.data.name}`,
          color: 'green',
      
        })
        setOpenedDelete(false)
      }
    }).catch((err) => {
      showNotification({
        title: 'Error !!!',
        message: 'suppresion échoué',
        color: 'red',
    
      })}
    )
}

const handleDeleteCategory = () => {
  
  
  requestDeleteCategory(categoryId).then((res) => {
    if(res.status === 200) {
      showNotification({
        title: 'SUCESS !!!',
        message: `Aurevoir gateaux ${res.data.data.name}`,
        color: 'green',
    
      })
      setOpenedDelete(false)
    }
  }).catch((err) => {
    showNotification({
      title: 'Error !!!',
      message: 'suppresion échoué',
      color: 'red',
  
    })}
  )
}
console.log('VALUES',form.values.file);


const handleSubmit = (values:any) => {

    requestPostCake(values)

    .then((res) => {
      
      if(res.status === 200) {
        showNotification({
          title: 'SUCESS !!!',
          message: 'Gateaux créée',
          color: 'green',
      
        })
        
        // let formData = new FormData()
        // // let fileUpload= formData.append('file',file)
        // console.log('FILE',fileUpload);
        
        // requestUpload(res?.data?.data?.id,fileUpload);
        // setOpened(false)
      }
    }).catch((err) => {
      showNotification({
        title: 'Error !!!',
        message: 'Création échoué',
        color: 'red',
    
      })
    }
    )
}

const formCategory = useForm({
  initialValues: {
      name:"" , 
      description: "", 
  },
  validate: {
    name: (value) => (value === "" ? 'champs obligatoire' : null),
    description: (value) => (value === "" ? 'champs obligatoire' : null),
  },
}
)

const handleSubmitCategory = (values:any) => {  
  requestPostCategory(values)
    .then((res) => {
      if(res.status === 200) {
        showNotification({
          title: 'SUCESS !!!',
          message: 'category créée',
          color: 'green',
      
        })
        setOpenedCategory(false)
      }
    }).catch((err) => {
      showNotification({
        title: 'Error !!!',
        message: 'Création échoué',
        color: 'red',
    
      })}
    )
}

useEffect(() => {
   requestGetAllCake().then((res) =>{
    setCakes(res?.data?.data)  
   });
}, []);

useEffect(() => {
  cakes?.filter((w:any) => {
   if(w.id ===cakeId){
  
    setCakeEdit(w)  
    return formEditCake.setValues({
        name:w?.name ?? '-',
        nbPerson:w?.nbPerson ?? 0,
        weight: w?.weight ?? 0,
        priceTTC: w?.priceTTC ?? 0,
        category: w?.category?.id ?? 0,
        id: w.id ?? 0,
        isActif : w.isActif

    })
   }
  })
    
}, [cakes,cakeId])

const rows = FilterCake?.map((cake:any) => (
  <tr key={cake?.id}>
    <td>{cake?.name ?? '-'}</td>
    <td>{cake?.category?.name ?? '-' }</td>
    <td>{cake?.priceTTC ?? 0}</td>
    <td>{cake?.weight ?? 0}</td>
    <td>{cake?.nbPerson ?? 0}</td>
    <td>{cake?.isActif ? 'Actif' : "Inactif" }</td>
    <td> 
      <Button style={{marginRight:'5px', backgroundColor:'white'}}  onClick={() => {setOpenedDelete(true); setCakeId(cake?.id)}}><IconTrash color='red' /></Button> 
      <Button style={{marginLeft:'5px', backgroundColor:'white'}} onClick={() =>{ setOpenededitCake(true) ; setCakeId(cake?.id)}}><IconPencil color="green" /></Button>
    </td>
  </tr>
));

const rowsCat = FilterCat?.map((category:any) => (
  <tr key={category?.id}>
    <td>{category?.name ?? '-'}</td>
    <td>{category?.description?? '-' }</td>
    <td> 
      <Button style={{marginRight:'5px', backgroundColor:'white'}}  onClick={() => {setOpenedDeleteCategory(true); setCategoryId(category?.id)}}><IconTrash color='red' /></Button> 
      <Button style={{marginLeft:'5px', backgroundColor:'white'}} onClick={() =>{ setOpenededitCake(true) ; setCakeId(category?.id)}}><IconPencil color="green" /></Button>
    </td>
  </tr>
));

const formEditCake = useForm({
  initialValues: {
      name:"" , 
      category: 0, 
      priceTTC: 0 , 
      nbPerson: 0 , 
      weight: 0,
      id:0,
      category_id:0,
      isActif:false
  },
  validate: {
    name: (value) => (value === "" ? 'on a oublié son petit Nom ?' : null),
    category: (value) => ( value === 0 ? 'il lui faut une catégory maMEn' : null ),
    priceTTC: (value) => ( value === 0 ? "c'est gratuit ?" : null ),
    nbPerson: (value) => ( value === 0 ? "Au moin une personnes non ?" : null ),
    weight: (value) => ( value === 0 ? "on a oublié la petite pesée ?" : null ),
  },
}
)

const handleSubmitEditCake = (values:any) => {
  console.log(values);
  console.log(cakeId);
  
  requestPutCake(cakeId,values)
  .then((res) => {
    if(res.status === 200) {
      showNotification({
        title: 'SUCESS !!!',
        message: 'Gateaux Modifié',
        color: 'green',
    
      })
      setOpenededitCake(false)
      window.location.reload();
    }
  }).catch((err) => {
    showNotification({
      title: 'Error !!!',
      message: 'modification échoué',
      color: 'red',
  
    })
  }
  )
}


function UpdateFile(value: []) {
  form.setFieldValue("file", value);
  // seticonColor("green");
}


function RejectFile(value: []) {
  console.log("Erreur le fichier n'a pas pu s'upload : ", value);
  // seticonColor("red");
  
}
    return (


  <>      
  <NavigationAdmin></NavigationAdmin>
  <h1>Creation de gateaux et de catégory</h1>
      <Group position="center">
      <Button onClick={() => setOpened(true)}>Ajouter un  Gateaux</Button>
      <Button onClick={() => setOpenedCategory(true)}> Ajouter une Category</Button>
    </Group>
    <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Modifier Profile"
        size={'lg'}
      >

          <Box mx={'lg'} sx={{ maxWidth:500 }} style={{border:'1px solid black',padding:'25px',borderRadius:'15%'}} >
            <legend>Nouveau Gateaux</legend>
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
              <TextInput
              
              withAsterisk
              label="Nom"
              placeholder="Nom"
              {...form.getInputProps('name')}
              />

          <Select
            required
            label="categories"
            placeholder="categories"
            data={categories ?? []}
            
            onChange={(value: string) =>
              form.setFieldValue('category',parseInt(value))
            }
          />

              <TextInput
              required
              withAsterisk
              label="priceTTC"
              placeholder="priceTTC"
              {...form.getInputProps('priceTTC')}
              />

              <TextInput
              required
              type={'number'}
              withAsterisk
              label="nbPerson"
              placeholder="nbPerson"
              {...form.getInputProps('nbPerson')}
              />

            <TextInput
              required
              withAsterisk
              label="Poids"
              placeholder="Poids"
              {...form.getInputProps('weight')}
              />
    
          <input  id={'file'} className="input-file-hide" type="file" onChange={onSelectFile} name={'file'} />

            <Checkbox label='Actif'   {...form.getInputProps('isActif')} />
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </Modal>
    <Modal
      opened={openedCategory}
      onClose={() => setOpenedCategory(false)}
      title="Modifier Gateaux"
      size={'lg'}
    >
      <Box mx={'xl'} sx={{ maxWidth: 500 ,maxHeight:200}} style={{border:'1px solid black',padding:'25px',borderRadius:'15%'}} >
        <legend>Nouvelle Categorie</legend>
        <form onSubmit={formCategory.onSubmit((values) => handleSubmitCategory(values))}>
            <TextInput
            withAsterisk
            label="Nom"
            placeholder="Nom"
            {...formCategory.getInputProps('name')}
            />

            <TextInput
          
            withAsterisk
            label="description"
            placeholder="description"
            {...formCategory.getInputProps('description')}
            />


        <Group position="right" mt="md">
          <Button type="submit">Valider</Button>
        </Group>
        </form>
      </Box>
    </Modal> 
            {/* SECTION TABLE  */}
    <section className='table-container'>
    <h1>Section  Gateaux cateogry</h1>   
    <Grid gutter="xl" >
    <Grid.Col mx={'auto'} span={5}>
    <Grid mb={"xl"}>
            <Grid.Col sm={'content'} span={1} mx='xs'>
                        <TextInput type="text" name='nameCake' 
                                onChange={({target}) => setFilter({...filter , nameCake: target.value})}
                                placeholder='Nom'
                                value={filter.nameCake}
                            />
            </Grid.Col>
            <Grid.Col sm={'content'} span={1} mx='xs'>
            <TextInput type="text" name='category' 
                    onChange={({target}) => setFilter({...filter , category: target.value})}
                    placeholder='categorie'
                    value={filter.category}
                />
            </Grid.Col>

            <Grid.Col sm={'content'} span={1} mx='xl'>
            <Checkbox  name='Actif'  label="Actif"
                    onChange={({target}) => setFilter({...filter , Actif: target.checked})}
                   
                    checked={filter.Actif}
                />
            </Grid.Col>

            <Grid.Col sm={'auto'} span={1} mx='xl'>
            <Button onClick={resetFilter} ><IconZoomReset/></Button>
            </Grid.Col>

            
        </Grid>                   
      <Table   withBorder={true} fontSize={15} highlightOnHover={true} style={{textAlign:'center'}} verticalSpacing="xs"  horizontalSpacing="xl">
        <thead>
            <tr  style={{textAlign:'center'}}>
              <th  style={{textAlign:'center'}}>Nom</th>
              <th  style={{textAlign:'center'}}>category</th>
              <th  style={{textAlign:'center'}}>price</th>
              <th  style={{textAlign:'center'}}>Poids</th>
              <th  style={{textAlign:'center'}}>NB Personnes</th>
              <th  style={{textAlign:'center'}}>Actif</th>
              <th  style={{textAlign:'center'}}>action</th>
            </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table> 
    </Grid.Col>
    <Grid.Col  span={5}>
    <Grid>
            <Grid.Col sm={'content'} span={1} mx='xl' mb={"xl"}>
                        <TextInput type="text" name='nameCat' 
                                onChange={({target}) => setFilterCat({...filterCat , nameCat: target.value})}
                                placeholder='Nom'
                                value={filterCat.nameCat}
                            />
            </Grid.Col>
            <Grid.Col sm={'auto'} span={1} mx='xl'>
            <Button onClick={resetFilterCat} ><IconZoomReset/></Button>
            </Grid.Col>
      </Grid>
      <Table    withBorder={true} fontSize={15} highlightOnHover={true} style={{textAlign:'center'}} verticalSpacing="xs"  horizontalSpacing="xl">
      <thead>
          <tr  style={{textAlign:'center'}}>
            <th  style={{textAlign:'center'}}>Nom</th>
            <th  style={{textAlign:'center'}}>description</th>
            <th  style={{textAlign:'center'}}>action</th>
          </tr>
      </thead>
      <tbody>{rowsCat}</tbody>
    </Table>    
      
    </Grid.Col>
      </Grid>
     


    <Modal onClose={() => setOpenedDeleteCategory(false)} opened={openedDeleteCategory} size="auto" title="Suppression du Produit">
        <Text>voulez-vous vraiment supprimer cette category , ne soyez pas trop hatif jeune ... ? :/ Attention toutes suppressions est irrévocable </Text>

        <Group mt="xl">
          <Button variant="outline" onClick={handleDeleteCategory}>
            oui
          </Button>
          <Button variant="outline" onClick={() => setOpenedDeleteCategory(false)}>
            Non
          </Button>
        </Group>
      </Modal>       

    <Modal onClose={() => setOpenedDelete(false)} opened={openedDelete} size="auto" title="Suppression du Produit">
        <Text>voulez-vous vraiment supprimer ce mets délicieux  , ne soyez pas trop hatif jeune ... ? :/ Attention toutes suppressions est irrévocable </Text>

        <Group mt="xl">
          <Button variant="outline" onClick={handleDeleteCake}>
            oui
          </Button>
          <Button variant="outline" onClick={() => setOpenedDelete(false)}>
            Non
          </Button>
        </Group>
      </Modal>

    <Modal
        opened={openededitCake}
        onClose={() => setOpenededitCake(false)}
        title="Modifier Profile"
        size={'lg'}
      >

          <Box mx={'lg'} sx={{ maxWidth:500 }} style={{border:'1px solid black',padding:'25px',borderRadius:'15%'}} >
            <legend>Nouveau Gateaux</legend>
          <form onSubmit={formEditCake.onSubmit((values) =>handleSubmitEditCake(values))}>
              <TextInput
              
              withAsterisk
              label="Nom"
              placeholder="Nom"
              {...formEditCake.getInputProps('name')}
              />

          <Select
            required
            label="categories"
            placeholder="categories"
            
            data={categories ?? []}
            value={categoryName}
            onChange={(value: string) => CategoryIdConversion(value)}
            {...formEditCake.getInputProps('category')}
          />

              <TextInput
              required
              withAsterisk
              label="priceTTC"
              placeholder="priceTTC"
              {...formEditCake.getInputProps('priceTTC')}
              />

              <TextInput
              required
              type={'number'}
              withAsterisk
              label="nbPerson"
              placeholder="nbPerson"
              {...formEditCake.getInputProps('nbPerson')}
              />

            <TextInput
              required
              withAsterisk
              label="Poids"
              placeholder="Poids"
              {...formEditCake.getInputProps('weight')}
              />

              <Checkbox 
                label='Actif' 
                checked={formEditCake.values.isActif}  
                onChange={(event) =>formEditCake.setFieldValue("isActif",event.currentTarget.checked,)}  
                // {...form.getInputProps('isActif')} 
                />
          

          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </Modal>     
    </section>           

    <Footer></Footer>
</>
    )
}

export default CakePage;