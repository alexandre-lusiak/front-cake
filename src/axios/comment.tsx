import instance from "./axios";


const getComments = () => {
    return instance.get('/comment')
}

const getComment = (id:number) => {
    return instance.get(`/comment/${id}`)
}

const deleteComment = (id:number) => {
    return instance.delete(`/comment/delete/${id}`)
}

const requestComment = {
    getComment,getComments,deleteComment
}

export default requestComment;