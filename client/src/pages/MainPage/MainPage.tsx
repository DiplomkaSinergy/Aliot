import { About, ActiveSlider, Assortment, Contact } from '@/components'
import { Companies } from '@/components/Sections/Companies/Companies'
import React from 'react'



const MainPage = () => {
  return (
    <div className='mainpage'>
          <ActiveSlider/>
          <About/>
          <Assortment/>
          <Contact/>
          <Companies/>
    </div>
  )
}

export default MainPage