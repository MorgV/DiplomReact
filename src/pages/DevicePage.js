import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Container, Image } from "react-bootstrap";
// import { FaRubleSign } from "react-icons/fa";
import {useNavigate, useParams} from 'react-router-dom'
import { fetchOneDevice, fetchBasket, AddToBasket, fetchDevice } from "../http/deviceAPI";
import { check } from "../http/UserAPI";
import { Context } from "../index";
import { SHOP_ROUTE } from "../utils/constans";

const DevicePage = () => {
    const navigate = useNavigate()
    const context = useContext(Context)
    const [device, setDevice1] = useState({info:[]}) 
    const {id} = useParams()
    useEffect(() =>{
        fetchOneDevice(id).then((data) => setDevice1(data))
        console.log("qwd")
        
        fetchDevice(context.device._selectedType.id, context.device._selectedBrand.id, context.device._page, context.device._limit).then(data => {
            console.log(data)
            console.log("qwd")
            context.device.setDevices(data.rows)
            context.device.setTotalCount(data.count) 

        });
         
    
    },[])
    console.log(device)


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
                    // device._basketDevices.push(device)
                    navigate(SHOP_ROUTE)
                    alert('Товар успешно добавлен в корзину')
                    window.location.reload() 
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
    return (
        <Container style={{paddingTop:'185px'}} className="mt-3">
            <div className="row">
                <div className="col-4">
                    <Image width={300} height={300} src = {process.env.REACT_APP_API_URL + device.img}/>
                </div>

                <div className="col-4 ">
                    <div className="row d-flex justify-content-center">
                        <h2 style={{textAlign: 'center'}}>{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{background: `url(${'https://pngicon.ru/file/uploads/zvezda.png'})`, width:260, height:248, backgroundSize:'cover', fontSize:64}}
                        >
                            <div>{device.rating}</div>
                        </div>  
                    </div>
                </div>

                <div className="col-4">
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width:300, height:300,fontSize:32, border: '5px solid lightgray'}}
                    >
                        <h3>От {device.price}  руб.</h3>
                        <Button onClick={() => addToBasket()} variant="outline-dark">Добавить в корзину</Button>
                    </Card>
                </div>
            </div>
            <div className="row d-flex flex-column mt-3">
                
                {device.info.map((info,index) =>
                <div key={info.id} className="row " style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding:'10px'}}>
                    {info.title +" : "+ info.description}
                </div>)}
            </div>
        </Container>
    );
};

export default DevicePage