import React, { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";

import CreateType from "../components/modals/CreateType";
import CreateDevice from "../components/modals/CreateDevice";
import SelectionTable from "../components/SelectionTable";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchDevice, fetchTable } from "../http/deviceAPI";
import { ORDERS_ROUTE } from "../utils/constans";
import { useNavigate } from "react-router-dom";


const Admin = observer(() => {
    const navigate = useNavigate()
    const {device} = useContext(Context)
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)
    const [deviceTableVisible, setDeviceTableVisible] = useState(true)
    
 
    return (
        <Container style={{paddingTop:'185px',height:'40lh'}} className="d-flex flex-column">
            <Button variant={'outline-dark'} onClick={() => setTypeVisible(true)} className="mt-4 p-2">Добавить тип</Button>
            <Button variant={'outline-dark'} onClick={() => setBrandVisible(true)} className="mt-4 p-2">Добавить бренд</Button>
            {/* <Button variant={'outline-dark'} onClick={() => setDeviceVisible(true)} className="mt-4 p-2">Добавить товар</Button> */}
            <Button variant={'outline-dark'} onClick={() => setDeviceTableVisible(!deviceTableVisible)} className="mt-4 p-2">Добавить товар</Button>
            <Button variant={'outline-dark'}  onClick={() => navigate(ORDERS_ROUTE)}   className="mt-4 p-2">Заказы</Button>

            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateDevice  show={deviceVisible} onHide={() => {
                setDeviceVisible(false);
                device.setSelectedBrand([]); 
                device.setSelectedTableDevice([]);
                device.setSelectedType([]); 
            }}/>
            <SelectionTable deviceTableVisible={deviceTableVisible} setDeviceTableVisible={setDeviceTableVisible} setDeviceVisible={setDeviceVisible}/>
            <div style={{height:'100%'}} ></div>
        </Container>
    );
});

export default Admin