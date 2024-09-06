import React, { useEffect, useState } from 'react'
import '../assets/NavBar.css'
import { Helmet } from 'react-helmet'
import { SHOP_ROUTE } from '../utils/constans'
import { Swiper, SwiperSlide } from 'swiper/react';
import {EffectFade, Autoplay, Pagination, Navigation } from 'swiper/modules';
// Import Swiper React components

import 'swiper/css/bundle'
const Contacts = () => {
  const [bool,setBool] = useState(true)
  
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
      <section className='top'>
        <div className='container'>
          <h1 className='title'>
            Запчасти для форда
          </h1>
          <a className='top-link' href={SHOP_ROUTE}>
            Купить запчасти
          </a>
        </div>
      </section>
      <div className='slider'>
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
        <SwiperSlide><img className='swiper-img' src={process.env.REACT_APP_API_URL+'car.jpeg'}></img></SwiperSlide>
        <SwiperSlide><img className='swiper-img' src={process.env.REACT_APP_API_URL+'car1.jpg'}></img></SwiperSlide>
        <SwiperSlide><img className='swiper-img' src={process.env.REACT_APP_API_URL+'car3.jpeg'}></img></SwiperSlide>
        <SwiperSlide><img className='swiper-img' src={process.env.REACT_APP_API_URL+'car4.jpg'}></img></SwiperSlide>
      </Swiper>
      </div>
      <section className='onas'>
        <div className='container'>
        <h2 className='onas-title'>
                О нас
              </h2>
          <div className='onas-inner'>
            <div className='inner-1'>
              <p className='onas-text'>
                Наш магазин "запЧасти дляФорда "ведет свою деятельность с 1991 года, первоначально специализируясь на автозапчастях отечественных марок. С середины нулевых в ассортименте появились запчасти для популярных моделей иномарок, одной из которых был Форд Фокус-2. Так продажа товаров для автомобилей марки Форд стали основным направлением нашей деятельности, и остаётся им до сих пор, несмотря на постоянно расширяющийся ассортимент позиций по другим маркам автомобилей.
              </p>
              </div>
            <div className='inner-2'><img style={{width:'100%'}} src={process.env.REACT_APP_API_URL+'Онас.jpeg'}></img></div>

          </div>
        </div>
      </section>
      <section className='params'>
        <div className='container'>
          <ul className='params-list'>
            <li className='params-item'>
              <img className='params-item-img' src={process.env.REACT_APP_API_URL+'картинка1.svg'} alt=''></img>
              <h3 className='params-title'>Доверие постоянных клиентов</h3>
              <p className='params-text'>97% клиентов довольны нашей работой</p>
            </li>
            <li className='params-item'>
              <img className='params-item-img' src={process.env.REACT_APP_API_URL+'картинка2.svg'} alt=''></img>
              <h3 className='params-title'>Гарантия сервисного центра</h3>
              <p className='params-text'>Предоставляем гарантию на работы и запасные части</p>
            </li>
            <li className='params-item'>
              <img className='params-item-img' src={process.env.REACT_APP_API_URL+'картинка3.svg'} alt=''></img>
              <h3 className='params-title'>Прозрачность и открытость</h3>
              <p className='params-text'>Честные цены, смета работ и ремонт в вашем присутствии</p>
            </li>
            <li className='params-item'>
              <img className='params-item-img' src={process.env.REACT_APP_API_URL+'картинка4.svg'} alt=''></img>
              <h3 className='params-title'>Специализация и оборудование</h3>
              <p className='params-text'>Профильное оборудование и квалификация специалистов</p>
            </li>
          </ul>
        </div>
      </section>
      <div className='container'>
      <h2 className='onas-title'>
        Мы на карте
      </h2>
        <div className='map'>
        <div id="yandex-map" style={{ width: '1280px', height: '505px',padding: '0 auto', }}></div>
        </div>
      </div>
    </div>
  )
}

export default Contacts