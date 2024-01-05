import React, { useState } from 'react';

import Loader from '../Loader';
import useUrl from '../../CustomHooks/URL/UseUrl';
import OrderData from '../../CustomHooks/OrderData/OrderData';
import { ToastContainer, toast } from 'react-toastify';
import OrderTab from './OrderTab';
import MenuData from '../../CustomHooks/MenuData/MenuData';
const PaypalOrder = () => {

      const { order, isLoading, refetch } = OrderData();
      const {menu}= MenuData()

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



      const filterOrder = combinedData?.filter((order) => order.wayToPurchase == 'paypal')




      return (
            <div className="p-6 w-full text-black">

                  <ToastContainer />
                  <h1 className="font-bold text-2xl p-3 text-center">Order List of Paypal Payment</h1>
                  <hr />
                  <br></br>

                  {/* <table></table> */}
                  <div>
                        <div className="overflow-x-auto">
                              <table className="table table-xs table-zebra">
                                    {/* head */}
                                    <thead>
                                          <tr>
                                                <th>
                                                      SI. No.
                                                </th>
                                                <th>
                                                      Order Id
                                                </th>
                                              
                                                <th>Mobile</th>
                                                <th>Food Id</th>
                                                <th>Food Items</th>
                                                <th>Quantity</th>
                                                <th>total Amount</th>
                                                <th>Action</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {/* row 1 */}
                                          {
                                                filterOrder?.map((order, index) => <OrderTab index={index} key={index} order={order} />)
                                          }

                                    </tbody>
                                    {/* foot */}
                                    <tfoot>
                                          <tr>
                                                <th>
                                                      SI.No.
                                                </th>
                                                <th>
                                                      Order Id
                                                </th>
                                                <th>Mobile</th>
                                                <th>Food Id</th>
                                                <th>Food Items</th>
                                                <th>Quantity</th>
                                                <th>total Amount</th>
                                                <th>Action</th>
                                          </tr>
                                    </tfoot>

                              </table>
                        </div>
                  </div>



            </div>
      );
};

export default PaypalOrder;