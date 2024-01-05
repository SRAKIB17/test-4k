import React from 'react';
import useZReportHistory from '../../CustomHooks/UseZReportHistory';
import Loader from '../Loader';

const ZReportHistory = () => {
      const [ZReportHistory, isZReportHistory, zRefetch] = useZReportHistory()
      if (isZReportHistory) return <Loader />
      console.log(ZReportHistory);
      return (
            <div>
                  <h1 className='text-2xl font-bold text-center my-2'>All Sales History</h1>
                  <table className="table w-[90%]  mx-auto table-zebra">
                        {/* head */}
                        <thead>
                              <tr className=' bg-gray-300'>
                                    <th>#</th>

                                    <th>TO</th>
                                    <th>FROM</th>
                                    <th>Price</th>

                              </tr>
                        </thead>
                        <tbody>
                              {
                                    ZReportHistory?.map((report, index) =>
                                          <tr key={index}>
                                                <th>{index + 1}</th>

                                                <td>{report.startDate}</td>
                                                <td>{report.last_z_report_date}</td>
                                                <td>${report.last_report_price}</td>


                                          </tr>
                                    )
                              }


                        </tbody>
                  </table>

            </div>
      );
};

export default ZReportHistory;