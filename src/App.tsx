import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {Routes , Route, BrowserRouter} from 'react-router-dom'
import HomePage from './page/Home/HomePage';
import LogginPage from './page/Auth/LogginPage';
import { RegisterPage } from './page/Auth/RegisterPage';
import useAuth from './Authentification/useAuth';
import AuthContext from './Authentification/contextAuth';
import { NotificationsProvider } from '@mantine/notifications';
import ProfilUser from './page/connected/user/profil';
import AuthGuard from './utils/AuthAdmin';
import AdminPage from './page/connected/admin/AdminPage';
import CakePage from './page/connected/admin/cakeAdmin';
import UserList from './page/connected/admin/UserList';
import CakeList from './page/Cake/CakeList.jsx';
import CakeItem from './page/Cake/CakeItem';
import ContactPage from './page/contact/ContactPage';
import ResetPwd from './components/Auth/resetPassword/resetPwd';
import ReceiptAdmin from './page/connected/admin/ReceiptAdmin';
import RGPD from './page/Rules/rules';
import About from './page/About/About';
import Engagement from './page/About/Engagement';
import ResetPwdForm from './components/Auth/resetPassword/ResetPwdForm';
import CommentPage from './page/connected/admin/CommentPage';
import useResize from './hooks/useSize';



function App() {

  useAuth().setup();
  const [isAuthenticated, setIsAuthenticated] = useState(
    useAuth().isAuthenticated()
  )

  console.log('AAA',isAuthenticated);
  
const size = useResize()
console.log(size.height/3);

  return (


  <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
    <NotificationsProvider style={{ top:`${size.height/2} px` ,position:'absolute',height:'50px',width:'200px' }} >
      <BrowserRouter>
        <Routes>
          <Route  path='/' element= {< HomePage />} />
          <Route  path='/Loggin' element= {<LogginPage/>} />
          <Route  path='/register' element= {<RegisterPage/>} />
          <Route  path='/cakes' element= {<CakeList />} />
          <Route  path='/cake/:id' element= {<CakeItem />} />
          <Route path='/admin' element = {<AuthGuard><AdminPage/></AuthGuard>}></Route>
          <Route path='/admin/oeil' element = {<AuthGuard><UserList/></AuthGuard>}></Route>
          <Route path='/admin/cake' element = {<AuthGuard><CakePage/></AuthGuard>}></Route>
          <Route path='/admin/receipt' element = {<AuthGuard><ReceiptAdmin/></AuthGuard>}></Route>
          <Route path='/admin/comment' element = {<AuthGuard><CommentPage/></AuthGuard>}></Route>
          <Route  path='/profil' element= {<ProfilUser/>} />
          <Route  path='/reset/password' element= {< ResetPwd/>} />
          <Route  path='/reset/form' element= {< ResetPwdForm/>} />
          <Route  path='/contact' element= {<ContactPage/>} />
          <Route  path='/RGPD' element= {<RGPD/>} />
          <Route  path='/about' element= {<About/>} />
          <Route  path='/engagement' element= {<Engagement/>} />

        </Routes>
      </BrowserRouter>
    </NotificationsProvider>
   </AuthContext.Provider>

  );
}

export default App;
