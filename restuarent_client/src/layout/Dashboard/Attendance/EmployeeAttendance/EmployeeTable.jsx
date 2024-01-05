import React from 'react';
import DataTable from 'react-data-table-component';

const EmployeeTable = () => {
      const columns = [
            {
                  name: 'Date',
                  selector: row => row.Date,
                  sortable: true,
            },
            {
                  name: 'Check_In',
                  selector: row => row.Check_In,
                  sortable: true,
            },
            {
                  name: 'Check_out',
                  selector: row => row.Check_out,
                  sortable: true,
            },
            {
                  name: 'Working_Hours',
                  selector: row => row.Working_Hours,
                  sortable: true,
            },
            {
                  name: 'Status',
                  selector: row => row.Status,
                  sortable: true,
            },
            {
                  name: 'Actions',
                  selector: row => row.Actions,
                  sortable: true,
            },
      ];

      const data = [
            {
                  Date: 1,
                  Check_In: 'Beetlejuice',
                  Check_out: '1988',
                  Working_Hours: 12,
                  Status: "Present",
                  Actions: <div className='flex gap-4'>
                        <button>Edit</button>
                        <button>Delete</button>
                  </div>
            },
            {
                  Date: 1,
                  Check_In: 'Beetlejuice',
                  Check_out: '1988',
                  Working_Hours: 12,
                  Status: "Present",
                  Actions: <div className='flex gap-4'>
                        <button>Edit</button>
                        <button>Delete</button>
                  </div>
            },
            {
                  Date: 1,
                  Check_In: 'Beetlejuice',
                  Check_out: '1988',
                  Working_Hours: 12,
                  Status: "Present",
                  Actions: <div className='flex gap-4'>
                        <button>Edit</button>
                        <button>Delete</button>
                  </div>
            },
            {
                  Date: 1,
                  Check_In: 'Beetlejuice',
                  Check_out: '1988',
                  Working_Hours: 12,
                  Status: "Present",
                  Actions: <div className='flex gap-4'>
                        <button>Edit</button>
                        <button>Delete</button>
                  </div>
            },
            {
                  Date: 1,
                  Check_In: 'Beetlejuice',
                  Check_out: '1988',
                  Working_Hours: 12,
                  Status: "Present",
                  Actions: <div className='flex gap-4'>
                        <button>Edit</button>
                        <button>Delete</button>
                  </div>
            },
            {
                  Date: 1,
                  Check_In: 'Beetlejuice',
                  Check_out: '1988',
                  Working_Hours: 12,
                  Status: "Present",
                  Actions: <div className='flex gap-4'>
                        <button>Edit</button>
                        <button>Delete</button>
                  </div>
            },
            {
                  Date: 1,
                  Check_In: 'Beetlejuice',
                  Check_out: '1988',
                  Working_Hours: 12,
                  Status: "Present",
                  Actions: <div className='flex gap-4'>
                        <button>Edit</button>
                        <button>Delete</button>
                  </div>
            },
            {
                  Date: 1,
                  Check_In: 'Beetlejuice',
                  Check_out: '1988',
                  Working_Hours: 12,
                  Status: "Present",
                  Actions: <div className='flex gap-4'>
                        <button>Edit</button>
                        <button>Delete</button>
                  </div>
            },
            {
                  Date: 1,
                  Check_In: 'Beetlejuice',
                  Check_out: '1988',
                  Working_Hours: 12,
                  Status: "Present",
                  Actions: <div className='flex gap-4'>
                        <button>Edit</button>
                        <button>Delete</button>
                  </div>
            },

      ]
      return (
            <div>
                  <DataTable
                        columns={columns}
                        data={data}
                        pagination
                  />
            </div>
      );
};

export default EmployeeTable;