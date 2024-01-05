import React from 'react';
import Navbar from '../../../Componets/Shared/Navbar/Navbar';
import MenuItem from '../../../Componets/MenuItem/MenuItem';
import Statistics from '../Statistics/Statistics';
import DashboardNavbar from '../DashboarNavbar/DashboardNavbar';
import { Outlet } from 'react-router-dom';
import Header from '../Alam/Header';

const DashboardHome = () => {
      return (
            <div>
                  {/* <Header></Header> */}
                
               <Statistics></Statistics>
                  
            </div>
      );
};

export default DashboardHome;