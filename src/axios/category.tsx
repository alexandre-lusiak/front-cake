import instance from "./axios"


const getCategories = () => {
    return instance.get('/categories')   
}   
const create = (category:any) => {
    return instance.post('/addCategory',{
        name:category.name,
        description:category.description
    })
} 

const edit = (id:number,category:any) => {
    return instance.put(`/updateCategory/${id}`, {
        name:category.name,
        description:category.description
    })
}

const deleteCategory = (id:number) => {
    return instance.delete(`/delete/category/${id}` )
}

const categoryRequest= {
getCategories,create,edit,deleteCategory
}
export default categoryRequest