import jwtDecode from "jwt-decode"

const  saveToken = (token) => {
   
    localStorage.setItem('token',token)
 }

 const  getToken = (token) => {
   
   token =  localStorage.getItem('token',token)
   
   return token
 }

 const  logout = (token) => {
    localStorage.removeItem('token',token)
 }

 const isLogged = () => {
    let token = localStorage.getItem('token');
    console.log(!!token);
         return !!token 
 }

export const getUser = () => {
      const token = getToken()
      return (token) ? jwtDecode(token) : null;
}

 const services = {
    saveToken,logout,isLogged,getUser
 }

 
 export default services;