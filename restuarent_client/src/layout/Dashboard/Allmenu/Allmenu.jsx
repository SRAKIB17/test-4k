import React, { useEffect, useState } from 'react';
import { FaRegPlusSquare, FaRegMinusSquare } from "react-icons/fa";

import { PiTextColumnsBold, PiRowsFill } from "react-icons/pi";

import { Link } from 'react-router-dom';
import MenuData from '../../../CustomHooks/MenuData/MenuData';
import MenuCard from './MenuCard';
import useUrl from '../../../CustomHooks/URL/UseUrl';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Allmenu = () => {
  const { menu, isLoading, refetch } = MenuData();
  const [isColumnView, setIsColumnView] = useState(true)
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredMenuItems = menu.filter((menuItem) =>
    menuItem?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="">
      <h1 className="text-2xl text-center font-bold mb-3">Restaurant Menu</h1>
      <ToastContainer></ToastContainer>
      <div className='flex gap-2 items-center md:gap-20  justify-center m-4'>

        <input
          type='search'
          className='py-2 px-10 w-full outline-none rounded-lg  text-black shadow-sm bg-slate-100' // Add border and border-black classes
          placeholder='Search...'
          onChange={handleSearchChange}
        />
        <div className='flex items-center gap-1'>
          <button onClick={() => setIsColumnView(true)} className={`${(isColumnView ? "bg-blue-500 text-white " : " ")} btn btn-sm rounded`}>
            <PiTextColumnsBold size={24} />
          </button>
          <button onClick={() => setIsColumnView(false)} className={`${(!isColumnView ? "bg-blue-500 text-white " : " ")} btn btn-sm rounded`}>
            <PiRowsFill size={24} />
          </button>
        </div>
        <Link className='btn bg-blue-500 text-white' to='/dashboardapp/addmenu'><button >Add Item</button></Link>
      </div>
      {
        !isColumnView ?
          <div className="overflow-x-auto w-full">
            <table className="table whitespace-pre w-full table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredMenuItems?.map((m, index) => {
                    return (
                      <MenuItemTableView m={m} key={index} />
                    )
                  })
                }
              </tbody>
            </table>
          </div>
          :
          <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {
              filteredMenuItems?.map((m, index) => <MenuCard menu={m} key={index} />
              )
            }
          </div>
      }


    </div>
  );
};

const MenuItemTableView = ({ m }) => {
  const [url] = useUrl();

  const [quantity, setQuantity] = useState(m?.quantity ? m?.quantity : 0)
  useEffect(() => {
    setQuantity(m?.quantity ? m?.quantity : 0)
  }, [m])
  const updateQuantity = async (method, quantity, id) => {
    const check = Math.max(0, quantity)
    const body = {
      id: id,
      quantity: method == "+" ?
        quantity + 1 :
        (check ? check - 1 : 0)
    }
    try {
      const response = await axios.put(`${url}/menu/quantity`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = response.data;
      if (responseData.InsertedId > 0) {
        setQuantity(body?.quantity)
        toast.success("Quantity updated");
      } else {
        toast.error("Something is wrong");
      }
    }
    catch (error) {

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
  }
  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={m?.image} alt={m?.name} />
            </div>
          </div>
          <div>
            <div className="font-bold">
              {
                m?.name
              }
            </div>
            <div className="text-sm opacity-50">
              {
                m?.category
              }
            </div>
          </div>
        </div>
      </td>
      <td>
        {
          m?.price
        }
      </td>
      <td>
        <div className='flex items-center'>
          <button
            onClick={() => updateQuantity("-", quantity, m?.id)}
            className='btn btn-sm rounded-sm'
          >
            <FaRegMinusSquare />
          </button>
          <span className='btn btn-sm rounded-sm btn-disabled' style={{ color: 'black' }}>
            {
              quantity
            }
          </span>

          <button className='btn btn-sm rounded-sm'
            onClick={() =>
              updateQuantity("+", quantity, m?.id)
            }
          >
            <FaRegPlusSquare />
          </button>
        </div>
      </td>
      <th>
        <div className='flex flex-row gap-1'>
          <Link to={`/dashboardapp/edit-menu/${m.id}`}><button className=' bg-blue-500 px-4 py-1 hover:bg-blue-900 text-white rounded-lg '>Edit</button></Link>
          <button onClick={() => handleDelete(m?.id)} className='bg-red-500 hover:bg-red-900 text-white px-4 py-1 rounded-lg '>Delete</button>
        </div>
      </th>
    </tr>
  )
}
export default Allmenu;
