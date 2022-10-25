import exportedStorageAuth from "../Authentification/storage";
import useAuth from "../Authentification/useAuth"
import { getUser } from "./token";
import axios from "axios";
import { Navigate } from "react-router-dom";


const AuthGuard = ({children}) => {
    const user =  exportedStorageAuth.getUser();
    console.log(user);
    if(!user.roles.includes('ROLE_ADMIN')) return <Navigate to="/"/>
    return children
       
}

export default AuthGuard;