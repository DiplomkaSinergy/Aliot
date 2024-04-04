import { AutoSlider } from '../..'
import { dataBottom, dataTop } from '../../Sliders/autoSlider/data';
import './Companies.scss'



const Companies = () => {

  return (
    <section className='Companies'>
        <div className="container">
            <hr className="Companies__hr" />
            <div className="Companies__title">ВЕДУЩИЕ ПРОИЗВОДИТЕЛИ НИЗКОВОЛЬТНОГО ОБОРУДОВАНИЯ</div>
        </div>
        <div className="Companies__wrapperSlides">
          <AutoSlider rtl='rtl' data={dataTop}/>
          <AutoSlider rtl='' data={dataBottom} />
        </div>
    </section>
  )
}

export {Companies}