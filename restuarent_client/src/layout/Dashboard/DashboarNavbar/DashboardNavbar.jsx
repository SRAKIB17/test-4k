import React, { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Navigate, } from 'react-router-dom';

import Swal from 'sweetalert2';
import { VscThreeBars } from "react-icons/vsc";



import { useContext, useState } from 'react';
import useAdmin from '../../../CustomHooks/UseAdmin';
import { AuthContext } from '../../../providers/AuthoProvider';
import Loader from '../../../Componets/Loader';


const DashboardNavbar = () => {
      const [isAdmin, isAdminLoading] = useAdmin();
      const navigate = useNavigate();
      const [menuOpen, setMenuOpen] = useState(false);
      const toggleMenu = () => {
            setMenuOpen(!menuOpen);
      };
      const [orderdata, setOrderData] = useState([]);
      const { user, loading } = useContext(AuthContext)
      const [open, setOpen] = useState('Open');

      if (isAdminLoading || loading) {
            return <Loader />
      }
      console.log(user)
      const handleLogout = () => {
            Swal.fire({
                  title: 'Are you sure to Exit?',


                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Exit!'
            }).then((result) => {
                  if (result.isConfirmed) {
                        // localStorage.removeItem('user')
                        sessionStorage.removeItem('user')
                        navigate('/')
                        location.reload()


                  }
            })
      }




      return (
            <nav className="bg-black p-4 mb-12">
                  <ul className=" text-white">
               
                                    </ul>
                  <div className="container mx-auto flex items-center justify-center ">

                        <div className="hidden sm:block">
                              <ul className="flex space-x-4 text-white">
                              <li className="text-white font-bold text-lg">
                                          Restuarent Menu card
                                    </li>
                                    <li><NavLink className={'text-lg font-semibold'} to='statistics'>Statistics</NavLink></li>
                                    {/* <li><NavLink className={'text-lg font-semibold'} to='allorder'>OrderList</NavLink></li> */}
                                    {
                                          isAdmin && <>
                                                {/* <li><NavLink className={'text-lg font-semibold'} to='addmenu'>Add Menu</NavLink></li> */}
                                                <li><NavLink className={'text-lg font-semibold'} to='allmenu'> Menu</NavLink></li>
                                                {/* <li><NavLink className={'text-lg font-semibold'} to='addemploy'>Add Employee</NavLink></li> */}
                                                <li><NavLink className={'text-lg font-semibold'} to='allemploy'> Employees</NavLink></li>
                                                <li><NavLink className={'text-lg font-semibold'} to='report'>Report</NavLink></li>
                                                <li>

                                                      <li><NavLink className={'text-lg font-semibold'} to='todays-attendance'>Attendance</NavLink></li>
                                                 
                                                      

                                                </li>
                                          </>
                                    }
                                    <div className='mt-4'>
                                          < hr />
                                    </div>

                                    <li><NavLink className={'text-lg font-semibold'} to='/'>Home</NavLink></li>
                                    <li><button onClick={() => handleLogout()} className={'text-lg font-semibold mb-10'} >LogOut</button ></li>
                              </ul>
                        </div>
                        <div className="sm:hidden">
                              <button onClick={toggleMenu} className="text-white">
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                              </button>
                              {menuOpen && (
                                    <ul className="absolute top-12 right-0 bg-black text-white p-2 space-y-2 border shadow-2xl font-bold me-3">
                                          <li><NavLink className={'text-lg font-semibold'} to='statistics'>Statistics</NavLink></li>
                                          <li><NavLink className={'text-lg font-semibold'} to='allorder'>OrderList</NavLink></li>
                                          {
                                                isAdmin && <>
                                                      <li><NavLink className={'text-lg font-semibold'} to='addmenu'>Add Menu</NavLink></li>
                                                      <li><NavLink className={'text-lg font-semibold'} to='allmenu'>All Menu</NavLink></li>
                                                      <li><NavLink className={'text-lg font-semibold'} to='addemploy'>Add Employee</NavLink></li>
                                                      <li><NavLink className={'text-lg font-semibold'} to='allemploy'>ALL Employee</NavLink></li>
                                                      <li><NavLink className={'text-lg font-semibold'} to='report'>Sales Report</NavLink></li>
                                                  
                                                         
                                                               
                                                                        <li><NavLink className={'text-lg font-semibold'} to='todays-attendance'> Attendance</NavLink></li>
                                                                        {/* <li><NavLink className={'text-lg font-semibold'} to="employee-attendance">Employee Attendance</NavLink></li> */}


                                                               
                                                  
                                                </>
                                          }
                                          <div className='mt-4'>
                                                < hr />
                                          </div>

                                          <li><NavLink className={'text-lg font-semibold'} to='/'>Home</NavLink></li>
                                          <li><button onClick={() => handleLogout()} className={'text-lg font-semibold mb-10'} >LogOut</button ></li>
                                    </ul>
                              )}
                        </div>
                  </div>
            </nav>
      );
};

export default DashboardNavbar;