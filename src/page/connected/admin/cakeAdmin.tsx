
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextInput, Checkbox, Button, Group, Box, Select, Table, Modal, useMantineTheme, Text, FileButton, FileInput, Grid, Image } from '@mantine/core';
import { useForm } from '@mantine/form';
import useApi from '../../../hooks/useApi';
import categoryRequest from '../../../axios/category';
import cakeRequest from '../../../axios/cake';
import { showNotification } from '@mantine/notifications';
import NavigationAdmin from '../../../components/Navigation/NavigationAdmin';
import Footer from '../../../Footer/Footer';
import { IconTrash, IconPencil, IconUpload, IconPhoto, IconX } from '@tabler/icons';
import { IconZoomReset } from '@tabler/icons';
import { URL_API, URL_API_FILES } from '../../../const/URL_API'

import './AdminPage.css'
import FooterAdmin from '../../../Footer/FooterAdmin';

const CakePage = () => {
  const theme = useMantineTheme();
  const { data: dataCakes, request: requestGetAllCake } = useApi(cakeRequest.getCakes)
  const { request: requestDeleteCake } = useApi(cakeRequest.deleteCake)
  const { request: requestPostCake } = useApi(cakeRequest.createCake);
  const { request: requestPutCake } = useApi(cakeRequest.edit);
  const [cakes, setCakes] = useState<any>();
  const [opened, setOpened] = useState<boolean>(false);
  const [cakeId, setCakeId] = useState<number>();
  const [cakeEdit, setCakeEdit] = useState<any>();
  const [openededitCake, setOpenededitCake] = useState<boolean>(false);
  const [openedDelete, setOpenedDelete] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = React.useState(null);


  const { data: dataCategories, request: requestCategories } = useApi(categoryRequest.getCategories)
  const {  request: requestCategoriesEdit } = useApi(categoryRequest.edit)
  const { request: requestDeleteCategory } = useApi(categoryRequest.deleteCategory)
  const { request: requestPostCategory } = useApi(categoryRequest.create);
  const [categories, setCategories] = useState<any>();
  const [category, setCategory] = useState();
  const [openedDeleteCategory, setOpenedDeleteCategory] = useState<boolean>(false);
  const [openedEditCategory, setOpenedEditCategory] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number>();
  const [openedCategory, setOpenedCategory] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<String>('');


  const [checked, setChecked] = useState<boolean>(false);
  const [img, setImg] = useState<any>('');


  const { data: dataUpload, request: requestUploadFile } = useApi(cakeRequest.postFile);
  const [filter, setFilter] = useState({
    nameCake: "",
    category: "",
    Actif: true,

  })
  const [filterCat, setFilterCat] = useState({
    nameCat: "",
  })

  const resetFilterCat = () => {
    setFilterCat({
      nameCat: ""

    })
  }

  const resetFilter = () => {
    setFilter({
      nameCake: "",
      category: "",
      Actif: true,

    })
  }

  const FilterCat = dataCategories?.data?.filter((cat: any) => {
    return cat?.name?.toLowerCase().includes(filterCat.nameCat.toLowerCase())
  })

  const FilterCake = dataCakes?.data?.filter((cake: any) => {
    return cake?.name?.toLowerCase().includes(filter.nameCake.toLowerCase()) &&
      cake?.category.name?.includes(filter.category) &&
      cake.isActif === filter.Actif
  })


  useEffect(() => {

  }, [cakeId]);

  useEffect(() => {
    requestCategories().then((value) => {
      setCategories(value?.data?.data?.map((category: any) => {
        setCategoryName(category.id.toString())
        return {
          label: category?.name,
          value: category?.id,
        }
      })
      )
    })
  }, []);

  const CategoryIdConversion = (CategoryId: string) => {
    setCategoryName(CategoryId);
    categories?.find((name: any) => {
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
      name: "",
      category: 0,
      priceTTC: 0,
      nbPerson: 0,
      weight: 0,
      file: null,
      isActif: false
    },
    validate: {
      name: (value) => (value === "" ? 'on a oublié son petit Nom ?' : null),
      category: (value) => (value === 0 ? 'il lui faut une catégory maMEn' : null),
      priceTTC: (value) => (value === 0 ? "c'est gratuit ?" : null),
      nbPerson: (value) => (value === 0 ? "Au moin une personnes non ?" : null),
      weight: (value) => (value === 0 ? "on a oublié la petite pesée ?" : null),

    },
  }
  )


  const handleDeleteCake = () => {


    requestDeleteCake(cakeId).then((res) => {
      if (res.status === 200) {
        showNotification({
          title: 'SUCESS !!!',
          message: `Aurevoir gateaux ${res.data.data.name}`,
          color: 'green',

        })
        requestGetAllCake()
        setOpenedDelete(false)
      }
    }).catch((err) => {
      showNotification({
        title: 'Error !!!',
        message: 'suppresion échoué',
        color: 'red',

      })
    }
    )
  }

  const handleDeleteCategory = () => {
    requestDeleteCategory(categoryId).then((res) => {
      if (res.status === 200) {
        showNotification({
          title: 'SUCESS !!!',
          message: `Aurevoir gateaux ${res.data.data.name}`,
          color: 'green',

        })
        requestCategories()
        setOpenedDeleteCategory(false)
      }
    }).catch((err) => {
      showNotification({
        title: 'Error !!!',
        message: 'suppresion échoué',
        color: 'red',

      })
    }
    )
  }

  const handleSubmit = (values: any) => {

    requestPostCake(values)

      .then((res) => {

        if (res.status === 200) {
          showNotification({
            title: 'SUCESS !!!',
            message: 'Gateaux créée',
            color: 'green',

          })

          // let formData = new FormData()
          // // let fileUpload= formData.append('file',file)
          // console.log('FILE',fileUpload);

          // requestUpload(res?.data?.data?.id,fileUpload);
          setOpened(false)
          requestGetAllCake();
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
      name: "",
      description: "",
    },
    validate: {
      name: (value) => (value === "" ? 'champs obligatoire' : null),
      description: (value) => (value === "" ? 'champs obligatoire' : null),
    },
  }
  )

  const formCategoryEdit = useForm({
    initialValues: {
      name: "",
      description: "",
    },
    validate: {
      name: (value) => (value === "" ? 'champs obligatoire' : null),
      description: (value) => (value === "" ? 'champs obligatoire' : null),
    },
  }
  )
  console.log(formCategoryEdit.values);

  const handleSubmitCategoryEdit = (values: any) => {
    requestCategoriesEdit(categoryId,values)
      .then((res) => {
        if (res.status === 200) {
          showNotification({
            title: 'SUCESS !!!',
            message: 'category créée',
            color: 'green',

          })
          requestCategories()
          setOpenedEditCategory(false)
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

  const handleSubmitCategory = (values: any) => {
    requestPostCategory(values)
      .then((res) => {
        if (res.status === 200) {
          showNotification({
            title: 'SUCESS !!!',
            message: 'category créée',
            color: 'green',

          })
          setOpenedCategory(false)
          requestCategories()
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

  useEffect(() => {
    requestGetAllCake().then((res) => {
      setCakes(res?.data?.data)
    });
  }, []);

  useEffect(() => {
    requestCategories().then((res) => {
      setCategory(res?.data?.data)
    });
  }, []);

  useEffect(() => {
    cakes?.filter((w: any) => {
      if (w.id === cakeId) {
        console.log(w);
        
        setCakeEdit(w)
        return formEditCake.setValues({
          name: w?.name ?? '-',
          nbPerson: w?.nbPerson ?? 0,
          weight: w?.weight ?? 0,
          priceTTC: w?.priceTTC ?? 0,
          category: w?.category?.id ?? 0,
          id: w.id ?? 0,
          isActif: w.isActif,
          file:w.file.id

        })
      }
    })

  }, [cakes, cakeId])
  
  const [categoryEdit, setcategoryEdit] = useState();

  useEffect(() => {
    dataCategories?.data?.filter((w: any) => {
    
      if (w.id === categoryId) {
        
        setcategoryEdit(w)
        return formCategoryEdit.setValues({
          name : w?.name ?? '-',
          description: w.description ?? '-'

        })
      }
    })

  }, [categoryEdit, categoryId])
  
  const formEditCake = useForm({
    initialValues: {
      name: "",
      category: 0,
      priceTTC: 0,
      nbPerson: 0,
      weight: 0,
      id: 0,
      category_id: 0,
      isActif: false,
      file:null
    },
    validate: {
      name: (value) => (value === "" ? 'on a oublié son petit Nom ?' : null),
      category: (value) => (value === 0 ? 'il lui faut une catégory maMEn' : null),
      priceTTC: (value) => (value === 0 ? "c'est gratuit ?" : null),
      nbPerson: (value) => (value === 0 ? "Au moin une personnes non ?" : null),
      weight: (value) => (value === 0 ? "on a oublié la petite pesée ?" : null),
    },
  }
  )

  const handleSubmitEditCake = (values: any) => {
    console.log('VALUES',values);
    // console.log(cakeId);

    requestPutCake(cakeId, values)
      .then((res) => {
        if (res.status === 200) {
          showNotification({
            title: 'SUCESS !!!',
            message: 'Gateaux Modifié',
            color: 'green',

          })
          setOpenededitCake(false)
          requestGetAllCake();
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


  //downloadFIle CAKE 
  const handleFileSelect = (event: any) => {
    console.log('EVENT', event);
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0])
  }
  const handleSubmitF = async (event: any) => {
    event.preventDefault()
    const formData = new FormData();
    //@ts-ignore
    formData.append("file", selectedFile);


    try {
      const response = await axios({
        method: "post",
        url: `${URL_API}/upload/file/`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        showNotification({
          title: 'SUCESS !!!',
          message: 'Image Uploadé',
          color: 'green',

        })
        form.setFieldValue('file', res.data.id)
        formEditCake.setFieldValue('file', res.data.id)
        setImg(res.data);
      }
      );
    } catch (error) {
      showNotification({
        title: 'Erreur !!!',
        message: 'Image non Uploadé',
        color: 'red',

      })
    }
  }

  useEffect(() => {
    console.log(selectedFile)

  }, [selectedFile])

  console.log(formEditCake.values);
  
  //Section ROW of TABLE CAKE and CATEGORY
  const rows = FilterCake?.map((cake: any) => (
    <tr key={cake?.id}>
      <td>{cake?.name ?? '-'}</td>
      <td>{cake?.category?.name ?? '-'}</td>
      <td>{(cake?.priceTTC).toFixed(2) ?? 0}</td>
      <td>{cake?.weight ?? 0}</td>
      <td>{cake?.nbPerson ?? 0}</td>
      <td>{cake?.isActif ? 'Actif' : "Inactif"}</td>
      <td>
        <Image src={`${URL_API_FILES}/${cake?.file?.filePath}`} alt="Norway" />
      </td>
      <td>
        <Button style={{ margin:'5px', backgroundColor:'#FFFCF8'}} onClick={() => { setOpenedDelete(true); setCakeId(cake?.id) }}><IconTrash  color='red' /></Button>
        <Button style={{ margin:'5px', backgroundColor:'#FFFCF8'}} onClick={() => { setOpenededitCake(true); setCakeId(cake?.id) }}><IconPencil color="green" /></Button>
      </td>
    </tr>
  ));

  const rowsCat = FilterCat?.map((category: any) => (
    <tr key={category?.id}>
      <td>{category?.name ?? '-'}</td>
      <td>{category?.description ?? '-'}</td>
      <td>
        <Button style={{ margin:'5px', backgroundColor:'#FFFCF8'}} onClick={() => { setOpenedDeleteCategory(true); setCategoryId(category?.id) }}><IconTrash color='red' /></Button>
        <Button style={{ margin:'5px', backgroundColor:'#FFFCF8'}}onClick={() => { setOpenedEditCategory(true); setCategoryId(category?.id) }}><IconPencil color="green" /></Button>
      </td>
    </tr>
  ));


  return (


    <>
      <NavigationAdmin/>
      <hr className='hr-cake'></hr>
      <h3 className='title-cake-admin'>Creation de gateaux et de catégory</h3>

      <Group position="center">
        <Button className='btn-crud'   onClick={() => setOpened(true)}>Ajouter un  Gateaux</Button>
        <Button className='btn-crud'  onClick={() => setOpenedCategory(true)}> Ajouter une Category</Button>
        {/* MODAL FOR FORMCAKE and FORMCATEGORY */}
      </Group>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Création Profile"
        size={'lg'}
      >

        <Box mx={'xxl'} sx={{ maxWidth: 600 ,minWidth:300}} style={{ padding: '25px', borderRadius: '15%' }} >
          <legend>Nouveau Gateaux</legend>
          <form onSubmit={handleSubmitF}>
          
            <input required={true} name="file" type="file" onChange={handleFileSelect} />
            <button type="submit">Upload</button>
          </form>

          {img &&
            <Image
              src={`${URL_API_FILES}/${img?.filePath}`}
              height={70}
              width={100}
              mt={10}
              mb={10}
              alt="Norway"
            />
          }
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
                form.setFieldValue('category', parseInt(value))
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

            <Checkbox label='Actif'   {...form.getInputProps('isActif')} />

            <Group position="right" mt="md" p={"md"}>
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
      </Modal>
      <Modal
        opened={openedCategory}
        onClose={() => setOpenedCategory(false)}
        title="Recette Gateaux"
        size={'lg'}
      >
        <Box mx={'xs'} sx={{ maxWidth: 500, maxHeight: 500 }} style={{ padding: '25px', borderRadius: '15%' }} >
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
      <hr className='hr-cake'></hr>
      {/* SECTION TABLE  */}
        <h2 className='title-cake-admin'>TABLES Gateaux Cateogry</h2>
      <section >
        <Grid  gutter="xl" >
          <Grid.Col mx={'auto'} span={5}>
            <Grid mb={"xl"}>
              <Grid.Col sm={'content'} span={1} mx='xs'>
                <TextInput type="text" name='nameCake'
                  onChange={({ target }) => setFilter({ ...filter, nameCake: target.value })}
                  placeholder='Nom'
                  value={filter.nameCake}
                />
              </Grid.Col>
              <Grid.Col sm={'content'} span={1} mx='xs'>
                <TextInput type="text" name='category'
                  onChange={({ target }) => setFilter({ ...filter, category: target.value })}
                  placeholder='categorie'
                  value={filter.category}
                />
              </Grid.Col>

              <Grid.Col sm={'content'} span={1} mx='xs'>
                <Checkbox name='Actif' label="Actif"
                  onChange={({ target }) => setFilter({ ...filter, Actif: target.checked })}

                  checked={filter.Actif}
                />
              </Grid.Col>

              <Grid.Col sm={'auto'} span={1} mx='xs'>
                <Button className='btn-crud' onClick={resetFilter} ><IconZoomReset /></Button>
              </Grid.Col>
            </Grid>
            <Table className='table' withBorder={true} fontSize={15} highlightOnHover={true} style={{ textAlign: 'center' }} mb='md:xs' verticalSpacing="xs" horizontalSpacing="xl">
              <thead>
                <tr style={{ textAlign: 'center' }}>
                  <th style={{ textAlign: 'center' }}>Nom</th>
                  <th style={{ textAlign: 'center' }}>category</th>
                  <th style={{ textAlign: 'center' }}>price /Eur</th>
                  <th style={{ textAlign: 'center' }}>Poids /g</th>
                  <th style={{ textAlign: 'center' }}>NB Personnes</th>
                  <th style={{ textAlign: 'center' }}>Actif</th>
                  <th style={{ textAlign: 'center' }}>Visuel</th>
                  <th style={{ textAlign: 'center' }}>action</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </Grid.Col>
          <Grid.Col span={5}>
            <Grid>
              <Grid.Col sm={'content'} span={1} mx='xs' mb={"xl"}>
                <TextInput type="text" name='nameCat'
                  onChange={({ target }) => setFilterCat({ ...filterCat, nameCat: target.value })}
                  placeholder='Nom'
                  value={filterCat.nameCat}
                />
              </Grid.Col>
              <Grid.Col sm={'auto'} span={1} mx='xs'>
                <Button className='btn-crud' onClick={resetFilterCat} ><IconZoomReset /></Button>
              </Grid.Col>
            </Grid>
            <Table className='table' withBorder={true} fontSize={15} highlightOnHover={true} style={{ textAlign: 'center' }} verticalSpacing="xs" horizontalSpacing="xl">
              <thead>
                <tr style={{ textAlign: 'center' }}>
                  <th style={{ textAlign: 'center' }}>Nom</th>
                  <th style={{ textAlign: 'center' }}>description</th>
                  <th style={{ textAlign: 'center' }}>action</th>
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

          <Box mx={'lg'} sx={{ maxWidth: 500 }} style={{ padding: '25px', borderRadius: '15%' }} >
            <legend>Modifier Gateaux</legend>
            <form onSubmit={handleSubmitF}>
            <h4>Choisissez une Image</h4>
            <input required={true} name="file" type="file" onChange={handleFileSelect} />
            <button type="submit">Upload</button>
            </form>
            {img &&
            <Image
              src={`${URL_API_FILES}/${img?.filePath}`}
              height={300}
              mt={10}
              mb={10}
              alt="Norway"
            />
          }
            <form onSubmit={formEditCake.onSubmit((values) => handleSubmitEditCake(values))}>
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
                onChange={(event) => formEditCake.setFieldValue("isActif", event.currentTarget.checked,)}
              // {...form.getInputProps('isActif')} 
              />


              <Group position="right" mt="md">
                <Button type="submit">Submit</Button>
              </Group>
            </form>
          </Box>
        </Modal>

        <Modal
        opened={openedEditCategory}
        onClose={() => setOpenedEditCategory(false)}
        title="Modifier Categorie"
        size={'lg'}
      >
        <Box mx={'xs'} sx={{ maxWidth: 500, maxHeight: 200 }} style={{padding: '25px', borderRadius: '15%' }} >
          <form onSubmit={formCategoryEdit.onSubmit((values) => handleSubmitCategoryEdit(values))}>
          {/* <legend>Modifier Categorie</legend> */}
            <TextInput
              withAsterisk
              label="Nom"
              placeholder="Nom"
              {...formCategoryEdit.getInputProps('name')}
              value={formCategoryEdit.values.name}
            />

            <TextInput
              withAsterisk
              label="description"
              placeholder="description"
              {...formCategoryEdit.getInputProps('description')}
              value={formCategoryEdit.values.description}
            />
            <Group position="right" mt="md">
              <Button type="submit">Valider</Button>
            </Group>
          </form>
        </Box>
      </Modal>
        
      </section>
      <FooterAdmin/>
    </>
  )
}

export default CakePage;