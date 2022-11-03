import react, { useState, useEffect } from 'react';
import ingredientRequest from '../../../axios/ingredient';
import receiptRequest from '../../../axios/receipt';
import NavigationAdmin from '../../../components/Navigation/NavigationAdmin';
import useApi from '../../../hooks/useApi';
import { TextInput, Checkbox, Button, Group, Box, Select, Table, Modal, useMantineTheme, Text, FileInput, Grid, MultiSelect, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import Footer from '../../../Footer/Footer';
import { Link } from 'react-router-dom';
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import './AdminPage.css'
import { IconTrash, IconPencil, IconUpload, IconPhoto, IconX } from '@tabler/icons';
import { IconZoomReset } from '@tabler/icons';
import { RichTextEditor } from '@mantine/rte';
import FooterAdmin from '../../../Footer/FooterAdmin';
const ReceiptAdmin = () => {

  const { data: datareceipts, request: requestGetAllreceipt } = useApi(receiptRequest.getreceipt)
  const { request: requestDeleteReceipt } = useApi(receiptRequest.deleteReceipt)
  const { request: requestPostReceipt } = useApi(receiptRequest.create);
  const { request: requestPutReceipt } = useApi(receiptRequest.update);


  const [openedDelete, setOpenedDelete] = useState<boolean>(false);
  // const [ingrdientSelected, setingrdientSelected] = useState<number>(0);
  const [receipt, setReceipt] = useState<any>();
  const [receiptId, setreceiptId] = useState<number>();
  const [receiptEdit, setreceiptEdit] = useState<any>();
  const [opened, setOpened] = useState<boolean>(false);

  const [openedEditReceipt, setOpenedEditReceipt] = useState<boolean>(false);


  const [openedDeleteIngredent, setOpenedDeleteIngrdient] = useState<boolean>(false);
  const [openedEditIngredent, setOpenedEditIngredient] = useState<boolean>(false);
  const [openedIngredient, setOpenedIngredient] = useState<boolean>(false);
  const [IngredientsName, setIngredientsName] = useState<String>('');
  const [ingredientId, setIngredientId] = useState<number>();
  const [ingredients, setIngredients] = useState<any>();
  const { data: dataIngredients, request: requestIngredients } = useApi(ingredientRequest.getIngredients)
  const { request: requestDeleteIngredient } = useApi(ingredientRequest.deleteIngredient)
  const { request: requestPostIngredient } = useApi(ingredientRequest.create);
  const { request: requestPutIngredient } = useApi(ingredientRequest.update);

  const [ingredientsData, setIngredientsData] = useState([]);
  const [ingredientsDataEdit, setIngredientsDataEdit] = useState([]);
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      ingredients: [],
      isActif: false
    },
    validate: {
      title: (value) => (value === "" ? 'on a oublié son petit Nom ?' : null),
      // ingredients: (value) => ( value.length <= 0 ? 'il lui faut un Ingredient maMEn' : null ),
      description: (value) => (value === "" ? "petite description ?" : null),

    },
  }
  )
  console.log(form.values);

  const formEditReceipt = useForm({
    initialValues: {
      title: "",
      description: "",
      ingredients: [],
      isActif: false,
      id: 0
    },
    validate: {
      title: (value) => (value === "" ? 'on a oublié son petit Nom ?' : null),
      description: (value) => (value.length < 5 ? "petite description ?" : null),

    },
  }
  )

  useEffect(() => {
    requestGetAllreceipt().then((res) => {
      setReceipt(res?.data?.data)
    });
  }, []);

  const IngredientsIdConversion = (CategoryId: string) => {


    setIngredientsName(CategoryId);
    ingredients?.find((name: any) => {

      //@ts-ignore
      if (name.value === CategoryId) {
        //@ts-ignore
        form.setFieldValue("ingredients", name.label);
      }
    });
  };



  const handleSubmit = (values: any) => {
    console.log('val', values);

    requestPostReceipt(values)
      .then((res) => {
        if (res.status === 200) {
          showNotification({
            title: 'SUCESS !!!',
            message: 'Recette créée',
            color: 'green',
          })

          setOpened(false)
          requestGetAllreceipt()
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
    requestIngredients().then((res) => {
      setIngredient(res?.data?.data)
      const tab: any = [];

      for (let i = 0; i < res.data.data.length; i++) {
        tab.push({ label: res?.data?.data[i]?.name, value: res?.data?.data[i]?.id });
      }
      setIngredientsData(tab);
      const tabEdit: any = [];
      for (let i = 0; i < res.data.data.length; i++) {
        tabEdit.push({ label: res?.data?.data[i]?.name, value: res?.data?.data[i]?.name });
      }
      setIngredientsDataEdit(tabEdit);

    })


  }, []);


  useEffect(() => {
    requestIngredients().then((res) => {

      const tab: any = [];
      for (let i = 0; i < res.data.data.length; i++) {
        tab.push({ label: res?.data?.data[i]?.name, value: res?.data?.data[i]?.name });
      }
      setIngredientsDataEdit(tab);

    })
  }, []);

  const handleSubmitEditReceipt = (values: any) => {
    // console.log(cakeId);

    requestPutReceipt(receiptId, values)
      .then((res) => {
        if (res.status === 200) {
          showNotification({
            title: 'SUCESS !!!',
            message: 'Recette Modifié',
            color: 'green',

          })
          setOpenedEditReceipt(false)
          requestGetAllreceipt()
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

  // console.log('INGGR22DATA',ingredientsData);


  const formIngredient = useForm({
    initialValues: {
      name: "",
    },
    validate: {
        name: (value) => (value === "" ? 'champs obligatoire' : null),
      //   description: (value) => (value === "" ? 'champs obligatoire' : null),
    },
  }
  )



  const formIngredientEdit = useForm({
    initialValues: {
      name: "",
    },
    validate: {
        name: (value) => (value === "" ? 'champs obligatoire' : null),
    },
  }
  )

  const handleSubmitIngredient = (values: any) => {
    requestPostIngredient(values)
      .then((res) => {
        if (res.status === 200) {
          showNotification({
            title: 'SUCESS !!!',
            message: 'Ingredient créée',
            color: 'green',

          })
          setOpenedIngredient(false)
          requestIngredients();

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
  const [ingredientEdit, setIngredientEdit] = useState();
  const [ingredient, setIngredient] = useState<any>();


  useEffect(() => {


    ingredient?.filter((w: any) => {
      setIngredientEdit(w)

      if (w.id === ingredientId) {

        formIngredientEdit.setValues({
          name: w?.name ?? '-'
        })
      }
    })
  }, [ingredientId, ingredient]);




  const handleSubmitIngredientEdit = (values: any) => {
    requestPutIngredient(ingredientId, values)
      .then((res) => {
        if (res.data.code === 200) {
          showNotification({
            title: 'SUCESS !!!',
            message: 'Ingredient modifié',
            color: 'green',

          })
          setOpenedEditIngredient(false)
          requestIngredients()

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
  const handleDeleteReceipt = () => {


    requestDeleteReceipt(receiptId).then((res) => {
      if (res.status === 200) {
        showNotification({
          title: 'SUCESS !!!',
          message: `Aurevoir recette ${res.data.data.title}`,
          color: 'green',

        })
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
  const handleDeleteIngrdient = () => {


    requestDeleteIngredient(ingredientId).then((res) => {
      console.log(res.code);

      if (res.data.code === 200) {
        showNotification({
          title: 'SUCESS !!!',
          message: `Aurevoir ingrdients ${res.data.data.name}`,
          color: 'green',

        })
        setOpenedDeleteIngrdient(false)
        requestIngredients()
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

  useEffect(() => {
    receipt?.filter((w: any) => {
      if (w.id === receiptId) {
        const ingres = w.ingredient;
        const tab: [] = [];
        ingres.forEach((i: any) => {
          //@ts-ignores
          tab.push(i.name);
        });
        formEditReceipt.setFieldValue("ingredients", tab);
        setreceiptEdit(w)
        return formEditReceipt.setValues({
          title: w?.title ?? '-',
          description: w?.description ?? 0,
          id: w.id ?? 0,
          isActif: w.isActif,
          ingredients: tab
        })
      }
    })

  }, [receipt, receiptId])


  const rowsIngredient = dataIngredients?.data?.map((ingredient: any) => (

    <tr key={ingredient?.id}>
      <td>{ingredient?.name ?? '-'}</td>
      <td>
        <Button style={{ margin: '5px', backgroundColor: '#FFFCF8' }} onClick={() => { setOpenedDeleteIngrdient(true); setIngredientId(ingredient?.id) }}><IconTrash color='red' /></Button>
        <Button style={{ margin: '5px', backgroundColor: '#FFFCF8' }} onClick={() => { setOpenedEditIngredient(true); setIngredientId(ingredient?.id) }}><IconPencil color="green" /></Button>
      </td>
    </tr>
  ));


  const rowsReceipt = datareceipts?.data?.map((receipt: any) => (

    <tr key={receipt?.id}>
      <td style={{ padding: '0px' }}>{receipt?.title ?? '-'}</td>
      <td >{receipt?.description ?? '-'}</td>
      <td> {receipt.ingredient.map((ingre: any) => <p> {ingre.name}</p>)}</td>
      <td>
        <Button style={{ margin: '5px', backgroundColor: '#FFFCF8' }} onClick={() => { setOpenedDelete(true); setreceiptId(receipt?.id) }}><IconTrash color='red' /></Button>
        <Button style={{ margin: '5px', backgroundColor: '#FFFCF8' }} onClick={() => { setOpenedEditReceipt(true); setreceiptId(receipt?.id) }}><IconPencil color="green" /></Button>
      </td>
    </tr>
  ));

  console.log('AAAA', form.values.ingredients);

  return (
    <>
      <NavigationAdmin/>
      <div style={{ margin: '1rem' }}>
        <h1>Recettes et Ingerdients</h1>
        <Group style={{ marginBottom: '2rem' }} position="center">
          <Button className='btn-crud' onClick={() => setOpened(true)}>Ajouter une Recette</Button>
          <Button className='btn-crud' onClick={() => setOpenedIngredient(true)}> Ajouter une ingredient</Button>
        </Group>
        <Modal
          opened={opened}
          onClose={() => { setOpened(false); requestIngredients() }}
          title="Nouvel Recette"
          size={'xxl'}
        >

          <Box mx={'xs'} sx={{ maxWidth: 800 }} style={{  paddingTop: '0', paddingRight: '50px', paddingLeft: '50px', borderRadius: '15%' }} >
            <legend>Nouvel Recette</legend>
            <form style={{ width: 700, height: 800 }} onSubmit={form.onSubmit((values) => handleSubmit(values))}>
              <TextInput
                withAsterisk
                label="Titre"
                placeholder="Titre"
                {...form.getInputProps('title')}
                style={{ margin: 10 }}

              />

              <MultiSelect
                data={[...ingredientsData, ...form.values.ingredients]}
                label="Ingredients"
                placeholder="Ingredients"
                {...form.getInputProps('ingredients')}
                onChange={(value: []) =>
                  form.setFieldValue("ingredients", value)
                }
                style={{ margin: 10 }}
              />


              <Textarea
                size='xl'
                className='textarea'
                radius={"lg"}
                required
                label="description"
                placeholder="description"
                {...form.getInputProps('description')}
                error={
                  form.errors.description
                }
              />

              <Checkbox
                style={{ marginTop: 20 }}
                label='Actif'
                {...form.getInputProps('isActif')}
              />
              <Group position="right" mt="md">
                <Button type="submit">Submit</Button>
              </Group>
            </form>
          </Box>
        </Modal>


        {/* <Modal
          opened={openedIngredient}
          onClose={() => setOpenedIngredient(false)}
          title="creer Ingredient"
          size={'xl'}
          
        >
          <Box mx={'xl'} sx={{ maxWidth: 500}} style={{  padding: '25px', borderRadius: '15%' }} >
            <legend>Nouveau Ingredient</legend>
            <form onSubmit={formIngredient.onSubmit((values) => handleSubmitIngredient(values))}>
              <TextInput
                withAsterisk
                label="Nom"
                placeholder="Nom"
                {...formIngredient.getInputProps('name')}
              />

              <Group position="right" mt="md">
                <Button type="submit">Valider</Button>
              </Group>
            </form>
          </Box>
        </Modal> */}

        <Grid gutter="xl" >
          <Grid.Col mx={'auto'} span={5} >
            <Table withBorder={true} fontSize={15} highlightOnHover={true} style={{ textAlign: 'center' }} verticalSpacing="xs" horizontalSpacing="xl">
              <thead>
                <tr style={{ textAlign: 'center' }}>
                  <th style={{ textAlign: 'center' }}>Titre</th>
                  <th style={{ textAlign: 'center' }}>Description</th>
                  <th style={{ textAlign: 'center' }}>Ingredients</th>
                  <th style={{ textAlign: 'center' }}>Action</th>

                </tr>
              </thead>
              <tbody>{rowsReceipt}</tbody>
            </Table>
          </Grid.Col>
          <Grid.Col mx={'auto'} span={5}>
            <Table withBorder={true} fontSize={15} highlightOnHover={true} style={{ textAlign: 'center', position: 'fixed', width: 400 }} verticalSpacing="xs" horizontalSpacing="xl">
              <thead>
                <tr style={{ textAlign: 'center' }}>
                  <th style={{ textAlign: 'center' }}>Nom</th>
                  <th style={{ textAlign: 'center' }}>Action</th>

                </tr>
              </thead>
              <tbody>{rowsIngredient}</tbody>
            </Table>
          </Grid.Col>
        </Grid>
        <Modal onClose={() => setOpenedDeleteIngrdient(false)} opened={openedDeleteIngredent} size="auto" title="Suppression Ingrédient">
          <Text>voulez-vous vraiment supprimer cet ingrédient , ne soyez pas trop hatif jeune ... ? :/ Attention toutes suppressions est irrévocable </Text>

          <Group mt="xl">
            <Button variant="outline" onClick={handleDeleteIngrdient}>
              oui
            </Button>
            <Button variant="outline" onClick={() => setOpenedDeleteIngrdient(false)}>
              Non
            </Button>
          </Group>
        </Modal>

        <Modal onClose={() => setOpenedDelete(false)} opened={openedDelete} size="auto" title="Suppression de">
          <Text>voulez-vous vraiment supprimer cette recette  , ne soyez pas trop hatif jeune ... ? :/ Attention toutes suppressions est irrévocable </Text>
          <Group mt="xl">
            <Button variant="outline" onClick={handleDeleteReceipt}>
              oui
            </Button>
            <Button variant="outline" onClick={() => setOpenedDelete(false)}>
              Non
            </Button>
          </Group>
        </Modal>


        <Modal
          opened={openedEditReceipt}
          onClose={() => setOpenedEditReceipt(false)}
          title="Modifier Recette"
          size={'xxl'}
        >

          <Box mx={'xs'} sx={{ maxWidth: 800 }} style={{  paddingTop: '0', paddingRight: '50px', paddingLeft: '50px', borderRadius: '15%' }} >
            <legend>Modifier Recette</legend>
            <form style={{ width: 700, height: 800 }} onSubmit={formEditReceipt.onSubmit((values) => handleSubmitEditReceipt(values))}>
              <TextInput
                withAsterisk
                label="Titre"
                placeholder="Titre"
                {...formEditReceipt.getInputProps('title')}
                style={{ margin: 10 }}
              />

              <MultiSelect
                data={[...formEditReceipt.values.ingredients, ...ingredientsDataEdit]}
                value={[...formEditReceipt.values.ingredients]}
                label="Ingredients"
                placeholder="Ingredients"
                {...formEditReceipt.getInputProps('ingredients')}
                onChange={(value: []) =>
                  formEditReceipt.setFieldValue("ingredients", value)
                }
              />

              <Textarea
                radius={"lg"}
                style={{ width: 675, height: 500, margin: 10 }}
                required

                label="description"
                placeholder="description"
                {...formEditReceipt.getInputProps('description')}
              />

              <Checkbox
                label='Actif'
                checked={formEditReceipt.values.isActif}
                onChange={(event) => formEditReceipt.setFieldValue("isActif", event.currentTarget.checked)}

              />
              <Group position="right" mt="md">
                <Button type="submit">Submit</Button>
              </Group>
            </form>
          </Box>
        </Modal>


        <Modal
          opened={openedIngredient}
          onClose={() => setOpenedIngredient(false)}
          title="creer Ingredient"
          size={'xl'}
        >
          <Box mx={'xl'} sx={{ maxWidth: 500, maxHeight:400 }} style={{ padding: '25px', borderRadius: '15%' }} >
            <legend>Nouveau Ingredient</legend>
            <form onSubmit={formIngredient.onSubmit((values) => handleSubmitIngredient(values))}>
              <TextInput
                withAsterisk
                label="Nom"
                placeholder="Nom"
                {...formIngredient.getInputProps('name')}
              />

              <Group position="right" mt="md">
                <Button type="submit">Valider</Button>
              </Group>
            </form>
          </Box>
        </Modal>


        <Modal
          opened={openedEditIngredent}
          onClose={() => setOpenedEditIngredient(false)}
          title="Modifier Ingredient"
          size={'xl'}
        >
          <Box mx={'xl'} sx={{ maxWidth: 500, maxHeight: 400 }} style={{  padding: '25px', borderRadius: '15%' }} >
            <legend>Modifier Ingredient</legend>
            <form onSubmit={formIngredientEdit.onSubmit((values) => handleSubmitIngredientEdit(values))}>
              <TextInput
                withAsterisk
                label="Nom"
                placeholder="Nom"
                {...formIngredientEdit.getInputProps('name')}
              />

              <Group position="right" mt="md">
                <Button type="submit">Valider</Button>
              </Group>
            </form>
          </Box>
        </Modal>
      </div>
      <FooterAdmin />
    </>
  )
}

export default ReceiptAdmin;