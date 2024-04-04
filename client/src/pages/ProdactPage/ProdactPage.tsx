import { Loading, ProductSlider } from '@/components'
import React, { useEffect, useState } from 'react'

import {data} from '@/components/Sliders/ProductSlider/data'

import './ProdactPage.scss'
import { useLocation, useParams } from 'react-router-dom'
import { useDeviceStore } from '@/stores/deviceStore'

const ProdactPage = () => {
  const getOneDevice = useDeviceStore(state => state.getOneDevice)
  const oneProduct = useDeviceStore(state => state.oneProduct)
  const loading = useDeviceStore(state => state.loading)
    const {id} = useParams()
    
    useEffect(() => {
      getOneDevice(id)
    }, [])



  return (
    <div className='ProdactPage'>
        <div className="container">
          {loading ? 
            <Loading/>
          :
            <div className="ProdactPage__wrapper">
                
                <div className="ProdactPage__wrapper-flex">
                    {/* <ProductSlider data={data} /> */}
                    <div className="ProdactPage__wrapper-img"><img src={import.meta.env.VITE_APP_API_URL + oneProduct.img} alt="img" /></div>
                    <div className="ProdactPage__wrapper-information">{oneProduct.name}</div>
                    <div className="ProdactPage__wrapper-price">{oneProduct.price}</div>
                </div>
                <div className="ProdactPage__wrapper-specifications">
                  {oneProduct.info?.map(item => (
                    <div className="dff">
                      <div className="">{item.title}</div>
                      <div className="">{item.description}</div>
                    </div>
                  ))}
                </div>
            </div>
          }
        </div>
    </div>
  )
}

export default ProdactPage