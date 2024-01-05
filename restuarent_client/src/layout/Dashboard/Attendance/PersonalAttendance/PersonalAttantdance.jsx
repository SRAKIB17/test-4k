import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../providers/AuthoProvider';
import useUrl from '../../../../CustomHooks/URL/UseUrl';
import useHour from '../../../../CustomHooks/GetHours';

const PersonalAttendance = () => {
  const [personalAttendance] = useHour()
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const filteredInfo = personalAttendance?.filter((attan) =>
    attan?.employeeId.includes(searchQuery.toLowerCase())
  );

  return (
    <div contextMenu=''>
      
      <div className='flex gap-2 items-center md:gap-20  justify-center m-4'>
      <h1 className='font-bold text-center m-4 underline'>Personal Attendance</h1>

        <input
          type='search'
          className='py-2 px-10 outline-none rounded-lg  text-black shadow-sm bg-slate-100' // Add border and border-black classes
          placeholder='Search by employee id...'
          onChange={handleSearchChange}
        />

      </div>
      <div className="overflow-x-auto">
        <table className="md:w-[70%] mx-auto table table-zebra mb-12">
          <thead>
            <tr className=' text-sm'>
              <th className="py-2">Employee ID</th>
              <th className="py-2">Name</th>
              <th className="py-2">Entry Hour</th>
              <th className="py-2">Exit Hour</th>
              <th className="py-2">Entry Date</th>
              <th className="py-2">Exit Date</th>
              <th className="py-2">Hours</th>
            </tr>
          </thead>
          <tbody>

            {
              filteredInfo?.map((attendance) =>
                <tr key={attendance.attendanceId} className=' text-xs text-center'>
                  <td>{attendance?.employeeId}</td>
                  <td>{attendance?.name}</td>
                  <td>{attendance?.entryTime}</td>
                  <td>{attendance?.exitTime}</td>
                  <td>{attendance?.entryDate?.split('T')[0] || ''}</td>
                  <td>{attendance?.exitDate?.split('T')[0] || ''}</td>
                  <td>{attendance?.work_hours || 0}</td>
                </tr>
              )
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PersonalAttendance;
