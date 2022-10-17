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

const userRequest = {
    getUsers,currentUser,register
}

export default userRequest;