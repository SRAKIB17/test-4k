import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // Add this line

import Loader from '../../Loader';
import { AuthContext } from '../../../providers/AuthoProvider';


const Navbar = () => {

    const {user,loading}=useContext(AuthContext)


    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const [orderdata, setOrderData] = useState([]);

    if(loading)return <Loader/>

    // useEffect(() => {
    //     setOrderData(getShoppingCart());
    // }, []);

    const getSavedData = localStorage.getItem('shopping-cart');
    const cartItem = JSON.parse(getSavedData);
    // if (!cartItem) return <Loader />

    const updatedItems = [];
    let count = 0
    for (const key in cartItem) {
        count += cartItem[key]

    }







    return (
        <nav className="bg-gray-500 shadow-lg fixed z-10 top-0 w-full py-8 mb-12">
            <div className=" w-[80%] mx-auto flex items-center justify-between ">
                <div className="text-white font-bold text-lg">
                    Restaurant Menu card
                </div>
                <div className="hidden sm:block">
                    <ul className="flex space-x-4">
                        <li><Link to="/" className="text-white">Home</Link></li>
                        <li><Link to="/dashboardapp" className="text-white">
                            {
                                user?.id ? 'Dashboard':'Login'
                             }
                            </Link></li>

                        <li> <Link to="/order" className="text-gray-100  flex justify-center items-center">
                            <FontAwesomeIcon icon={faShoppingCart} className="mr-2 font-bold text-2xl  " />
                            <span className='font-bold text-2xl top-3  text-white rounded-xl'>{count|| 0}</span>
                        </Link></li>

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
                            <li><Link to="/" className="text-gray-100">Home</Link></li>
                            <li><Link to="/dashboardapp" className="text-white">
                            {
                                user?.id ? 'Dashboard':'Login'
                             }
                            </Link></li>

                            <li> <Link to="/order" className="text-gray-100  flex justify-center items-center">
                                <FontAwesomeIcon icon={faShoppingCart} className="mr-2 font-bold text-2xl  " />
                                <span className='font-bold text-2xl top-3  text-white rounded-xl'>{count || 0}</span>
                            </Link></li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
