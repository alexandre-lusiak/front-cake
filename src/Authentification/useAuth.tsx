import { useContext } from "react";

import authStorage from "./storage";
import jwtDecode from "jwt-decode";
import {AuthToken} from "../entity/AuthToken";
import instance from "../axios/axios";


// @ts-ignore
const useAuth = () => {
    // @ts-ignore
    /*
    const { user, setUser } = useContext(AuthContext) || {};
     */
    const logIn = async (authToken: AuthToken) => {
        authStorage.storeToken(authToken);

    };

    const logout = () => {
        authStorage.removeToken();
        delete instance.defaults.headers.Authorization;
    };

    const setAxiosToken = (token: any) =>{
        instance.defaults.headers["Authorization"] = "Bearer " + token;
    }

    const setup = () => {
        //Voir si on a un token
        const token = authStorage.getToken();
        
        
        //Si le token est encore valide
        if (token) {
            // @ts-ignore
            const { exp: expiration } = jwtDecode(token);
            console.log(expiration);
            
            if (expiration * 1000 > new Date().getTime()) {
                setAxiosToken(token);
            } else {
                logout();
            }
        } else {
            logout();
        }
    }

    const isAuthenticated = () => {
        //Voir si on a un token
        const token = authStorage.getToken()
        //Si le token est encore valide
        if (token) {
            // @ts-ignore
            const { exp: expiration } = jwtDecode(token);
            if (expiration * 1000 > new Date().getTime()) {
                return true;
            }
            return false;
        }
        return false;
    }

    return { /*user , */ logIn, logout, setup, isAuthenticated };
};

export default useAuth;