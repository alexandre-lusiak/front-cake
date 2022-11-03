import React from "react"
import instance from "./axios"



const getStats = () => {
    return instance.get('/stats')
}

const requestStat = {
    getStats
}

export default requestStat