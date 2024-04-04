import React, { FC } from 'react'
import { IDataCompanies } from '../../Catalog/data/data'
import './CatalogPreviewItem.scss'
import { Link } from 'react-router-dom'


export interface IPropsItem {
    item: IDataCompanies
    isSmail: boolean
} 

const CatalogPreviewItem: FC<IPropsItem> = ({item, isSmail}) => {
  const { img, title, to} = item
   return (
    <Link to={to} className='CatalogPreviewItem'>
        <div className={`${isSmail ? 'CatalogPreviewItem__img-smail': 'CatalogPreviewItem__img'}`}>
            <img src={img} alt="foto" />
        </div>
        <div className={`CatalogPreviewItem__name ${isSmail ? 'CatalogPreviewItem__name-smail': 'CatalogPreviewItem__name-big'}`}>{title}</div>
    </Link>
  )
}

export {CatalogPreviewItem}