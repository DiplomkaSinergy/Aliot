import React from 'react'

import './CatalogItem.scss'
import { IItemDataCompanies } from '@/components/Catalog/data/data'
import { Link } from 'react-router-dom'
import { IProduct } from '@/stores/productStore'

interface ICardProps {
  item: IProduct
}

const CatalogItem = ({item}: ICardProps) => {
  return (
        <div className='CatalogItem'>
          <Link to={`/catalog/${item.id}`} >
              <div className="CatalogItem__img">
                <img src={import.meta.env.VITE_APP_API_URL + item.img}/>
              </div>
              <div className='CatalogItem__price'>{item.price} руб.</div>
              <div className='CatalogItem__title'>{item.name}</div>
          </Link>
        </div>
  )
}

export {CatalogItem}