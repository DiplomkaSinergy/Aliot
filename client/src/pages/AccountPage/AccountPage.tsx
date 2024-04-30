import { useEffect } from 'react'
import { navigation } from './NavigationLinks'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Paths, PathsAccount } from '@/app/Routes/Types/paths'
import './AccountPage.scss'

const AccountPage = () => {
  const location = useLocation(); 
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === Paths.Account) {
      navigate(PathsAccount.Main)
    }
  }, [navigate, location])

  return (
    <div className='AccountPage'>
      <div className="container">
        <div className="AccountPage__wrapper">
          <div className="AccountPage__sidebar">
            <div className="AccountPage__sidebar-wrapper">
                {navigation.map((item, i) => (
                    <NavLink key={i} to={item.path}>
                      <div className="AccountPage__sidebar-link">
                        <div>{item.icon}</div>
                        <span>{item.title}</span>
                      </div>
                    </NavLink>
                  ))}
            </div>
          </div>
          <div className="AccountPage__dashbord">
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountPage