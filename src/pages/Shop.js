import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import  "react-bootstrap";
import { Context } from "../index";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import TypeBar from "../components/TypeBar";
import { fetchBrand, fetchDevice,  fetchTable,  fetchTypes } from "../http/deviceAPI";
import Pages from "../components/Pages";
import SelectionTable from "../components/SelectionTable";
import '../assets/Header.css'
import Order from "../components/Order";
const Shop = observer(() => {
    const {device} = useContext(Context)
    console.log(device)
    device.setLimit(6)
    useEffect(() => {
        console.log('useEffect SHOP')
        fetchTypes().then(data => device.setTypes(data))
        fetchBrand().then(data => device.setBrands(data))
        fetchDevice(null, null, 1, device._limit).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count) 
        }
    )

    }, [])

    useEffect(() => {
      console.log('useEffect SHOP')
        fetchDevice(device._selectedType.id, device._selectedBrand.id, device._page, device._limit).then(data => {
          console.log(data)
          device.setDevices(data.rows)
          device.setTotalCount(data.count) 
        
          const NewElements = [];   
          console.log(device._tableDevices)
          fetchTable().then(data => {
      
          data.map((element) => {
      
            const arrayObject = []
            for (let stroke in element) {   
              
              if (element.hasOwnProperty(stroke) && stroke!="updatedAt" && stroke!="createdAt" && stroke!="rating") {
                arrayObject.push(element[stroke])
              }
            }
            // console.log(arrayObject)
            NewElements.push(arrayObject)
          }) 
          
          device.setTableDevices(NewElements)
          })
        });
        }, [device._page,device._selectedType, device._selectedBrand])   
    
    return (
            <div className="container-fluid" style={{backgroundColor:"#F1F0EB",padding:'1% 5%',minHeight:'100%',paddingTop:'210px'}}>

            <div className="row mt-2">

                <div  className="col-3">
                    <TypeBar/>
                </div>
       
                <div className="col-9 zindex"> 
                    <BrandBar/> 
                    <DeviceList/>
                    <Pages/>
                    {/* <SelectionTable/> */}
                </div>

            </div>
        </div>
    );
});

export default Shop