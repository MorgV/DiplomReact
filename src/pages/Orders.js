import React, { useEffect, useState } from 'react'
import '../assets/NavBar.css'

import DataTable from 'react-data-table-component';
import { fetchAllOrders } from '../http/deviceAPI';
import { useNavigate } from 'react-router-dom';
import { ORDERS_ROUTE, SHOP_ROUTE } from '../utils/constans';
import { useParams } from 'react-router-dom';
import OrdersPage from './OrdersPage';
import OrdersPage1 from './OrdersPage';



const Orders = () => {
const {id} = useParams()
const navigate = useNavigate()
  const columns = [
    { name: 'Номер заказа', selector: row => row.orderNumber, sortable: true },
    { name: 'ФИО', selector: row => row.FIO, sortable: true },
    { name: 'Почта', selector: row => row.mail, sortable: true },
    { name: 'Телефон', selector: row => row.phone, sortable: true },
    { name: 'Сумма в руб.', selector: row => row.sum, sortable: true },
    { name: 'Статус', selector: row => row.status, sortable: true },
    // Add more columns as needed
  ];
  useEffect(() => {
    fetchAllOrders(id).then(e => {
      console.log(e)
      setData(e.rows)
    })
  }, [])
  
  const [data,setData] = useState([])

  const [orderVisible,setOrderVisible] = useState(false)
  const [sum,setSum] = useState()

  const order = (e) => { 
    setSum(e)
    setOrderVisible(!orderVisible)
   }

  return (
<div style={{paddingTop:"185px"}} className='container'>
{sum?<OrdersPage1  sum={sum} show={orderVisible} onHide={() => setOrderVisible(false)} /> : <div></div>}

  <DataTable
    title="Список заказов"
    columns={columns}
    data={data}
    pagination
    onRowClicked={e => order(e) }
  />
</div>
  )
}

export default Orders