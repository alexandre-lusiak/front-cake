import instance from "./axios"

const getCakes = () => {
    return instance.get('/cakes')
}

const getCake = (id:number) => {
    return instance.get(`/cake/${id}`)
}

const createCake = (cake:any) => {
    return instance.post('/addcake' ,{
        name:cake.name , 
        category:cake.category  , 
        priceTTC: cake.priceTTC , 
        nbPerson:cake.nbPerson  , 
        weight:cake.weight,
        isActif:cake.isActif
    })
}

const uploadfile= (file:any,id:number) => {
    return instance.post(`/cake/upload/${id}` ,JSON.stringify(file))
}

const edit =(id:number,cake:any) => {
    return instance.put(`/updateCake/${id}`,{
        name:cake.name , 
        category:cake.category  , 
        priceTTC: cake.priceTTC , 
        nbPerson:cake.nbPerson  , 
        weight:cake.weight ,
        isActif:cake.isActif
    })
}

const deleteCake = (id:number) => {
    return instance.delete(`/delete/cake/${id}`)
}

const like = (id:number,userId:number) => {
        return instance.post(`/user/like/${id}`,{
            id_user:userId
        })
}

export const postFile = async (data : FormData,id:number) => {
    const config = {
        headers: {'Content-Type': 'multipart/form-data'}
    };
    return await instance.post(`file/upload/${id}`, data, config);
};

const cakeRequest = {
    createCake,getCakes,edit,uploadfile,deleteCake,getCake,like,postFile
}
export default cakeRequest;