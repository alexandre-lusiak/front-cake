import instance from "./axios"

const getIngredients = () =>{
    return instance.get('/ingredients')
}

const create = (ingredient:any) => {
    return instance.post('/ingredient/create',{
        name:ingredient.name,
    })
} 

const update = (id:number,ingredient:any) => {
    return instance.put(`/ingredient/${id}`, {
        name:ingredient.name,
    })
}

const deleteIngredient= (id:number) => {
    return instance.delete(`/delete/ingredient/${id}`)
}

const ingredientRequest = {
    create,deleteIngredient,update,getIngredients
}

export default ingredientRequest;