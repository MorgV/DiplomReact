import React from 'react'
import '../assets/NavBar.css'
import { CONTACTS2_ROUTE, CONTACTS_ROUTE, SHOP_ROUTE } from '../utils/constans'

const Footer = () => {
  return (
    <div className='footer'>
        <div className='container'>
            <nav className='footer-menu'>
                <ul className='footer-menu-list'>
                    <li className='footer-menu-item'>
                        <p className='footer-menu-title'>Контакты</p>
                    </li>
                    <li className='footer-menu-item'>
                        <a className='footer-menu-link' href={CONTACTS2_ROUTE}>- Адрес</a>
                    </li>
                    <li className='footer-menu-item'>
                        <a className='footer-menu-link' href={CONTACTS2_ROUTE}>- Номера телефона</a>
                    </li>
                    <li className='footer-menu-item'>
                        <a className='footer-menu-link' href={CONTACTS2_ROUTE}>- Режим работы</a>
                    </li>
                </ul>
                <ul className='footer-menu-list'>
                    <li className='footer-menu-item'>
                        <p className='footer-menu-title'>Магазин</p>
                    </li>
                    <li className='footer-menu-item'>
                        <a className='footer-menu-link' href={SHOP_ROUTE}>- Заказать товар</a>
                    </li>

                </ul>
                <ul className='footer-menu-list'>
                    <li className='footer-menu-item'>
                        <p className='footer-menu-title'>О нас</p>
                    </li>
                    <li className='footer-menu-item'>
                        <a className='footer-menu-link' href={CONTACTS_ROUTE}>- Информация об организации</a>
                    </li>
                    <li className='footer-menu-item'>
                        <a className='footer-menu-link'  href={CONTACTS_ROUTE}>- Мы на карте</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
  )
}

export default Footer