import React from 'react';
import useXReportData from '../../CustomHooks/GetXReportData';
import Loader from '../Loader';

const XReport = () => {
      const [xReportData, isXReportData] = useXReportData()

      if (isXReportData) return <Loader />
      const totalPrice = xReportData?.orders?.reduce((accumulator, currentItem) => {
            return accumulator + (currentItem.price * currentItem.totalQuantity);
      }, 0);
      return (
            <div>
                  <h1 className=' text-2xl font-bold py-5 text-center'>Total Sales Report After Report Z : {xReportData?.lastDate}</h1>
                  <div className="overflow-x-auto">
                        <table className="table w-[90%] mx-auto table-zebra">
                              {/* head */}
                              <thead>
                                    <tr className=' bg-gray-300'>
                                          <th>#</th>
                                          <th>ID</th>
                                          <th>Name</th>
                                          <th>Category</th>
                                          <th>Price</th>
                                          <th>Quantity</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {
                                          xReportData?.orders?.map((report, index) =>
                                                <tr key={index}>
                                                      <th>{index + 1}</th>
                                                      <td>{report.id}</td>
                                                      <td>{report.name}</td>
                                                      <td>{report.category}</td>
                                                      <td>${report.price}</td>
                                                      <td>{report.totalQuantity}</td>

                                                </tr>
                                          )
                                    }
                                    <tr className='bg-gray-200'>
                                          <th></th>
                                          <td></td>
                                          <td></td>
                                          <th>Total Price </th>
                                          <th>${totalPrice}</th>
                                          <td></td>
                                          
                                    </tr>

                              </tbody>
                        </table>
                  </div>
            </div>
      );
};

export default XReport;