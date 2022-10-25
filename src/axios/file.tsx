import instance from "./axios"


const uploadFile =(file:File) => {
    return instance.post('/upload/file',{
            file
    })
}

const fileRequest = {
    uploadFile
}

export default fileRequest