import React, {  useContext, useEffect, useState } from 'react'
import { Context } from '../index'

//Bootstrap components
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
//BSC end
import { observer } from "mobx-react-lite";
import {useNavigate} from 'react-router-dom'
import {ADMIN_ROUTE,CONTACTS2_ROUTE,CONTACTS_ROUTE,LOGIN_ROUTE, SHOP_ROUTE} from '../utils/constans'

// style
import '../assets/Search.css'
import { FaSearch } from "react-icons/fa"; // search icons
import { BsBasket2Fill } from "react-icons/bs"; // basket icons

import Basket from './Basket';
import "../assets/Header.css"
import { fetchDevice, fetchTable } from '../http/deviceAPI';
import { Image } from 'react-bootstrap';
import '../assets/NavBar.css'


const NavBar = observer(() =>  {
    const {user} = useContext(Context)
    const {device} = useContext(Context)
    const navigate = useNavigate()
    var pathname = window.location.pathname;

    useEffect(() => {
      const header = document.getElementById('header')
      var imgElement = document.getElementById('myImage');

      if(pathname == "/"){
        imgElement.src = process.env.REACT_APP_API_URL + 'm1.svg';
        console.log(pathname+ " "+ imgElement.src+ " " + header.classList)
          console.log(pathname+ " "+ imgElement.src+ " " + header.classList)
          header.classList.remove('header');
          header.classList.add('header-transparent');
        
      }else{
          console.log(pathname+ " "+ imgElement.src+ " " + header.classList)
          header.classList.add('header');
          header.classList.remove('header-transparent');
          // Меняем атрибут src на новый URL
          imgElement.src = process.env.REACT_APP_API_URL + 'm2.svg';
      }
    }, [])
    

    const logOut = () => {
      user.setUser({})
      user.setAuth(false)
      user.setUser('')
      localStorage.setItem('isAuth', false)
      console.log(user)
    } 

    const openBasket = () => {
      let elem = document.getElementsByClassName('wrapper-cart')[0];
      console.log(elem)
      if(!elem.classList.contains('scale-in-tr')){
        elem.classList.add('scale-in-tr')
        elem.classList.remove('scale-out-top')
      }else{
        elem.classList.remove('scale-in-tr')
        elem.classList.add('scale-out-top')
      }
      
    }
    const [search,setSearch] = useState('')

    const toSearch = (text) => {
      fetchDevice(device._selectedType.id, device._selectedBrand.id, device._page, device._limit,text).then(data => {
        console.log(data)
        device.setDevices(data.rows)
        device.setTotalCount(data.count) 
      
        const NewElements = [];   
        console.log(device._tableDevices)
        fetchTable().then(data => {
    
        data.map((element) => {
    
          const arrayObject = []
          for (let stroke in element) {   
            
            if (element.hasOwnProperty(stroke) && stroke!="updatedAt" && stroke!="createdAt") {
              arrayObject.push(element[stroke])
            }
          }
          // console.log(arrayObject)
          NewElements.push(arrayObject)
        }) 
        
        device.setTableDevices(NewElements)
        })
      });
    }
    return (
        <div className='wrapper-header'>
          <header id='header' className='header header-main  '>
            <div className='container-header'>
              <div className='header-inner'>
                <a className='logo' href={CONTACTS_ROUTE}>
                <img id='myImage' style={{height: '100px'}} src={ process.env.REACT_APP_API_URL + 'm1.svg'} class="img-fluid"></img>
                </a>
                <nav className='menu'>
                  <ul style={{margin:0,display:'flex',alignItems:'flex-end'}} className='menu-list'>
                  {pathname == '/shop' ? <span style={{right: '6.5%'}} className='search-box-navBar me-2 d-flex'>
                  <input className='search-txt' onChange={e => setSearch(e.target.value)} type='text' placeholder='Нажми чтобы найти'/>
                  <a className='search-btn' onClick={() => toSearch(search)} ><FaSearch /></a>
                </span>:<div></div>}
                    <li className='menu-list-item'>
                      <a className='menu-list-link'  href={CONTACTS2_ROUTE}>Контакты</a>
                    </li>
                    <li className='menu-list-item'>
                      <a className='menu-list-link'  href={SHOP_ROUTE}>Запчасти</a>
                    </li>
                    {!user.isAuth ? 
                      (<li className='menu-list-item'>
                      <a className='menu-list-link'  href={LOGIN_ROUTE}>Авторизация</a>
                    </li>
                    ):(
                      <div>
                      {user._role == 'ADMIN'  ?(
                      <li className='menu-list-item'>
                       <a className='menu-list-link'  href={ADMIN_ROUTE}>Админ панель</a>
                      </li>)
                      :
                      (<div>
                        <div onClick={() => openBasket()} className='open-basket'>
                        <div className='badge'>{device._basketDevices.length  ? device._basketDevices.length : ""}</div>     
                          <BsBasket2Fill color='white' size={'40px'}/>
                      </div>
                      <Basket />
                      </div>)
                      }
                    </div>)
                    }
                    {!user.isAuth ? (<div></div>):
                                        <li className='menu-list-item'>
                                        <a className='menu-list-link' href='' onClick={() => logOut()}>Выйти</a>
                                      </li>}

                  </ul>
                </nav>
              </div>
            </div>
          </header>
        </div>
);
})

export default NavBar

