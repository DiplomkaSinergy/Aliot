//@ts-nocheck


import React, { FC } from 'react'

interface IDataDescriptiom {
    title: string
} 

interface IProps {
    data: {
        img: string
        title: string
        description: IDataDescriptiom[]
    }
}


const AssortmentItem:FC<IProps> = ({data}) => {
  const  {img, title, description} = data

  return (
    <div className='Assortment__item'>
        <div className="Assortment__item-wrap">
            <div className="Assortment__img">
                <img src={img} alt="foto" />
            </div>
            <div className="Assortment__item-title">{title}</div>
        </div>
            {/* {description.map((item, i) => (
                <div key={i} className="Assortment__description">
                    {item.title}
                </div>
            ))} */}
    </div>
  )
}

export default AssortmentItem