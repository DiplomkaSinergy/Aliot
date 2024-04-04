import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const AdminPanelPage = () => {

  const location = useLocation(); 
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === Paths.Account) {
      navigate(PathsAccount.Main)
    }
  }, [navigate, location])


  return (
    <div>

    </div>
  )
}

export default AdminPanelPage