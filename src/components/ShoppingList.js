import React, { useContext } from 'react'
import { Context } from '../index'
import '../assets/ShoppingList.css'
import { Image } from 'react-bootstrap'

const ShoppingList = ({basketDevices}) => {
  return (
    <div className='ShoppingList-container'>
        <h5>Товар</h5>
        <div className='ShoppingList-table'>
        {basketDevices.map((item,index) => 
        <div className='ShoppingList-item'>
            <Image style={{width:'160px',height:'160',margin:0, padding:'10px'}} className='img' src={process.env.REACT_APP_API_URL + item.deviceElement.img}/>
            <div>{item.countDevice} Шт.</div>
        </div>
       )}
        </div>
    </div>
  )
}

export default ShoppingList