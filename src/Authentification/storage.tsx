import jwtDecode from "jwt-decode";
import {AuthToken} from "../entity/AuthToken";

const key = "token"
const refresh_key = "refresh_token"

const storeToken = (authToken: AuthToken) => {
    console.log("storage",authToken)
    try {
        window.localStorage.setItem(key, authToken.token);
    } catch (error) {
        console.log('Erreur pendant la mise en mémoire des tokens', error);
    }
}

const storeTokenToken = (token:string) => {
    try {
        window.localStorage.setItem(key, token);
    } catch (error) {
        console.log('Erreur pendant la mise en mémoire des tokens', error);
    }
}

const getToken =  () => {
    const token = window.localStorage.getItem(key);
    if (typeof token === 'undefined' && token === null) return null;
    return token;
}

const isAuthValid = () => {
        const token = window.localStorage.getItem(key);
        if (token ) {
            // @ts-ignore
            const { exp: expiration } = jwtDecode(token);
            return expiration * 1000 > new Date().getTime();
        }
        return false;
}

const getUser = () => {
    const token = getToken();
    return (token) ? jwtDecode(token) : null;
}

const removeToken = () => {
    try {
        window.localStorage.removeItem(key);
    } catch (error) {
        console.log('Erreur pendant la suppression du token', error);
    }
}

const getRefreshToken =  () => {
    const token = window.localStorage.getItem(refresh_key);
    if (typeof token !== 'undefined' && token !== null) return null;
    return token;
}

const removeRefreshToken =  () => {
    try {
        window.localStorage.removeItem(refresh_key);
    } catch (error) {
        console.log('Erreur pendant la suppression du token', error);
    }
}

const store = (localKey : string, item : string) => {
    window.localStorage.setItem(localKey, item);
}

const get = (localKey : string) => {
    const token = window.localStorage.getItem(localKey);
    if (typeof token === 'undefined' && token === null) return null;
    return token;
}

const exportedStorageAuth = {
    get,
    store,
    storeToken,
    getToken,
    getUser,
    removeToken,
    getRefreshToken,
    removeRefreshToken,
    isAuthValid,
    storeTokenToken
}

export default exportedStorageAuth;