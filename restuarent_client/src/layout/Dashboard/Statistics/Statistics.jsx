import React, { useState } from 'react';

import StackBarChart from '../Stackbarchart/StackBarChart';
import Loader from '../../../Componets/Loader';
import OrderData from '../../../CustomHooks/OrderData/OrderData';
import MenuData from '../../../CustomHooks/MenuData/MenuData';
import useTotalCustomer from '../../../CustomHooks/GetTodatlCustomer';
import useMostSoldItem from '../../../CustomHooks/GetMostSoldItem';
import { useForm } from 'react-hook-form';
import useUrl from '../../../CustomHooks/URL/UseUrl';

const Statistics = () => {
  const [url] =useUrl()
  const { order, isLoading } = OrderData();
  const { menu } = MenuData();
  const [totalCustomer] = useTotalCustomer();
  const [mostSoldItem] = useMostSoldItem()
  const [bestSold,setBestSold]= useState('')
  const { handleSubmit, register } = useForm()

  if (isLoading || !menu) {
    return <Loader />
  }

  // Function to get information about food items in an order
  const getFoodInfoFromOrder = (order) => {
    return order.items.map((item) => {
      const foodId = item.itemID;
      const quantity = item.quantity;
      const foodInfo = menu.find((m) => m.id == foodId);

      if (foodInfo) {
        return {
          foodId,
          quantity,
          name: foodInfo.name,
          price: foodInfo.price,
          category: foodInfo.category,
          recipe: foodInfo.recipe,
        };
      } else {
        return {
          foodId,
          quantity,
          name: 'Unknown Food',
          price: 0,
          category: 'Unknown Category',
          recipe: 'Unknown Recipe',
        };
      }
    });
  };

  // Combine menu and orders data
  const combinedData = order?.map((order) => {
    const orderID = order.orderID;
    const phoneNumber = order.customerPhoneNumber;
    const executionTime = order.executionTime;
    const wayToPurchase = order.wayOfPurchase;
    const orderStatus = order.orderStatus;
    const foodInfo = getFoodInfoFromOrder(order);


    return {
      orderID,
      phoneNumber,
      executionTime,
      wayToPurchase,
      orderStatus,
      foodInfo,
    };
  });

  // Calculate statistclgics


  const totalQuantity = combinedData.reduce((acc, item) => acc + item.foodInfo[0].quantity, 0);

  // const totalPrice = combinedData.reduce((acc, item) => acc + item.foodInfo?.map(food=>food.price * food.quantity), 0); // Using the 'total' field
  let price = 0;
  function calculateTotalPrice(order) {
    return order.foodInfo.reduce((total, food) => total + (food.quantity * food.price), 0);
  }

  // Calculate total price for each order
  combinedData.forEach(order => {
    const totalPrice = calculateTotalPrice(order);
    price += totalPrice

  });



  const handleFilter = async(data) => {
    console.log(data);
    try{
      const res= await fetch(`${url}/orders-within-dates?startDate=${data?.startDate}&endDate=${data?.endDate}`);
      const response= await res.json();
      console.log(response);
     setBestSold(response)

    }catch(error){
      console.log(error);
    }
  }

  const filterItems= bestSold ? bestSold :mostSoldItem;
 
  return (
    <div className="p-8 text-center w-[100%] mb-3 mx-auto">
      <h1 className="text-center font-bold uppercase text-2xl">Statistics</h1>
      <hr className="my-4" />
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg shadow-2xl">
          <h2 className="text-xl font-semibold mb-2">Total Customer</h2>
          <p className="text-2xl">{totalCustomer[0]?.totalCustomer}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-2xl">
          <h2 className="text-xl font-semibold mb-2">Total Quantity Order</h2>
          <p className="text-2xl">{totalQuantity}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-2xl">
          <h2 className="text-xl font-semibold mb-2">Total Price</h2>
          <p className="text-2xl">${price.toFixed(2)}</p>
        </div>
      </div>

      <section className="mt-5">
        <StackBarChart data={combinedData} />
      </section>


      {/* most sold item */}
      <h1 className=' text-2xl font-semibold text-center mt-10'>Top Most Foods Sold</h1>

      <form onSubmit={handleSubmit(handleFilter)} className=' flex flex-col lg:flex-row justify-center gap-5 mt-5 '>
        <div className=' '>
          <label className='mr-3' htmlFor="">Start</label>
          <input
            className=' border px-8 py-2 rounded-md shadow bg-slate-200' type="date" name="" id=""
            {...register('startDate')}
          />
        </div>
        <div className=' '>
          <label className='mr-3' htmlFor="">End</label>
          <input
            className=' border px-8 py-2 rounded-md shadow bg-slate-200' type="date" name="" id=""
            {...register('endDate')}
          />
        </div>
        <div className=''>
          <button className='border px-8 py-2 rounded-md shadow bg-blue-500 text-white'>Filter</button>
        </div>
      </form>
      <section className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-12'>

        {
          filterItems?.map((item, index) =>
            <div key={index} className=' border rounded-md'>
              <img src={item?.image} className=' rounded-t-md' alt="" />
              <div className=' flex flex-col my-3'>
                <h1 className=' font-xl font-semibold '>{item?.name}</h1>
                <p>{item?.recipe?.slice(0, 50)}...</p>
                <p className=' mt-4'>Category : {item?.category}</p>
                <p> Total Sales :{item?.totalQuantity}</p>

                <p>Price : ${item?.price}</p>
              </div>

            </div>
          )
        }
      </section>
    </div>
  );
};

export default Statistics;
