import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../Authentification/useAuth';



 const instance = axios.create({
    baseURL:"http://localhost:8000/api/"
})


let isAlreadyFetchingAccessToken = false
axios.interceptors.response.use(response => response, async error => {
    const status = error.response ? error.response.status : null
    if (status === 401) {
        if (!isAlreadyFetchingAccessToken) {
            isAlreadyFetchingAccessToken = true
            if (!useAuth().isAuthenticated()) {
                useAuth().logout()
                const navigate = useNavigate()
                navigate("/")
            }
          
        }
    }
    return Promise.reject(error);
});

export default instance;