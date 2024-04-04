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
                {/* <div className="menu__content-link">
                    <NavLink 
                    onClick={() => setActive(false)}
                    end
                    to='/'
                    style={({isActive}) => ({color: isActive ? '#21A7AF' : 'white'})}
                    >ГЛАВНАЯ
                    </NavLink>
                    </div>
                    {items.map(item => 
                        <a onClick={() => setActive(false)} className='menu__link' href={item.href}>{item.value}</a>
                    )} */}
        </div>
    </div>
  )
}

export {Menu}