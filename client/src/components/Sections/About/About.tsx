import React from 'react'
import counts from '@/assets/img/about.svg'
import {data} from './data'
import './About.scss'

const About = () => {
  return (
    <section className='About'>
        <div className="container">
            <div className="About__wrapper">
                <div className="About__img">
                    <img src={counts} alt="counts" />
                </div>
                <div className="About__content">
                    <hr className='About__hr'/>
                    <div className="About__title">О ПРОИЗВОДСТВЕ</div>
                    <div className="About__description">Компания <b>Aliot</b> обладает современными производственными мощностями, которые позволяют осуществлять высококачественную сборку низковольтных комплектных устройств (НКУ) любой степени сложности в кратчайшие сроки. <span>Среди нашей продукции находятся:</span></div>
                    <ul className='About__list'>
                        {data.map((item, i) => (
                            <li key={i} className='About__link'>{item.title}</li>
                        ))}
                    </ul>
                    <div className="About__description">Это лишь небольшая часть обширного ассортимента оборудования, успешно собираемого на нашем предприятии</div>
                </div>
            </div>
        </div>
    </section>
  )
}

export {About}