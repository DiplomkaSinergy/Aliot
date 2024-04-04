import { Navigate } from 'react-router-dom';
import { TGuardProps } from '../Routes/Types/IGuardProps'
import { Paths } from '../Routes/Types/paths';
import { useAuth } from '@/stores/authStore';
import { Loading } from '@/components';


const AuthGuard = ({children}: TGuardProps) => {
    const isAuth = useAuth(state => state.isAuth)
    const isLoading = useAuth(state => state.loading)
    
    console.log('AuthGuard: ' + isAuth);
    

      if (isLoading) {  

        return (
          <div className="loading-sket">
            <Loading/>
          </div>
        )
      } 
      if (isAuth) {
        return children
      } else {
        return <Navigate to={Paths.Home}/>
      }
      
};

export { AuthGuard };
