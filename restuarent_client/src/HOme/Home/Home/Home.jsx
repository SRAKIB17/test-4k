
import React from 'react';

import MenuItem from '../../../Componets/MenuItem/MenuItem';
import Navbar from '../../../Componets/Shared/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import MenuData from '../../../CustomHooks/MenuData/MenuData';
import ScaleLoader from "react-spinners/ScaleLoader";
import Loader from '../../../Componets/Loader';
const Home = () => {
      const { menu,isLoading } = MenuData();
      if(isLoading){
            return <Loader/>
      }
      
      return (
            <div>
                  
                   <ToastContainer/>
                
                  <MenuItem ></MenuItem>
            </div>
      );
};

export default Home;