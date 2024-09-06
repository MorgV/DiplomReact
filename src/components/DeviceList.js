import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { fetchDevice } from '../http/deviceAPI';
import { Context } from '../index'
import DeviceItem from './DeviceItem'

const DeviceList = observer(() =>  {
    const {device} = useContext(Context)

    // console.log(device._devices)
    console.log(device._tableDevices[1])
    return (
        <div className='row row-cols-1 row-cols-md-3 '>
            {device._devices.map((dev) => 
            <DeviceItem key={dev.id} device={dev} dev={device._tableDevices[dev.deviceTableId]}/>)} 
        </div>
    );
});
// dev.deviceTableId

export default DeviceList