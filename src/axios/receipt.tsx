import React from "react"
import instance from "./axios"

const getreceipt = () =>{
    return instance.get('/receipt')
}

const getreceiptWeek = () =>{
    return instance.get('/receipt/week')
}

const create = (receipt:any) => {
    return instance.post('/receipt/create',{
        title:receipt.title,
        description:receipt.description,
        ingredients:receipt.ingredients,
        isActif:receipt.isActif,
    })
} 

const update = (id:number,receipt:any) => {
    return instance.put(`/receipt/${id}`, {
        title:receipt.title,
        description:receipt.description,
        ingredients:receipt.ingredients,
        isActif:receipt.isActif,
    })
}

const deleteReceipt= (id:number) => {
    return instance.delete(`/delete/receipt/${id}`)
}

const receiptRequest = {
    getreceipt,create,update,deleteReceipt,getreceiptWeek
}

export default receiptRequest