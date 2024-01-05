import React, { useState } from 'react';
import OrderData from '../../CustomHooks/OrderData/OrderData';
import MenuData from '../../CustomHooks/MenuData/MenuData';
import { useForm } from 'react-hook-form';

const ReportX = () => {

      const [orders, setOrders] = useState(null)
      const { order } = OrderData();
      const { menu } = MenuData()
     
      const { handleSubmit, register } = useForm()
  





      if (!menu ) return <Loader />





      // Function to get information about food items in an order
      const getFoodInfoFromOrder = (order) => {
            return order?.items?.map((item) => {
                  const foodId = item.itemID;
                  const quantity = item.quantity;
                  const foodInfo = menu?.find((m) => m.id == foodId);

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
      let combinedData = orders ? orders.map((order) => {
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
      })
            : order?.map((order) => {
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

      console.log(combinedData);

      // cash price 
      let CashPrice = 0;

      function calculateTotalPrice(order) {
            return order.foodInfo.reduce((total, food) => total + (food.quantity * food.price), 0);
      }

      // Calculate total price for each order
      combinedData.forEach(order => {
            if (order?.wayToPurchase === 'cash') {
                  const totalPrice = calculateTotalPrice(order);
                  CashPrice += totalPrice;
            }
      });




      // paypal price  
      let PaypalPrice = 0;

      function calculateTotalPrice(order) {
            return order?.foodInfo?.reduce((total, food) => total + (food.quantity * food.price), 0);
      }

      // Calculate total price for each order
      combinedData.forEach(order => {
            if (order.wayToPurchase === 'paypal') {
                  const totalPrice = calculateTotalPrice(order);
                  PaypalPrice += totalPrice;
            }
      });


      const handleGetData = async (data) => {
            console.log(data);
            try {
                  const res = await fetch(`${url}/orders-time?startDate=${data?.startDate}&endDate=${data?.endDate}`);

                  const response = await res.json()
                  if (response) {
                        setOrders(response)
                  }


            }
            catch (err) {
                  console.log(err);
            }
      }
      return (
            <div>

                  <form onSubmit={handleSubmit(handleGetData)} className="flex justify-center  items-center gap-10 my-8 flex-col md:flex-row ">
                        <div className="flex items-center  gap-2 justify-center">

                              <div><p className=" text-lg">Start date:</p></div>
                              <input className=" bg-slate-200 px-5 py-2 rounded-md" type="date"
                                    {...register('startDate')}
                              ></input>
                        </div>

                        <div className="flex items-center  gap-2 justify-center">


                              <div><p className="text-lg">end date:</p></div>
                              <input className="bg-slate-200 px-5 py-2 rounded-md" type="date"
                                    {...register('endDate')}
                              ></input>
                        </div>




                        <button className=" bg-blue-500 px-5 py-1 rounded-md text-white hover:bg-blue-700">Filter</button>

                  </form>


                  <section className="  w-full lg:w-2/3 mx-auto mb-12 ">
                        <div id="print-content" className="py-2  gap-6 ">
                              <div>
                                    <h1 className=" text-3xl font-bold text-gray-400 text-end m3-5">Sales Report</h1>
                              </div>

                              <table class="w-full  mx-auto bg-white border border-gray-500">
                                    <thead className=" bg-gray-400 text-white">
                                          <th class=" border-b-gray-400 w-[50px] py-2 px-4 border border-gray-400"> # </th>
                                          <th class="py-2 px-4 border border-gray-400"> Description </th>
                                          <th class="py-2 px-4 border border-gray-400"> Amount </th>
                                    </thead>
                                    <tbody className="text-center">
                                          <tr>
                                                <td class="py-2 w-[50px] px-4 border border-gray-400"> 1 </td>
                                                <td class="py-2 px-4 border border-gray-400"> Total Cash </td>
                                                <td class="py-2 px-4 border border-gray-400 text-end"> $${CashPrice} </td>
                                          </tr>
                                          <tr>
                                                <td class="py-2 w-[50px] px-4 border border-gray-400"> 2 </td>
                                                <td class="py-2 px-4 border border-gray-400"> Total Paypal </td>
                                                <td class="py-2 px-4 border border-gray-400 text-end" > ${PaypalPrice} </td>
                                          </tr>
                                          <tr className=" bg-gray-400 text-white font-bold">
                                                <td></td>
                                                <td>Total Sales :</td>


                                                <td class="py-2 px-4 border-gray-400 text-end"> ${CashPrice + PaypalPrice} </td>
                                          </tr>
                                    </tbody>
                              </table>



                        </div>
                        {/* <div className=" flex justify-end">
                              <button onClick={handlePrint} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
                                    Print
                              </button>
                        </div> */}
                  </section>

            </div>
      );
};

export default ReportX;