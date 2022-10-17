import React from 'react';



// @ts-ignore
const AuthContext = React.createContext(
    {
        isAuthenticated: false,
        setIsAuthenticated: (value:any) => {},
    }
);


export default AuthContext;