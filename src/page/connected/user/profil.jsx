import { Box, Button, Group, Modal, TextInput, Table, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import userRequest from '../../../axios/user';
import useApi from '../../../hooks/useApi';
import { showNotification } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { IconUsers ,IconCake  ,IconMessages,IconThumbUp } from '@tabler/icons';
import { IconTrashX } from '@tabler/icons';
import Navigation from '../../../components/Navigation/Navigation';
import Footer from '../../../Footer/Footer';
import useAuth from '../../../Authentification/useAuth';
import './Profil.css'
const ProfilUser = () => {
  let navigate = useNavigate()
  const { logout } = useAuth();
  const { data, request: requestCurrentUser } = useApi(userRequest.currentUser)
  const { request: requestUpdateUser } = useApi(userRequest.updateUser);
  const { request: deleteUser } = useApi(userRequest.deleteUser);
  const [user, setUser] = useState();
  const [opened, setOpened] = useState(false);
  const [openedDelete, setOpenedDelete] = useState(false);

  


  const form = useForm({

    validate: {
      lastName: (value) => (value === "" ? 'champs obligatoire' : null),
      firstName: (value) => (value === "" ? 'champs obligatoire' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'email non vallide'),
      password: (value) => (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(value) ? null : 'Mot de passe doit etre composer au 1 majuscule,1 caractere special et un chiffre'),
      firstName: (value) => (value == "" ? 'champs obligatoire' : null),
      lastName: (value) => (value === "" ? 'champs obligatoire' : null),
      phone: (value) => (value.length < 8 ? 'champs obligatoire' : null),
      adress1: (value) => (value === "" ? 'champs obligatoire' : null),
      city: (value) => (value === "" ? 'champs obligatoire' : null),
      country: (value) => (value === "" ? 'champs obligatoire' : null),
    },

  });

  useEffect(() => {
    requestCurrentUser()
      .then((res) => {
        form.setValues({
          lastName: res?.data?.lastName,
          firstName: res?.data?.firstName,
          email: res?.data?.email,
          phone: res?.data?.phone,
          city: res?.data?.adress?.city,
          address1: res?.data?.adress?.adress1,
          postalCode: res?.data?.adress?.postalCode,
          country: res?.data?.adress?.country,
          adress_id: res.data.adress.id
        })
      });

  }, [])



  const handleSubmit = (values) => {

    console.log('Values', values);
    requestUpdateUser(data.id, values).then((res) => {
      if (res.data.code === 200) {
        showNotification({
          title: 'SUCESS !!!',
          message: 'Modification effectué',
          color: 'green',

        })
        setOpened(false)
        logout()
        navigate('/loggin')
      }

    }).catch((err) => {
      setOpened(false)

      showNotification({
        title: 'Erreur',
        message: err.response.data,
        color: 'red',
      })
    })

  }

  const handleDelete = () => {
    deleteUser(data?.id).then((res) => console.log(res)).catch((err) => console.log(err))
    logout()
    navigate('/')
  }






  console.log(data);
  return (
    <>
      <Navigation/>
      <hr></hr>
      <div className='container-info-profil'>
      <h1 className='title-info'>{data.lastName} {data.firstName}</h1>


      <Modal
      
        opened={opened}
        onClose={() => setOpened(false)}
        title="Modifier Profile,si vous modifier votre profil vous serez deconnecter du site"
        size={'lg'}
      >

        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <div className='form-control'>
            <div>
              <TextInput
                className='input-container'
                required
                withAsterisk
                label="Nom"
                placeholder="Nom"
                {...form.getInputProps('lastName')}
              />

              <TextInput
                className='input-container'
                required
                withAsterisk
                label="Prénom"
                placeholder="Prénom"
                {...form.getInputProps('firstName')}
              />

              <TextInput
                className='input-container'
                type={'number'}
                required
                withAsterisk
                label="Tel."
                placeholder="Tel."
                {...form.getInputProps('phone')}
              />

              <TextInput
                className='input-container'
                required
                withAsterisk
                label="Email"
                placeholder="email"
                {...form.getInputProps('email')}
              />
            </div>
            <div>
              <TextInput
                className='input-container'
                required
                withAsterisk
                label="Pays"
                placeholder="Pays"
                style={{ width: '200px' }}
                {...form.getInputProps('country')}
              />


              <TextInput
                className='input-container'
                required
                withAsterisk
                label="Adresse"
                placeholder="Adresse"
                {...form.getInputProps('address1')}
              />


              <TextInput
                className='input-container'
                required
                withAsterisk
                label="Ville"
                placeholder="Ville"
                {...form.getInputProps('city')}
              />

              <TextInput
                className='input-container'
                type={'number'}
                required
                withAsterisk
                label="CP"
                placeholder="CP"
                {...form.getInputProps('postalCode')}
              />
            </div>
          </div>
          <Button onClick={() => handleSubmit(form.values)} type='submit' className='button'>Valider</Button>

        </form>

      </Modal>
      <Group position="center">
        <Button onClick={() => setOpened(true)}>modifier Profil</Button>
        <Button onClick={() => console.log('okok')}>Commande</Button>
        <Button onClick={() => setOpenedDelete(true)}> supprimer Profil :'(</Button>
      </Group>

      <Modal opened={openedDelete} size="auto" title="Suppression du Compte">
        <Text>Vous nous quittez ? :/ Attention toutes vos données seront supprimées ,aucun retour possible </Text>

        <Group mt="xl">
          <Button variant="outline" onClick={handleDelete}>
            oui
          </Button>
          <Button variant="outline" onClick={() => setOpenedDelete(false)}>
            Non
          </Button>
        </Group>
      </Modal>

      <section className='section-info'>
        <div className='container-info'>
          <div className='item-info'>
          <h2 className='title-profil'>Information Personnel</h2>
            <p><strong>Nom: </strong> {data?.lastName}</p>
            <p><strong>Prénom: </strong> {data?.firstName}</p>
            <p><strong>Tel. :</strong> {data?.phone}</p>
            <p><strong>Nom:</strong>{data?.email}</p>
            <p><strong>Inscrit depuis: </strong> {new Intl.DateTimeFormat('fr-FR', { dateStyle: 'short' }).format(new Date(data?.registeredAt ?? new Date('1970-01-01')))}</p>
          </div>
          <div className='item-info'>
            <h2 className="title-profil">Adresse</h2>
            <p><strong>CP: </strong>{data?.adress?.postalCode}</p>
            <p><strong>Ville: </strong>{data?.adress?.city}</p>
            <p><strong>Pays: </strong>{data?.adress?.country}</p>
            <p><strong>Adresse: </strong>{data?.adress?.adress1}</p>
          </div>
        </div>

      </section>
      
    <section className='section-stat info-stats'>
        <div className='item-stat cake-stat'>
            <h6><IconMessages size={100}/></h6>
            <p className='stat'>{data?.comments?.length}</p>
        </div>
        <div className='item-stat info-stat'>
            <h6><IconThumbUp size={100}/></h6>
            <p className='stat'> {data?.cakeLikes?.length}</p>
        </div>
    </section>
    </div>
      <Footer></Footer>
    </>
  )
}

export default ProfilUser;