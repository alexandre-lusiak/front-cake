import instance from "./axios";


const login = (username: string, password: string) => instance.post('/login_check',{username: username, password: password});

//const refresh = (refresh_token) => request.post('/token/refresh', refresh_token)


const exportedAuthApi = {
    login,
    //refresh
};

export default exportedAuthApi;