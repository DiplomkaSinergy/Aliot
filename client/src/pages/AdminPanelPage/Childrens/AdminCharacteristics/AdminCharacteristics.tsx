import React from 'react'

import './AdminCharacteristics.scss'
import { Plus, SlidersHorizontal } from 'lucide-react'

const AdminCharacteristics = () => {
  return (
    <section className='AdminCharacteristics'>
        <div className="AdminCharacteristics__flex">
            <div className="AdminCharacteristics__icon"><SlidersHorizontal /></div>
            <div className="AdminCharacteristics__title">Характеристики</div>
          </div>
          <div className="AdminCharacteristics__list">


            <div className="AdminCharacteristics__item">
              <div className="AdminCharacteristics__item-title">Производители</div>
              <div className="AdminCharacteristics__item-wrap">
                <div className="AdminCharacteristics__item-value">Schneider Electric</div>
                <div className="AdminCharacteristics__item-value">Aliot</div>
                <div className="AdminCharacteristics__item-value">Chint</div>
                <div className="AdminCharacteristics__item-value">ABB</div>
              </div>
              <button className='AdminCharacteristics__create'><Plus /><span>Добавить</span></button>
            </div>
            <div className="AdminCharacteristics__item">
              <div className="AdminCharacteristics__item-title">Производители</div>
              <div className="AdminCharacteristics__item-wrap">
                <div className="AdminCharacteristics__item-value">Schneider Electric</div>
                <div className="AdminCharacteristics__item-value">Aliot</div>
                <div className="AdminCharacteristics__item-value">Chint</div>
                <div className="AdminCharacteristics__item-value">ABB</div>
              </div>
              <button className='AdminCharacteristics__create'><Plus /><span>Добавить</span></button>
            </div>
            <div className="AdminCharacteristics__item">
              <div className="AdminCharacteristics__item-title">Производители</div>
              <div className="AdminCharacteristics__item-wrap">
                <div className="AdminCharacteristics__item-value">Schneider Electric</div>
                <div className="AdminCharacteristics__item-value">Aliot</div>
                <div className="AdminCharacteristics__item-value">Chint</div>
                <div className="AdminCharacteristics__item-value">ABB</div>
              </div>
              <button className='AdminCharacteristics__create'><Plus /><span>Добавить</span></button>
            </div>


          </div>
    </section>
  )
}

export default AdminCharacteristics