import { FeedbackForm } from '@/components'
import React from 'react'

import './FeedbakPage.scss'

const FeedbakPage = () => {
  return (
    <div className='FeedbakPage'>
        <div className="container">
            <div className="FeedbakPage__wrapper">
              <FeedbackForm/>
            </div>
        </div>
    </div>
  )
}

export default FeedbakPage