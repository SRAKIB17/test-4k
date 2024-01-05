import { Link, NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import { VscThreeBars } from "react-icons/vsc";

import { AuthContext } from '../../providers/AuthoProvider';
import Loader from '../../Componets/Loader';
import { useContext, useState } from 'react';

const Dashboard2 = () => {
      const [isAdmin, isAdminLoading] = useAdmin();
      const navigate = useNavigate();

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
                        sessionStorage.removeItem('user');

                        navigate('/')
                        location.reload()


                  }
            })
      }
      return (


            <div className="drawer lg:drawer-open ">
                  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                  <div className="drawer-content flex flex-col items-center justify-center">
                        {/* Page content here */}
                       <div className=' absolute left-10 top-5'>
                       <label htmlFor="my-drawer-2" className="drawer-button cursor-pointer lg:hidden  "><VscThreeBars size={40}/></label>
                       </div>
                        <Outlet />

                  </div>
                  <div className="drawer-side">
                        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                              {/* Sidebar content here */}
                              <div className=''>
                                    <h2 className='font-bold uppercase text-2xl text-center'>{user.name}</h2>
                                    <p className='text-center p-2'>{user.role}</p>

                              </div>
                              <div className='mt-4'>
                                    < hr />
                              </div>


                              {/* Sidebar content here */}
                              <li><NavLink className={'text-lg font-semibold'} to='statistics'>Statistics</NavLink></li>
                              <li><NavLink className={'text-lg font-semibold'} to='allorder'>OrderList</NavLink></li>
                              {
                                    isAdmin && <>
                                          <li><NavLink className={'text-lg font-semibold'} to='addmenu'>Add Menu</NavLink></li>
                                          <li><NavLink className={'text-lg font-semibold'} to='allmenu'>All Menu</NavLink></li>
                                          <li><NavLink className={'text-lg font-semibold'} to='addemploy'>Add Employee</NavLink></li>
                                          <li><NavLink className={'text-lg font-semibold'} to='allemploy'>ALL Employee</NavLink></li>
                                          <li><NavLink className={'text-lg font-semibold'} to='report'>Sales Report</NavLink></li>
                                          <li>
                                                <details open>
                                                      <summary className={'text-lg font-semibold'} >Attendance</summary>
                                                      <ul>
                                                            <li><NavLink className={'text-lg font-semibold'} to='todays-attendance'>Today Attendance</NavLink></li>
                                                            <li><NavLink className={'text-lg font-semibold'} to="employee-attendance">Employee Attendance</NavLink></li>


                                                      </ul>
                                                </details>
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
            </div>
      );
};

export default Dashboard2;