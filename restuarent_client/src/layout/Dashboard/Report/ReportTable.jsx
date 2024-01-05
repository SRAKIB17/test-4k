import React from 'react';
import DataTable from 'react-data-table-component';

const ReportTable = ({ report }) => {
      // ds
      const columns = [
            
            {
                  name: 'Order ID',
                  selector: row => row.order_id,
                  sortable: true,
            },
            {
                  name: 'Name',
                  selector: row => row.name,
                  sortable: true,
            },
            {
                  name: 'Date',
                  selector: row => row.order_date.split("T")[0],
                  sortable: true,
            },

            {
                  name: 'Price',
                  selector: row =>`$${row.total}` ,
                  sortable: true,
            },
      ];
      return (
            <DataTable
                  columns={columns}
                  data={report}

            />
      );
};

export default ReportTable;