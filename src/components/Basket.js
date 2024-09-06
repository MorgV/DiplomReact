import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import BasketItem from './BasketItem'

import { BsBasket2Fill } from "react-icons/bs"; // basket icons
import { Context } from '../index';
import '../assets/Header.css'
import { observer } from 'mobx-react-lite';
import { AddToBasket, fetchBasket, fetchOneDevice } from '../http/deviceAPI';
import Order from './Order';
import { LOGIN_ROUTE } from '../utils/constans';


const Basket = observer(() => {
const {device,user} = useContext(Context)
const sum1 = []

device._basketDevices.map(item => {item!=undefined ? sum1.push(Number(item.price)) : console.log('first')})
const sum2 = sum1.reduce((acc, number) => acc + number, 0)

const [chisla,setChisla] = useState([sum1])
const [sum,setSum] = useState(sum2)
const [length, setLength] = useState(false)
const [chil, setChil] = useState(false)



useEffect(() => {
console.log('useEffect Basket')
const corzina = document.getElementById('corzina')

if(!corzina.classList.contains('corzina')){
  fetchBasket(user._id).then(data => {
    console.log(device._basketDevices)
    console.log(data)
    console.log('BASKET')
    data.forEach((element,i) => {
      console.log(device._basketDevices.length)
      console.log(data.length )
        
          fetchOneDevice(data[i].deviceId).then(e => {
            if(data.length > device._basketDevices.length){
            const el = {
              countDevice: element.countDevice,
              deviceElement: e 
            }
            device._basketDevices.push(el)
            setChil(true)
          }
          })
          console.log(device._basketDevices)
        
    });})
}else{
    corzina.classList.remove('corzina');
    // Меняем атрибут src на новый URL
}
 
},[])


// Изменение Суммы --
const sumChange = (count,index,value) => { // Создает массив с суммами (count* price)
  let copy = Object.assign([], chisla);
  if(value){
    copy[0].splice(index,1) 
    console.log(copy)
    setChisla(copy)
  }else{
    copy[0].splice(index,1,count) 
    setChisla(copy)}
}
useEffect(() => {setSum(chisla[0].reduce((acc, number) => acc + number, 0)); console.log('Перерасчет')},[chisla]) // Суммирует массив
// -- изменение Суммы конец

  const [orderVisible,setOrderVisible] = useState(false)
  const order = () => { 
    setOrderVisible(!orderVisible)
   }
   console.log(device._basketDevices)
return (
    <div className='wrapper-cart'>
        <div id='corzina' className='basket-text '>Корзина</div>

        {device._basketDevices.length ? <div className='cart'>
            {device._basketDevices.map((item,index) => <BasketItem length={length} setChisla={setChisla} chisla={chisla} setLength ={setLength} key={index} setSum={setSum} countDevice={item.countDevice}  sumChange={sumChange} index={index} item={item.deviceElement}/>)} 
        </div> : <div>{user._isAuth ? <p style={{fontSize: '18px'}} className='basket-text'>Корзина пуста</p> : <p style={{fontSize: '18px'}} className='basket-text'>Вы не авторизованы. Чтобы добавить товар в корзину <a style={{color:'#42AAFF'}} href={LOGIN_ROUTE}>авторизуйтесь</a>.</p> }</div>}
       <div className='footer-basket'>
          <div className='basket-footer'>
            <div>Сумма: </div>  
            <span>{user._isAuth ? sum : '0'} руб.</span>
          </div>
          <Order sum={sum} show={orderVisible} onHide={() => setOrderVisible(!orderVisible)}/>
          { user._isAuth && device._basketDevices.length ?
            <button type='button'  onClick={() => order()} className="btn btn-outline-success"  style={{margin:'0 0 0 10px'}}>Заказать</button>
            :
            <button type='button' disabled={true}  onClick={() => order()} className="btn btn-outline-success"  style={{margin:'0 0 0 10px'}}>Заказать</button>
          }
       </div>
    </div>
  )
})

export default Basket