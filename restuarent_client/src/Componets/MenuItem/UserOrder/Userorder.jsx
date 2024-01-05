import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useUrl from '../../../CustomHooks/URL/UseUrl';
import { addToDb, deleteShoppingCart, minimizeToDb, removeFromDb } from '../../utitilies/databse';

import { HiMinus, HiPlus } from "react-icons/hi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import MenuData from '../../../CustomHooks/MenuData/MenuData';
import Loader from '../../Loader';
import OrderModal from './OrderModal';
const Userorder = () => {
      const { menu, isLoading } = MenuData()
      const [cart, setCart] = useState([])
      const navigate = useNavigate()
      const [orderdata, setOrderData] = useState([]);
      const [total, setTotal] = useState(0);
      const [Paypal, seTpaypal] = useState(false);
      const groupedOrders = {};
      const [url] = useUrl();
      const [quantity, setQuantity] = useState(1);

      const { register, handleSubmit, reset, formState: { errors } } = useForm();
      const [formData, setFormData] = useState();

      if (isLoading) return <Loader />

      // get data from stoirage 
      const getSavedData = localStorage.getItem('shopping-cart');
      const cartItem = JSON.parse(getSavedData);
      // if (!cartItem) return <Loader />

      const updatedItems = [];

      for (const key in cartItem) {
            const targetItem = menu?.find(data => data.id == key);

            if (targetItem) {
                  const updatedItem = { ...targetItem, quantity: cartItem[key] };
                  updatedItems.push(updatedItem);
            }
      }



      // calculate total price 
      const totalPrice = updatedItems.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.price
      }, 0);

      const tax = totalPrice * 0.17;

      // increase quantity 
      const handleIncreaseQuantity = id => {
            addToDb(id)
            location.reload()
      }
      // increase quantity 

      //decreases quantity
      const handleDecreaseQuantity = item => {

            if (item?.quantity > 1) {
                  minimizeToDb(item?.id);
                  console.log(item.quantity);
            }
            location.reload()
      }
      //decreases quantity

      //     delete item 
      const handleDeleteItem = id => {
            removeFromDb(id);
            location.reload()
      }
      //     delete item 




      return (
            <div className="pt-6 mt-10">
                  <div className='mb-10'>
                        <h2 className='mb-10 uppercase text-center font-bold' >User Order </h2>
                        <div className='mb-3 shadow-2xl'>
                              <hr />
                        </div>

                  </div>
                  <ToastContainer />

                  <div className="w-[80%] mx-auto bg-white p-10 rounded shadow-2xl overflow-x-auto">

                        {/* <h2 className="text-xl font-semibold mb-2">Mobile Number: {mobile}</h2> */}
                        <div className="">
                              <table className=" table table-zebra">
                                    <thead>
                                          <tr className="bg-gray-100">
                                                <th className="border px-4 py-2">order No.</th>
                                                <th className="border px-4 py-2">Order Name</th>
                                                <th className="border px-4 py-2">Price</th>
                                                <th className="border px-4 py-2">Quantity</th>
                                                <th className="border px-4 py-2">Sub-Total Price</th>
                                                <th className="border px-4 py-2 text-center">Actions</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {updatedItems?.map((item, index) => (
                                                <tr className=' text-end' key={index}>

                                                      <td>{index + 1}</td>
                                                      <td>{item.name}</td>
                                                      <td className=' '>${item.price}</td>
                                                      <td className='flex items-center gap-3'>
                                                            <button onClick={() => handleDecreaseQuantity(item)} ><HiMinus size={25} /></button>
                                                            <span>{item?.quantity}</span>

                                                            <button onClick={() => handleIncreaseQuantity(item?.id)}><HiPlus size={25} /></button>
                                                      </td>

                                                      <td>${item.quantity * item.price}</td>
                                                      <td>
                                                            <button onClick={() => handleDeleteItem(item?.id)}><RiDeleteBin5Fill className=' text-red-400 hover:text-red-600' size={25} /></button>
                                                      </td>

                                                </tr>
                                          ))}

                                    </tbody>

                              </table>
                              <div className='   w-[250px] ml-auto'>
                                    <h1 className=' text-lg  text-end  px-6'>Total Price : ${totalPrice}</h1>
                                    <h1 className=' text-lg  text-end px-6'>Tax (17%) : ${tax?.toFixed(2)}</h1>

                                    <div className="divider"></div>
                                    <h1 className=' text-lg  text-end px-6'>Gross Price : ${(totalPrice + tax)?.toFixed(2)}</h1>

                              </div>

                        </div>
                        <button
                              className="btn bg-gray-300 w-full font-bold mt-4"
                              onClick={() => document.getElementById('order_modal').showModal()}
                        >
                              Order
                        </button>
                  </div>



                  <OrderModal totalPrice={totalPrice} updatedItems={updatedItems} />



                  <div className="mt-10">
                        <Link to="/">
                              <button
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:ring focus:ring-blue-300"
                              >
                                    {'<----'} Back
                              </button>
                        </Link>
                  </div>

            </div>
      );
};

export default Userorder;