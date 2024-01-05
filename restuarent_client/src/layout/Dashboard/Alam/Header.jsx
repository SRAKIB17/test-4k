import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
// import logo from '../../../../assets/publichome/logo.png';
import { useContext } from 'react';

import { AuthContext } from '../../../providers/AuthoProvider';
import Loader from '../../../Componets/Loader';
import { IoIosArrowDown } from "react-icons/io";
import useAdmin from '../../../CustomHooks/UseAdmin';
import Swal from 'sweetalert2';
import useUrl from '../../../CustomHooks/URL/UseUrl';


function Header() {
      const [url] = useUrl()
      const [menuOpen, setMenuOpen] = useState(false);
      const { user, loading } = useContext(AuthContext)


      const navigate = useNavigate();


      const [orderdata, setOrderData] = useState([]);

      const [open, setOpen] = useState('Open');


      if (loading) {
            return <Loader />
      }




      const handleLogout = () => {

            Swal.fire({
                  title: 'Are you sure to Exit?',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Exit!'
            }).then(async (result) => {
                  if (result.isConfirmed) {
                        // exit date and time calculated 
                        try {
                              const res = await fetch(`${url}/exit`, {
                                    method: 'POST',
                                    headers: {
                                          'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ userId: user?.id }),
                              });

                              const responseData = await res.json();




                              if (responseData.success) {

                                    // localStorage.removeItem('user')
                                    sessionStorage.removeItem('user');

                                    navigate('/')
                                    location.reload()

                              } else {
                                    toast.error(responseData.message, {
                                          position: "top-right",
                                          autoClose: 5000,
                                          hideProgressBar: false,
                                          closeOnClick: true,
                                          pauseOnHover: true,
                                          draggable: true,
                                          progress: undefined,
                                          theme: "light",
                                    });

                              }
                        } catch (error) {

                        }




                  }
            })
      }


      const toggleMenu = () => {
            setMenuOpen(!menuOpen);
      };


      return (
            <header className={` fixed w-full px-[10%] h-[100px]    mx-auto z-10 top-0 bg-white shadow-lg ${menuOpen ? 'menu-open' : 'menu-close'}`}>
                  <div className=" mx-auto py-8">
                        <div className="container mx-auto flex justify-between">
                              {/* Company Logo */}
                              <Link to="/">
                                    <h1 className=" font-bold text-lg ">
                                          Restaurant
                                    </h1>
                              </Link>

                              {/* Mobile Menu Button */}
                              <button onClick={toggleMenu} className="lg:hidden focus:outline-none">
                                    {menuOpen ? (
                                          <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                className="h-6 w-6"
                                          >
                                                <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M6 18L18 6M6 6l12 12"
                                                />
                                          </svg>
                                    ) : (
                                          <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                className="h-6 w-6"
                                          >
                                                <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M4 6h16M4 12h16M4 18h16"
                                                />
                                          </svg>
                                    )}
                              </button>

                              {/* Mobile Menu (hidden by default) */}

                              {/* Desktop Menu */}
                              <nav className="hidden lg:flex items-center space-x-10">

                                    <ul className="flex space-x-4 ">

                                          <li><NavLink className={'text-lg '} to='statistics'>Statistics</NavLink></li>
                                          <li >
                                                <div className="dropdown dropdown-hover">
                                                      <label tabIndex={0} className="text-lg  flex gap-2 items-center">Orders <IoIosArrowDown /></label>
                                                      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                            <li><NavLink to='cash-order'>Cash</NavLink></li>
                                                            <li> <NavLink to='paypal-order'>Paypal</NavLink></li>
                                                      </ul>
                                                </div>
                                          </li>
                                          {
                                                user?.role == 'manager' && <>

                                                      <li >
                                                            <div className="dropdown dropdown-hover">
                                                                  <label tabIndex={0} className="text-lg  flex gap-2 items-center">Menu <IoIosArrowDown /></label>
                                                                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                                        <li><NavLink to='allmenu'>Items</NavLink></li>
                                                                        <li> <NavLink to='all-categories'>Categories</NavLink></li>
                                                                  </ul>
                                                            </div>
                                                      </li>


                                                      <li><NavLink className={'text-lg '} to='allemploy'> Employees</NavLink></li>
                                                      <li><NavLink className={'text-lg '} to='report'>Report</NavLink></li>
                                                      <li>


                                                      </li>

                                                </>
                                          }
                                          <div className='mt-4'>
                                                < hr />
                                          </div>
                                          <li>
                                                <div className="dropdown dropdown-hover">
                                                      <label tabIndex={0} className="text-lg  flex gap-2 items-center">Attendance <IoIosArrowDown /></label>
                                                      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">

                                                            {
                                                                  user?.role == 'manager' && <>
                                                                        <li><NavLink to='todays-attendance'>Present employees</NavLink></li>
                                                                        <li> <NavLink to='personal-attendance'>Personal attendance</NavLink></li>
                                                                  </>

                                                            }


                                                            <li> <NavLink to='employee-attendance'>My attendance</NavLink></li>

                                                      </ul>
                                                </div>
                                          </li>

                                          <li><NavLink className={'text-lg '} to='/'>Home</NavLink></li>
                                          <li><button onClick={() => handleLogout()} className={'text-lg  mb-10'} >LogOut</button ></li>
                                    </ul>

                              </nav>
                        </div>
                        <nav className={`lg:hidden ${menuOpen ? 'block' : 'hidden'} z-10 bg-white shadow-xl absolute left-0 px-10 top-20 flex flex-col gap-4 p-4`}>
                              {menuOpen && (
                                    <ul className="flex flex-col gap-5 ">

                                          <li><NavLink className={'text-lg '} to='statistics'>Statistics</NavLink></li>
                                          <li >
                                                <div className="dropdown dropdown-hover">
                                                      <label tabIndex={0} className="text-lg  flex gap-2 items-center">Orders <IoIosArrowDown /></label>
                                                      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                            <li><NavLink to='cash-order'>Cash</NavLink></li>
                                                            <li> <NavLink to='paypal-order'>Paypal</NavLink></li>
                                                      </ul>
                                                      
                                                </div>
                                          </li>
                                          <li> <NavLink className={'text-lg '}  to='employee-attendance'>My attendance</NavLink></li>
                                          {
                                                user?.role == 'manager' && <>

                                                      <li >
                                                            <div className="dropdown dropdown-hover">
                                                                  <label tabIndex={0} className="text-lg  flex gap-2 items-center">Menu <IoIosArrowDown /></label>
                                                                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                                        <li><NavLink to='allmenu'>Items</NavLink></li>
                                                                        <li> <NavLink to='all-categories'>Categories</NavLink></li>
                                                                  </ul>
                                                            </div>
                                                      </li>


                                                      <li><NavLink className={'text-lg '} to='allemploy'> Employees</NavLink></li>
                                                      <li><NavLink className={'text-lg '} to='report'>Report</NavLink></li>

                                                      <li>
                                                            <div className="dropdown dropdown-hover">
                                                                  <label tabIndex={0} className="text-lg  flex gap-2 items-center">Attendance <IoIosArrowDown /></label>
                                                                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">

                                                                      
                                                                              <li><NavLink to='todays-attendance'>Present employees</NavLink></li>
                                                                              <li> <NavLink to='personal-attendance'>Personal attendance</NavLink></li>
                                                                        

                                                                       
                                                                               <li> <NavLink to='employee-attendance'>My attendance</NavLink></li>
                                                                        
                                                                  </ul>
                                                            </div>
                                                      </li>



                                                </>
                                          }
                                          <div className='mt-4'>
                                                < hr />
                                          </div>

                                          <li><NavLink className={'text-lg '} to='/'>Home</NavLink></li>
                                          <li><button onClick={() => handleLogout()} className={'text-lg  mb-10'} >LogOut</button ></li>
                                    </ul>
                              )}
                        </nav>
                  </div>
            </header>
      );
}

export default Header;