import {FC} from 'react'
import { IBurgerProps } from '@/layout/types'
import './Menu.scss'



const Menu: FC<IBurgerProps> = ({activeMenu, setActiveMenu}) => {
  return (
    <div className={activeMenu ? "menu active" : "menu"} onClick={() => setActiveMenu(false)}>
        <div className="blur"/>
        <div className="menu__content" onClick={e => e.stopPropagation()}>
          <div onClick={() => setActiveMenu(!activeMenu)} className="menu__burgerbtn">
              <span/>
          </div>

        </div>
    </div>
  )
}

export {Menu}