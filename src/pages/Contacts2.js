import React, { useEffect } from 'react'
import '../assets/NavBar.css'
import { Helmet } from 'react-helmet'
import { SHOP_ROUTE } from '../utils/constans'
import { Swiper, SwiperSlide } from 'swiper/react';
import {EffectFade, Autoplay, Pagination, Navigation } from 'swiper/modules';
// Import Swiper React components

import 'swiper/css/bundle'
const Contacts = () => {
  useEffect(() => {
    if (!document.getElementById('yandex-map-script')) {
      const script = document.createElement('script');
      script.id = 'yandex-map-script';
      script.type = 'text/javascript';
      script.charset = 'utf-8';
      script.async = true;
      script.src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A17374dec5995dbea92781a3ac16e666b2ae849d3b29838c4e3739a6eb744e7d9&amp;width=1280&amp;height=505&amp;lang=ru_RU&amp;scroll=true';
      document.getElementById('yandex-map').appendChild(script);
    }
  }, []);
  return (
    <div className='main'>
      <div className='container'>
      <h2 style={{padding:'270px 0 50px 0',}} className='onas-title'>
        Специализированный магазин "Запчасти для форда"
      </h2>
      <div className='slider1'>
        <Swiper
          effect={'fade'}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[EffectFade,Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide><img className='swiper-img' src={process.env.REACT_APP_API_URL+'1.jpg'}></img></SwiperSlide>
          <SwiperSlide><img className='swiper-img' src={process.env.REACT_APP_API_URL+'2.jpg'}></img></SwiperSlide>
          <SwiperSlide><img className='swiper-img' src={process.env.REACT_APP_API_URL+'3.jpg'}></img></SwiperSlide>
        </Swiper>
      </div>
      <section style={{paddingBottom:'50px'}} className='onas'>
        <div className='container'>
        <h2 className='onas-title'>
                Контактные данные
        </h2>
<div style={{justifyContent:'left',height:'327px'}}className='onas-inner'>
          <div style={{maxWidth:'565px'}} className='inner-1'>
            <ul style={{display:'flex',flexDirection:"column",padding:'0',justifyContent:'start'}} >
                <li className='params-item1'>
                  <h3 className='params-title1'>Адрес:</h3>
                  <p className='params-text'>Г.Владимир ул.куйбышева 26к ТЦ Самохвал секция №18</p>
                </li>
                <li className='params-item1'>
                  <h3 className='params-title1'>Номерa телефона:</h3>
                  <p>
                    <a href='tel:+7(4922)471237' className='params-item-tel'>+7(4922)471237</a>
                    <br></br>
                    <a href='tel:+79106794479' className='params-item-tel'>+79106794479</a>
                  </p>
                </li>
                <li className='params-item1'>
                  <h3 className='params-title1'>Режим работы:</h3>
                  <p className='params-text'>Пн-Пт - с 9-00 до 19-00 <br/> Сб - с 9-00 до 15-00 <br/>Вс - с 9-00 до 16-00</p>
                </li>

              </ul>
          </div>
          <div id="yandex-map" style={{ width: '100%', height: '100%',padding: '0 auto', }}></div>

</div>

        </div>
      </section>
      </div>

      
      <div className='container'>
      </div>
    </div>
  )
}

export default Contacts