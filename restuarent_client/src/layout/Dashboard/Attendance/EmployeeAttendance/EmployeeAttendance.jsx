import React, { useState } from 'react';
import EmployeeTable from './EmployeeTable';
import { useForm } from 'react-hook-form';
import useUrl from '../../../../CustomHooks/URL/UseUrl';

const EmployeeAttendance = () => {
      const [url] = useUrl()
      const { handleSubmit, register } = useForm();
      const [employeeData,setEmployeeData]= useState(null);

      // const employee = JSON.parse(localStorage.getItem('user'));
      const employee = JSON.parse(sessionStorage.getItem('user'));

      const employee_id= employee?.id;
      const employee_role = employee?.role;
      const onsubmit = async(data) => {
            try {
                  const response = await fetch(`${url}/my-attendance?employee_id=${employee_id}&start_date=${data.start_date}&end_date=${data.end_date}`);

                  const responseData=await response.json();
                  setEmployeeData(responseData.data);

            } catch (err) {
                  console.log(err);
            }
      }

      

      return (
            <div>
                  <div className=' shadow-md px-10 flex py-6 items-center justify-center'>
                        <h1 className=' text-2xl font-bold  '>Employee Attendance</h1>

                  </div>
                  <div>
                        <div>
                              <form onSubmit={handleSubmit(onsubmit)} className='flex flex-col md:flex-row justify-end gap-10 my-10 '>
                                    <div className=' space-y-3'>
                                          <label htmlFor="start_date">From</label>
                                          <input className='w-full rounded-md' type="date" name="start_date" id="start_date"
                                                {...register('start_date')}
                                          />
                                    </div>
                                    <div className='space-y-3'>
                                          <label htmlFor="end_date">To</label>
                                          <input className='w-full rounded-md' type="date" name="end_date" id="end_date"
                                                {...register("end_date")} />
                                    </div>
                                    <div className='flex items-end'>

                                          <button className='btn btn-secondary'>Filter</button>
                                    </div>
                              </form>
                        </div>

                        <div className=' flex flex-wrap justify-center items-center gap-5  '>
                              <div className='w-full sm:w-auto border shadow-lg px-8 py-5 rounded-md text-center'>
                                    <h2 className=' text-xl font-bold'>{employee?.name}</h2>
                                    <p>{employee_role}</p>
                              </div>
                              <div className='w-full sm:w-auto border shadow-lg px-8 py-5 rounded-md text-center'>
                                    <h2 className=' text-xl font-bold'>Employee ID</h2>
                                    <p>{employee?.id}</p>
                              </div>
                              <div className='w-full sm:w-auto border shadow-lg px-8 py-5 rounded-md text-center'>
                                    <h2 className=' text-xl font-bold'>Total Attendance</h2>
                                    <p>{employeeData?.total_attendance || 0}</p>
                              </div>
                              <div className='w-full sm:w-auto border shadow-lg px-8 py-5 rounded-md text-center'>
                                    <h2 className=' text-xl font-bold'>Total Working</h2>
                                    <p>{employeeData?.total_hours || 0}</p>
                              </div>
                        </div>
                  </div>

                  {/* employee table 
                   */}

                  {/* <div className='mx-10  border mt-12 rounded-md mb-16'>
                        <EmployeeTable />
                  </div> */}
            </div>
      );
};

export default EmployeeAttendance;