import React from 'react'

import './CatalogItem.scss'
import { IItemDataCompanies } from '@/components/Catalog/data/data'
import { Link } from 'react-router-dom'



const CatalogItem = ({id, img, name, price}: IDevice) => {
  return (
      <Link to={`${id}`}>
        <div className='CatalogItemCompany'>
          <div className="CatalogItemCompany__img">
            <img src={import.meta.env.VITE_APP_API_URL + img}/>
          </div>
          <div className='CatalogItemCompany__title'>{name}</div>
          <div className='CatalogItemCompany__price'>{price} руб.</div>
        </div>
      </Link>
  )
}

export {CatalogItem}