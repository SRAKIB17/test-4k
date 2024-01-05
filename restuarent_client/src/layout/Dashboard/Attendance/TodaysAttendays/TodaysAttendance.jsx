import React from 'react';
import TodaysTable from './TodaysTable';

const TodaysAttendance = () => {
      return (
            <div>
                  <div className=' shadow-md px-10 flex py-6 items-center justify-center'>
                        <h1 className=' text-2xl font-bold  text-center '>Today Attendance</h1>
                        
                  </div>

                  <div className=' mx-10  border mt-12 rounded-md mb-16'>
                        <div className="flex items-center space-x-2 py-4 bg-slate-100">
                              <label className="text-gray-600 flex gap-4 px-6">
                                   <span className=' text-xl font-semibold'> Attendance</span>
                                    {/* <div className="relative">
                                          <input type="text" className="border border-gray-300 pl-8 pr-2 py-1 rounded-lg focus:outline-none focus:ring focus:border-blue-300"/>
                                                
                                    </div> */}
                              </label>
                        </div>

                        <TodaysTable />
                  </div>
            </div>
      );
};

export default TodaysAttendance;