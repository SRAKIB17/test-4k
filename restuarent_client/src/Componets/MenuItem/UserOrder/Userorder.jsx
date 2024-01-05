import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart, minimizeToDb, removeFromDb } from '../../utitilies/databse';
import { useForm } from 'react-hook-form';
import useUrl from '../../../CustomHooks/URL/UseUrl';

import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import useCartData from '../../../CustomHooks/CartItemFromStore';
import Loader from '../../Loader';
import MenuData from '../../../CustomHooks/MenuData/MenuData';
import { HiMinus, HiPlus } from "react-icons/hi";
import { RiDeleteBackFill, RiDeleteBin5Fill } from "react-icons/ri";
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

      const tax =  totalPrice * 0.17;

      const handleChange = (e) => {
            seTpaypal(false);
            const { name, value } = e.target;

            setFormData(e.target.value)
            if (e.target.value === 'paypal') {
                  seTpaypal(true);

            }

      };




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



      const onSubmit = async (data, e) => {
            e.preventDefault();

            const orderItem = {
                  name: data.name,
                  mobile: data.mobile,
                  orderdata_array: updatedItems,
                  total: totalPrice,
                  wayToPayment: formData,
                  paypalEmail: data?.emial || null,
                  paypalPass: data?.pass || null


            };






            try {
                  const res = await fetch(`${url}/orderItem`, {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(orderItem),
                  });

                  const responseData = await res.json();




                  if (responseData.InsertedId > 0) {
                        localStorage.removeItem('shopping-cart')
                        reset()

                        toast.success(responseData.message, {
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",

                        });

                        deleteShoppingCart();
                        const goToHone = () => {
                              navigate('/')
                              location.reload()

                        }

                        setTimeout(goToHone, 5000)



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
                  console.error("Error while sending the order:", error);
                  toast.error("Error while sending the order. Please try again later.", {
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
      };
     
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
                                    <h1 className=' text-lg  text-end px-6'>Gross Price : ${(totalPrice  + tax)?.toFixed(2)}</h1>

                              </div>

                        </div>
                        <button
                              className="btn bg-gray-300 w-full font-bold mt-4"
                              onClick={() => document.getElementById('my_modal_2').showModal()}
                        >
                              Order
                        </button>
                  </div>





                  <dialog id="my_modal_2" className="modal">
                        <div className="modal-box">
                              <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 rounded shadow-md">
                                    <label className="text-sm">
                                          Enter your Name:
                                          <input
                                                className="border bg-gray-100 py-1 px-4 rounded-md focus:ring focus:ring-blue-300 w-full"
                                                type="text"
                                                {...register('name', { required: true })}
                                                required
                                          />
                                          {errors.name && <span className="text-red-500 text-xs">Name is required</span>}
                                    </label>
                                    <label className="text-sm">
                                          Enter your Mobile:
                                          <input
                                                className="border bg-gray-100 py-1 px-4 mb-4 rounded-md focus:ring focus:ring-blue-300 w-full"
                                                type="text"
                                                {...register('mobile', { required: true })}
                                                required
                                          />
                                          {errors.mobile && <span className="text-red-500 text-xs">Mobile is required</span>}
                                    </label>

                                    {Paypal && <>
                                          <label className="text-sm">
                                                Enter your Email:
                                                <input
                                                      className="border bg-gray-100 py-1 px-4 mb-4 rounded-md focus:ring focus:ring-blue-300 w-full"
                                                      type="email"
                                                      {...register('emial', { required: true })}
                                                      required
                                                />
                                                {errors.email && <span className="text-red-500 text-xs">Mobile is required</span>}
                                          </label>
                                          <label className="text-sm">
                                                Enter your Password:
                                                <input
                                                      className="border bg-gray-100 py-1 px-4 mb-4 rounded-md focus:ring focus:ring-blue-300 w-full"
                                                      type="password"
                                                      {...register('pass', { required: true })}
                                                      required
                                                />
                                                {errors.pass && <span className="text-red-500 text-xs">Mobile is required</span>}
                                          </label>



                                    </>}
                                    <div className="mb-4">
                                          <label className="block text-sm font-semibold mb-1">Way To purchase</label>
                                          <select
                                                name="role"
                                                className="w-full border border-gray-300 bg-white text-black focus:ring focus:ring-blue-300 px-3 py-2 rounded"
                                                value={formData}
                                                onChange={handleChange}
                                                required
                                          >

                                                <option disabled selected >Payment Method</option>
                                                <option value="cash" >cash</option>
                                                <option value="paypal" >paypal</option>
                                                {/* <option value="" disabled>Select payment method</option>
              {jobRoles.map((role, index) => (
                <option key={index} value={role}>{role}</option>
              ))} */}
                                          </select>
                                    </div>


                                    <button
                                          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:ring focus:ring-blue-300 w-full"
                                          type="submit"
                                    >
                                          Order Now
                                    </button>
                              </form>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                              <button>close</button>
                        </form>
                  </dialog>

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