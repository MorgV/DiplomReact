import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Image } from 'react-bootstrap'
import { MdOutlineStarBorderPurple500 } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import {DEVICE_ROUTE, SHOP_ROUTE} from '../utils/constans'
import {Context} from '../index'
import '../assets/DeviceItem.css'
import { AddToBasket, fetchBasket } from '../http/deviceAPI';

const DeviceItem = ({device, dev}) => {
    const context = useContext(Context)
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [show1, setShow1] = useState(true)
    console.log(context.device._basketDevices)
    console.log(device)
    const [BasketItems,setBasketItems] = useState()
    const [inBasket, setInBasket] = useState(false)
    
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('BasketItems'))) {
            const ls = JSON.parse(localStorage.getItem('BasketItems')) 
            console.log(ls)
            setInBasket(false)
            if(ls.length > 0){
                ls.map((id) => {
                    console.log('Внутривенно')
                    if(device.id === id){
                        setInBasket(true)
                    }
                })
            }
        }
    }, [show])
    
    console.log(inBasket)
    const ids = (origin) =>  {
        const res = [];
        origin.forEach(item =>  res.push(item.deviceElement.id));
        return res; 
      }
    const addToBasket = () => {
        try {
            fetchBasket(context.user._id).then(data => {
                let bool = true
                data.forEach(element => {
                    if(element.deviceId == device.id ){
                        bool = false
                        navigate(SHOP_ROUTE)
                        alert('Данный товар уже добавлен в корзину')
                        window.location.reload() 
                    }
                });
                if(bool){   
                    AddToBasket(context.user._id,device.id,1)
                    const el = {
                        countDevice: 1,
                        deviceElement: device,
                      }
                    context.device._basketDevices.push(el)
                    navigate(SHOP_ROUTE)
                    alert('Товар успешно добавлен в корзину')

                    localStorage.setItem('BasketItems', JSON.stringify(ids(context.device._basketDevices)))
                    setInBasket(true)
                }
                console.log('sdqw')
            })
        } catch (error) {
            alert(error.response.data.message)
        }
        // console.log(context.user._id)
    //    fetchBasket(context.user._id).then((data) => console.log(data))
        // fetchBasket
    
    }
    // const dev = useContext(Context)
    console.log(inBasket)
    return (
        <div onMouseOver={() => setShow(true)} onMouseOut={() => setShow(false)}   className='dev-item1 col mt-3' onClick={() => {!show1 && navigate(DEVICE_ROUTE + "/" + device.id)}}>
            <Card className='cart1 ramka-4'style={{}} >

                <Image className='img1  p-0  m-0' src={process.env.REACT_APP_API_URL + device.img} />
                <div className='d-flex justify-content-between'>
                    <div className='name1'>{device.name}</div>
                    {/* <div className='rating d-flex align-items-center mt-1'>
                            {dev ? dev[5] : ""} 
                            <MdOutlineStarBorderPurple500 /> 
                    </div> */}
                </div>
                <h5 className='id1'>{dev ? dev[2] : ""}</h5>   
                <div className='price1'>{device.price} руб.</div>    
                {show && <Button onMouseOver={() => setShow1(true)} onMouseOut={() => setShow1(false)}  style={{margin: '10px 0 0 0',width: '100%'}} onClick={() => addToBasket()} variant="outline-dark">{inBasket ? 'В корзине' : 'Добавить в корзину'}</Button>}
            </Card>
            
        </div>
    )
  
}

export default DeviceItem