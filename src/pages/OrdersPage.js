import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../index'
import '../assets/NavBar.css'
import Order from '../components/Order'
import ShoppingList from '../components/ShoppingList'
import { fetchOneDevice, fetchOneOrder, sendMessage } from '../http/deviceAPI'
import { useParams } from 'react-router-dom'
import { Modal } from 'react-bootstrap'

  
const OrdersPage1 = ({show,onHide,sum}) => {
  let newArray =[]
  let {id} = useParams()
  useEffect(() => {
    let newArray =[]
    fetchOneOrder(id).then(data => {
      newArray = data.rows.map(el => fetchOneDevice(el.DeviceId))
      console.log(data)
      console.log(newArray)

    })
    setPhone(sum.phone)
    setFIO(sum.FIO)
    setOrderNumber(sum.orderNumber)
  }, [])

  
  const {device} = useContext(Context)
  const {user} = useContext(Context)
  const [valueEmail,setValueMail] = useState("erikhan03@gmail.com")
  const [usl,setUsl] = useState(false)
  console.log(sum)
  const [orderNumber,setOrderNumber] = useState()
  const [FIO,setFIO] = useState()
  const [phone,setPhone] = useState()



  const order = (i) => {
    if (usl && valueEmail && FIO && phone && !i){
      try {
        alert('Заказ одобрен')
        onHide()
      } catch (error) {
        console.log(error.message)
      }
    }
    else{
      alert('Заказ удален')
      onHide()

    }
  }

console.log(device._basketDevices)

  return (

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
     

      </div>
    </div>
    {/* <ShoppingList basketDevices = {device._basketDevices} /> */}
    </div>
    <Modal.Footer>
        <button type="button" class="btn btn-secondary"  onClick={onHide} data-dismiss="modal">Закрыть</button>
        <button type="button" class="btn btn-secondary"  onClick={() => order('qwd')} data-dismiss="modal">Удалить</button>
        <button type="button" class="btn btn-primary" onClick={() => order()} >Подтвердить</button>
    </Modal.Footer>
    

</Modal>  

  )
}

export default OrdersPage1