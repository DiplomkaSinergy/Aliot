//@ts-nocheck

import { Paths, PathsAdminPanel } from '@/app/Routes/Types/paths';
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { navigation } from './NavigationLinks';

import './AdminPanelPage.scss'
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AdminPanelPage = () => {

  const location = useLocation(); 
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === Paths.AdminPanel) {
      navigate(PathsAdminPanel.Main)
    }
  }, [navigate, location])


  return (
    <div className='AdminPanelPage'>
    <div className="container">
      <Link to={Paths.Home} className='AdminPanelPage__tohome'><ArrowLeft color='#4182E3'/> <span>Домой</span></Link>
      <div className="AdminPanelPage__wrapper">
        <div className="AdminPanelPage__sidebar">
          <div className="AdminPanelPage__sidebar-wrapper">
              {navigation.map((item, i) => (
                  <NavLink key={i} to={item.path}>
                    <div className="AdminPanelPage__sidebar-link">
                      <div>{item.icon}</div>
                      <span>{item.title}</span>
                    </div>
                  </NavLink>
                ))}
          </div>
        </div>
        <div className="AdminPanelPage__dashbord">
          <Outlet/>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AdminPanelPage