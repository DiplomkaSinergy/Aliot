import React from 'react'
import AssortmentItem from './AssortmentItem'
import {data} from './data'
import './Assortment.scss'
import { Paths } from '@/app/Routes/Types/paths'
import { Link } from 'react-router-dom'

const Assortment = () => {
  return (
    <section className='Assortment'>
        <div className="container">
            <hr className='Assortment__hr'/>
            <div className="Assortment__title">АССОРТИМЕНТ</div>
            <div className="Assortment__subtitle">Мы являемся надежным поставщиком низковольтного электрооборудования от известных зарубежных и отечественных брендов. В нашем арсенале - полный спектр продукции от производителей, таких как АВВ, Schneider Electric, Weidmuller и многих других.</div>
            <div className="Assortment__list">
                {data.map((item) => (
                    <AssortmentItem key={item.title} data={item}/>
                ))}
            </div>
            <Link to={Paths.Catalog}>
                <button className="Assortment__btn">
                    <span className="Assortment__btn-text">КАТАЛОГ</span>
                    <span className="Assortment__btn-icon"><svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 32.5C9.8 32.5 8 34.3 8 36.5C8 38.7 9.8 40.5 12 40.5C14.2 40.5 16 38.7 16 36.5C16 34.3 14.2 32.5 12 32.5ZM0 0.5V4.5H4L11.2 19.7L8.4 24.5C8.2 25.1 8 25.9 8 26.5C8 28.7 9.8 30.5 12 30.5H36V26.5H12.8C12.6 26.5 12.4 26.3 12.4 26.1V25.8999L14.2 22.4999H29C30.6 22.4999 31.8 21.6999 32.4 20.4999L39.6 7.5C40 7.1 40 6.9 40 6.5C40 5.3 39.2 4.5 38 4.5H8.4L6.6 0.5H0ZM32 32.5C29.8 32.5 28 34.3 28 36.5C28 38.7 29.8 40.5 32 40.5C34.2 40.5 36 38.7 36 36.5C36 34.3 34.2 32.5 32 32.5Z" fill="white"/>
                        </svg>
                    </span>
                </button>
            </Link>
        </div>
    </section>
  )
}

export {Assortment}