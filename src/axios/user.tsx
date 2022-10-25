import axios from 'axios'
import instance from './axios'


const register = (user:any) => {
    return instance.post('/register',{
        email: user.email,
        password:user.password,
        lastName:user.lastName,
        firstName:user.firstName,
        phone:user.phone,
        city:user.city,
        address:user.address1,
        postalCode:user.postalCode,
        country : user.country
        })
}

const getUsers = () => {
    return instance.get('/users')
}

const currentUser = () => {
    return instance.get("/current/user");
};

const updateUser =(id:number,user:any) => {
    return instance.put(`/user/${id}`,{
        email: user.email,
        lastName:user.lastName,
        firstName:user.firstName,
        phone:user.phone,
        city:user.city,
        address:user.address1,
        postalCode:user.postalCode,
        country : user.country
    })
}

const deleteUser = (id:number) => {
    return instance.delete(`/delete/user/${id}`)
}

const sendContact = (contact:any) => {
    return instance.post('/contact',{
        email: contact.email,
        lastName:contact.lastName,
        firstName:contact.firstName,
        phone:contact.phone,
        city:contact.city,
        content:contact.content
    })
}

const createComment =(id:number,comment:any) => {
        return instance.post(`/comment/user/${id}`, {
            content:comment?.content,
            id:comment?.id
        })
}

const getComment = (id:number)=>{
    return instance.get(`/comment/cake/${id}`)
}

const forgotPasword = (email:string)=> {
    return instance.post(`/forgot/password`,{
        email_user:email
    })
}


const userRequest = {
    getUsers,currentUser,register,updateUser,deleteUser,sendContact,createComment,getComment,forgotPasword

}

export default userRequest;