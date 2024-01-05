import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardNavbar from '../DashboarNavbar/DashboardNavbar';
import Header from '../Alam/Header';
import useAdmin from '../../../CustomHooks/UseAdmin';
import Loader from '../../../Componets/Loader';

const DashboardApp = () => {
      
    
      return (

            <div className=' mx-auto '>
                  <Header ></Header>
                  <div className='w-[80%] mx-auto mt-36'>
                        <Outlet></Outlet>
                  </div>
            </div>

      );
};

export default DashboardApp;