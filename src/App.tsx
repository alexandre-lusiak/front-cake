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
function App() {

  useAuth().setup();
  const [isAuthenticated, setIsAuthenticated] = useState(
    useAuth().isAuthenticated()
  )

  return (
  <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
    
    <NotificationsProvider style={{ top:0 ,zIndex:-1 }} >
      <BrowserRouter>
        <Routes>
          <Route  path='/' element= {< HomePage />} />
          <Route  path='/Loggin' element= {<LogginPage/>} />
          <Route  path='/register' element= {<RegisterPage/>} />
          <Route  path='/profil' element= {<ProfilUser/>} />
        </Routes>
      </BrowserRouter>
    </NotificationsProvider>
   </AuthContext.Provider>

  );
}

export default App;
