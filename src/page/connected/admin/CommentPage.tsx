import * as React from 'react';
import { useState, useEffect } from 'react';
import requestComment from '../../../axios/comment';
import NavigationAdmin from '../../../components/Navigation/NavigationAdmin';
import useApi from '../../../hooks/useApi';
import './CommentPage.css'
import { Button ,Table,Modal,Text,Group} from '@mantine/core';
import { IconTrash, IconPencil } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import { connected } from 'process';
import FooterAdmin from '../../../Footer/FooterAdmin';



const CommentPage =() => {

    const{data,request } = useApi(requestComment.getComments);
    const{request:deleteComment } = useApi(requestComment.deleteComment);
    const [commentId, setcommentId] = useState<number>();
    const [opendDelete, setOpendDelete] = useState<boolean>(false);
    useEffect(() => {
        request().then((res) => {
            
        })
    },[])
    console.log('data',data);
      console.log('coom',commentId);

    const handleSubmit = () => {
  
    deleteComment(commentId).then((res) => {
        console.log('rreeesss',res?.data.code);
        if(res?.data.code === 200)
        showNotification({
          title: 'SUCESS !!!',
          message: 'Commentaire supprimé',
          color: 'green',

        })
       setOpendDelete(false)
       request()
      })
      .catch((err) => {
        console.log(err);
        showNotification({
            title: 'Erreur !!!',
            message: 'suppresion échoué',
            color: 'red',
  
          })
      })
    
}

const rows =  data?.data?.map((comment:any,key:number) => 
         <tr key={comment.id}>
            <td>{comment?.user?.lastName} {comment?.user?.firstName}</td>
            <td>{comment?.content}</td>
            <td>{new Intl.DateTimeFormat('fr-FR', { dateStyle: 'short',timeStyle:"medium" }).format( new Date(comment?.createdAt ?? new Date('1970-01-01')))} </td>
            <td> <Button style={{ marginRight: '5px', backgroundColor: 'white' }} onClick={() => {setOpendDelete(true) ; setcommentId(comment?.id)}  }><IconTrash color='red' /></Button></td>
        </tr>
    );

    return (
        <>
        <NavigationAdmin/>
        <section className='section-comment'>
        <Table className='table-content' withBorder={true} fontSize={15} highlightOnHover={true} style={{ textAlign: 'center' }}  verticalSpacing="xs" horizontalSpacing="xl">
              <thead>
                <tr style={{ textAlign: 'center' }}>
                  <th style={{ textAlign: 'center' }}>Utilisateur</th>
                  <th style={{ textAlign: 'center' }}>Contenu</th>
                  <th style={{ textAlign: 'center' }}>Date</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>

            <Modal onClose={() => setOpendDelete(false)} opened={opendDelete} size="auto" title="Suppression du commentaires">
          <Text>voulez-vous vraiment supprimer ce commentaires , ne soyez pas trop hatif jeune ... ? :/ Attention toutes suppressions est irrévocable </Text>

          <Group mt="xl">
            <Button variant="outline" onClick={handleSubmit}>
              oui
            </Button>
            <Button variant="outline" onClick={() => setOpendDelete(false)}>
              Non
            </Button>
          </Group>
        </Modal>

        </section>
        <FooterAdmin/>
        </>
    )

}

export default CommentPage;