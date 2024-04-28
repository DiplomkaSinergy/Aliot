import { Navigate } from 'react-router-dom';
import { TGuardProps } from '../Routes/Types/IGuardProps'
import { Paths } from '../Routes/Types/paths';
import { useAuth } from '@/stores/authStore';
import { Loading } from '@/components';
import { Forms } from '@/components/Forms/types.interface';


const AuthGuard = ({children, handleAuthForm}: TGuardProps) => {
    const isAuth = useAuth(state => state.isAuth)
    const isLoading = useAuth(state => state.loading)
    
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
        
        handleAuthForm?.(Forms.Auth)
        return <Navigate to={Paths.Home}/>

      }
      
};

export { AuthGuard };
