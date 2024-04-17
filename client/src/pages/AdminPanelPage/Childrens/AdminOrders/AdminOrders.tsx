import { SlidersHorizontal } from 'lucide-react'
import React from 'react'

const AdminOrders = () => {
  return (
    <section className='AdminOrders'>
      <div className="AdminMain__flex">
          <div className="AdminMain__icon"><SlidersHorizontal /></div>
          <div className="AdminMain__title">Характеристики</div>
        </div>
    </section>
  )
}

export default AdminOrders