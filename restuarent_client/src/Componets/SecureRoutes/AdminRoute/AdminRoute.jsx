import React, { useContext } from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../../../CustomHooks/UseAdmin';
import { AuthContext } from '../../../providers/AuthoProvider';
import Loader from '../../Loader';




const AdminRoute = ({children}) => {
      const location=useLocation();
     const {user, loading}= useContext(AuthContext);
     const [isAdmin,isAdminLoading]=useAdmin();
     

      
      if(loading || isAdminLoading){
            return  <Loader/>
      }

    
      if(user && isAdmin) {
            return children
      }

      return <Navigate to="/" state={{from:location}} replace></Navigate>
};

export default AdminRoute;