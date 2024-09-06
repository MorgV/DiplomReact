import {$authHost, $host} from './index'
import { jwtDecode } from "jwt-decode";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)   
    return data
}

export const  fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createBrand= async (brand) =>  {
    const {data} = await $authHost.post('api/brand', brand)   
    return data
}

export const  fetchBrand= async () => {
    const {data} = await $host.get('api/brand')
    return data
}

export const createDevice= async (device) =>  {
    const {data} = await $authHost.post('api/device',device)   
    return data
}

export const  fetchOneDevice = async (id) => {
    const {data} =  await $host.get('api/device/' + id)
    return data
}   

export const  fetchDevice = async (typeId, brandId, page, limit = 5,text='') => {
    const {data} =  await $host.get('api/device/',{params: {typeId, brandId, page, limit,text}})
    console.log(data.rows)
    return data
}   
export const fetchTable = async () => {
    const {data} =  await $host.get('api/deviceTable')
    console.log(data.rows)
    return data.rows
}   
export const fetchBasket = async (userId) => {
    console.log(userId)
    const {data} =  await $host.get('api/basket',{params: {userId}})
    console.log(data.rows)
    return data.rows
}   
export const AddToBasket = async (userId,deviceId,countDevice) => {
    const {data} =  await $authHost.post('api/basket', {userId,deviceId,countDevice})   
    console.log(data)
    return data.rows 
}  
export const  deleteDevice = async (userId,deviceId) => {
    const {data} =  await $authHost.get('api/basket/' + userId,{params: {userId,deviceId}})
    return data
}   

export const updateCount = async (userId,deviceId,countDevice) => {
    const {data} =  await $authHost.post('api/basket/'+ userId , {params: {userId,deviceId,countDevice}})   
    return data 
}  
export const sendMessage = async (mail,orderNumber,product,sum,phone,userId,FIO) => {
    const {data} =  await $host.post('api/mailer/', {mail,orderNumber,product,sum,phone,userId,FIO})   
    return data 
}  
export const generateСode = async (email) => {
    const {data} =  await $host.get('api/mailer/', {params: {email}})   
    return data 
}  

export const fetchAllOrders = async () => {
    const {data} =  await $host.get('api/orders/')   
    console.log(data)
    return data 
}  

export const fetchOneOrder = async (id) => {
    const {data} =  await $host.get('api/orders/'+ id)   
    console.log(data)
    return data 
}  
