import React, { FC} from 'react'
import {links} from './headerLinks'
import { NavLink } from 'react-router-dom'
import { CircleUserRound, FolderLock, Heart, ShoppingCart, Trello } from 'lucide-react'
import { Forms } from '@/components/Forms/types.interface'
import logo from '@/assets/icons/superlast.png'
import './Header.scss'
import { Link } from 'react-router-dom'
import { Paths, PathsAccount } from '@/app/Routes/Types/paths'
import { useAuth } from '@/stores/authStore'

interface IHeaderProps {
    activeMenu: boolean
    handleMenu: () => void;
    handleAuthForm: (value: Forms) => void
}


const Header: FC<IHeaderProps> = ({handleAuthForm, activeMenu, handleMenu}) => {

    const isAuth = useAuth(state => state.isAuth)
    const role = useAuth(state => state.user.role)


  return (
    <header className='header'>
        <div className="container">
            <div className="header__wrapper">
                <div className="header__left">
                    <div className="header__logo">
                        <img src={logo} alt="logo" />       
                    </div>
                    <nav className="header__nav">
                        {links.map((item, i) => (
                            <NavLink 
                            key={i}
                            to={item.link}
                            style={({isActive}) => ({color: isActive ? '#4182E3' : 'black'})}
                            >
                               {item.text}
                            </NavLink>
                        ))}
                    </nav>
                </div>
                <div className="header__right">
                    <div className='header__buy-input'>
                        <input type="text" className='header__search' placeholder="Введите артикул"/>
                        <button className='header__search_btn'>Найти</button>
                    </div>
                    <div className="header__likes">
                        <Heart  />
                    </div>
                    <div className="header__cart">
                        <ShoppingCart />
                    </div>
                    {isAuth ?  
                        <Link to={Paths.Account}>
                            <div className="header__account">
                                <CircleUserRound />
                            </div>
                        </Link>
                    : <button className="header__sinin" onClick={() => handleAuthForm(Forms.Auth)}>Войти</button> }

                    {role === 'USER' ? 
                        <Link  className=""><FolderLock /></Link> : null
                    }           
                </div>

                <div onClick={handleMenu} className={activeMenu ? "header__burgerbtn-active" : "header__burgerbtn"} >
                    <span/>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header