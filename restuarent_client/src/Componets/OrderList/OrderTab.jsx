import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import OrderData from '../../CustomHooks/OrderData/OrderData';
import useUrl from '../../CustomHooks/URL/UseUrl';

const OrderTab = ({ order, index }) => {
      const [url] = useUrl()
      const { isLoading, refetch } = OrderData();

      const handleOrder = async (order) => {
            const id = order?.orderID
            const items = order?.foodInfo?.map(r => {
                  return {
                        id: r?.foodId,
                        quantity: r?.quantity
                  }
            })
            if (order?.wayToPurchase == 'cash') {
                  try {
                        // Make an API call to update the button text based on order ID
                        const response = await fetch(`${url}/orders/${id}`, {
                              method: 'PATCH', // or 'POST' or 'PATCH' depending on your backend API
                              headers: {
                                    'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({ buttonText: "cancel", items: items }),
                        });
                        const responseData = await response.json()

                        if (responseData.updated) {
                              // Update the button text with the data from the backend

                              refetch()
                              toast.success(responseData.message);
                        } else {
                              toast.error(responseData.message);
                        }
                  } catch (error) {
                        console.error('Error updating button text:', error);
                  }
            }
            else {
                  console.log(id);
            }
      }
      const price = order?.foodInfo.map(item => item.price * item.quantity).reduce((total, price) => total + price, 0);
      const totalPrice = (price + price * 0.17)

      return (
            <>

                  <tr>

                        <td>
                              <ToastContainer />
                              {index + 1}
                        </td>
                        <td>
                              {order?.orderID}
                        </td>

                        <td>
                              {order?.phoneNumber}
                        </td>
                        <td>
                              {
                                    order?.foodInfo?.map((item, index) => <div key={index}>{item?.foodId}</div>)
                              }
                        </td>
                        <td>
                              {
                                    order?.foodInfo?.map((item, index) => <div key={index}>{item?.name}</div>)
                              }
                        </td>
                        <td>
                              {
                                    order?.foodInfo?.map((item, index) => <div key={index}>{item?.quantity}</div>)
                              }
                        </td>

                        <td>
                              ${
                                    // order?.foodInfo.map(item => item.price * item.quantity).reduce((total, price) => total + price, 0).toFixed(2)
                                    totalPrice?.toFixed(2)
                              }
                        </td>
                        <td>
                              {
                                    order?.wayToPurchase == 'cash' ?
                                          <button
                                                onClick={() => handleOrder(order)}
                                                className={`btn text-green-500 btn-ghost btn-xs ${order?.orderStatus == 'cancel' && ' text-red-500  '} `}
                                                disabled={order.orderStatus === 'cancel'}
                                          >
                                                {order?.orderStatus}
                                          </button>
                                          :
                                          <p >Paypal</p>

                              }

                        </td>
                  </tr>



            </>
      );
};

export default OrderTab;