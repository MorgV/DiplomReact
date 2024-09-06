import { observer } from 'mobx-react-lite'
import React,{input, useContext, useEffect, useState} from 'react'
import { Form, Modal } from 'react-bootstrap'
import '../assets/Order.css'
import ShoppingList from './ShoppingList';
import { sendMessage } from '../http/deviceAPI';
import { Context } from '../index';
import uuid from 'react-uuid';

const Order = observer(({show,onHide,sum}) => {
  const {device} = useContext(Context)
  const {user} = useContext(Context)
  const [valueEmail,setValueMail] = useState(user._user+'')
  const [usl,setUsl] = useState(false)

  const [orderNumber,setOrderNumber] = useState(uuid)
  const [FIO,setFIO] = useState('')
  const [phone,setPhone] = useState('')



  const order = () => {
    if (usl && valueEmail && FIO && phone){
      try {
        sendMessage(valueEmail,orderNumber,device._basketDevices,sum,phone,user._id,FIO).then(data => console.log(data))
        alert('Сообщение по заказу успешно доставлено')
        onHide()
        setUsl(false)
      } catch (error) {
        console.log(error.message)
      }
    }
    else{
      alert('Заполните контактные данные и подтвердите согласие на обработку Персональных данных')
    }
  }

console.log(device._basketDevices)

  return (
    <div className='order-wrapper'>
    <Modal  show={show} onHide={onHide} class="modal-dialog modal-dialog-scrollable">
    
    {/* <div class="modal-content"> */}
    <Modal.Header class="modal-header" closeButton>
        <h5 class="modal-title" id="exampleModalLongTitle">Заказ №{orderNumber}</h5>
    </Modal.Header>

    <div class="modal-body">
    <div className='order-info'>
    <div style={{borderBottom: '1px solid #9fa6b27b'}} >
        
        <p>Адрес электронной почты:</p>
        <input type="text" class="form-control" value={valueEmail} onChange={e => setValueMail(e.target.value)} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" value={valueEmail}/>
        
        <p>Укажите ФИО получателя</p>
        <input value={FIO} onChange={e => setFIO(e.target.value)} type="text" class="form-control" placeholder="ФИО получателя" aria-label="Username" aria-describedby="basic-addon1"/>
        
        <p>Укажите номер телефона</p>
        <input value={phone} onChange={e => setPhone(e.target.value)} type="text" class="form-control" placeholder="Номер телефона" aria-label="Username" aria-describedby="basic-addon1"/>
     
        <div style={{margin:'10px 0 '}}>
          <input class="form-check-input" style={{margin:'3px 5px'}} type="checkbox" onChange={() => setUsl(!usl)}  value={usl} id="flexCheckDefault"/>
          Согласие на обработку <a href='https://lyceum15.gosuslugi.ru/netcat_files/168/2854/Federal_nyy_zakon_ot_27.07.2006_N_152_FZ.pdf?ysclid=lviie2izk7277375729'>Персональных данных</a>
       </div>
      </div>
      <p style={{margin:'10px 0 0 0'}}>Адрес доставки: ул. Куйбышева, 26-К, Владимир, Владимирская обл., 600009</p>
    </div>
    <ShoppingList basketDevices = {device._basketDevices} />
    </div>
    <Modal.Footer>
        <button type="button" class="btn btn-secondary"  onClick={onHide} data-dismiss="modal">Закрыть</button>
        <button type="button" class="btn btn-primary" onClick={() => order()} >Заказать</button>
    </Modal.Footer>
    

</Modal>  
    </div>
  )
})

export default Order