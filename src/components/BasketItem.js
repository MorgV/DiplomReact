import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Button, Image, } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { deleteDevice, updateCount } from '../http/deviceAPI';
import { Context } from '../index';
import { DEVICE_ROUTE } from '../utils/constans';


const BasketItem = observer(({item,sumChange,index,countDevice,setSum,setLength,length,setChisla,chisla}) => {
    console.log(item)
    const navigate = useNavigate()
    const {user,device} = useContext(Context)
    const [count, setCount] = useState(1) // Сет каунт меняет не то
    const changeCount = (operator) => {
      if(operator == true ){
        setCount(count+1)
        updateCount(user._id,item.id,count+1).then(data => console.log(data))
        device._basketDevices[index].countDevice = count+1
        console.log(device._basketDevices[index])
      }else if(count != 1){
        setCount(count-1)
        updateCount(user._id,item.id,count-1).then(data => console.log(data))
        device._basketDevices[index].countDevice = count-1
        console.log(device._basketDevices[index])
      }
    }

    useEffect(() =>{
        console.log(item.price * count)
        sumChange(item.price * count,index)

        console.log('two')

    }, [count])
    
    useEffect(() =>{
      if(!user._isAuth){
        device._basketDevices = []
        setSum(0)
      }
  }, [user._isAuth])
    const ids = (origin) =>  {
      const res = [];
      origin.forEach(item => res.push(item.deviceElement.id));
      return res; 
    }
    console.log(chisla)

    const DeleteBasketItem = () => {
      let numberElem = chisla[0].findIndex(el => el === (item.price * count))
      console.log(numberElem)
      sumChange(0,numberElem,0)
      device._basketDevices.splice(index,1)
      setLength(!length)

      console.log(item.id)
      console.log(device._basketDevices)
      localStorage.setItem('BasketItems', JSON.stringify(ids(device._basketDevices)))
      deleteDevice(user._id,item.id).then(data => console.log(data))
    }
console.log(item)
  return (
    <div className='item'>  
          <Image className='img imgSpecial' onClick={() => navigate(DEVICE_ROUTE + "/" + item.id)} src={process.env.REACT_APP_API_URL + item.img}/>
         <span className='item-text'>
           <span className='text'>{item.name}</span>
           <p className='prices '>{item.price * count + " руб."}</p>
           <div className='counter'>
           <Button onClick={() => changeCount(false)} variant='dark' className='outline-dark'>-</Button>
            <input 
              disabled={'disabled'} 
              class="form-control " 
              value={count}
            ></input>
            <Button  onClick={() => changeCount(true)} variant='dark' className='outline-dark'>+</Button>
         </div>
         <Button onClick={() => DeleteBasketItem()} className={'button-delete'} variant='link' >Delete</Button>
         </span>
    </div>
  )
})

export default BasketItem