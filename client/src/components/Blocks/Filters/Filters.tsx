import React from 'react'
import './Filters.scss'
import { IFilter, fullFilters, useDeviceStore } from '@/stores/deviceStore'
import { List } from '../List/List';




const Filters = ({char1, char2, char3, char4}: fullFilters) => {
  const products = useDeviceStore((state) => state.products);


  return (
    <div className='Filters'>
      <div className='Filters__wrapper'>

            {products?.map(item => (
              <div className="Filters__title">{item.char1.title}</div>
            ))}
            <FiltersBlock items={char1}/>
            {products?.map(item => (
              <div className="Filters__title">{item.char2.title}</div>
            ))}
            <FiltersBlock items={char2}/>
            
            {products?.map(item => (
              <div className="Filters__title">{item.char3?.title}</div>
            ))}
            <FiltersBlock items={char3}/>

            {char4?.map(item => (

              <div className="Filters__charName">{item.value}</div>
            ))}
      </div>
    </div>
  )
}

interface FiltersBlockProps {
  items: IFilter[] | undefined
}


export const FiltersBlock = ({items}: FiltersBlockProps) => {
  return (
    <List
      items={items}
      rebderItems={(item) => (
        <label htmlFor={`${item.value}`}  className='Filters__label'>
          <input name='value' type='checkbox' className='Filters__input' id={`${item.value}`}/>
          <div className="Filters__charName">{item.value}</div>
        </label>
      )}
    />
  )
}


export default Filters