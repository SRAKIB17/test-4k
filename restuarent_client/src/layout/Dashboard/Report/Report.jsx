import { useEffect, useState } from "react";
import Loader from "../../../Componets/Loader";
import MenuData from "../../../CustomHooks/MenuData/MenuData";
import OrderData from "../../../CustomHooks/OrderData/OrderData";
import UseReport from "../../../CustomHooks/UseRport/UseReport";
import ReportTable from "./ReportTable";
import { useForm } from "react-hook-form";
import useUrl from "../../../CustomHooks/URL/UseUrl";
import html2pdf from 'html2pdf.js';
import { Link, Outlet } from "react-router-dom";
import XReport from "../../../Componets/Reports/XReport";
import useXReportData from "../../../CustomHooks/GetXReportData";
import { ToastContainer, toast } from "react-toastify";



const Report = () => {
      const [url] = useUrl()
      const [orders, setOrders] = useState(null)
      const { order } = OrderData();
      const { menu } = MenuData()
      const { report, isReportLoading } = UseReport()
      const { handleSubmit, register } = useForm()
      const [isPrint, setPrint] = useState(false)
      const [xReportData, isXReportData, refetch] = useXReportData()




      if (isReportLoading || !menu || isXReportData) return <Loader />

      // console.log(orders);

    






    

      // print 
      const handlePrint = async () => {
            const totalPrice = xReportData?.orders.reduce((accumulator, currentItem) => {
                  return accumulator + (currentItem.price * currentItem.totalQuantity);
            }, 0);
            const content = document.getElementById('print-content');

            // Create the PDF
            html2pdf(content);

            // You can customize the PDF options if needed, for example:
            html2pdf(content, { margin: 20, filename: 'report.pdf' });


            try {
                  const response = await fetch(`${url}/report-x`, {
                        method: "POST",
                        headers: {
                              'Content-Type': 'Application/json'
                        },
                        body: JSON.stringify({ endDate: xReportData?.lastDate, startDate: xReportData?.startDate, price: totalPrice })

                  })

                  const responseDate = await response.json();
                  if (responseDate.status) {
                        refetch()
                        toast.success(responseDate.message, {
                              position: "top-right",
                              autoClose: 1500,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                        });
                  }
                  else{
                        toast.error("Not Download. Something went wrong!!!", {
                              position: "top-right",
                              autoClose: 1500,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                            });
                  }

            }
            catch (err) { console.log(err); }
      };
      return (
            <div>
                  <ToastContainer/>


                  <div>
                        <h1 className=" text-center text-2xl font-semibold">Report</h1>


                  </div>

                  <div className="flex gap-5 justify-center py-5">
                        <Link onClick={() => setPrint(false)} to='x-report' className='bg-blue-500 hover:bg-blue-800 py-2 px-10 rounded-md text-white font-bold'>Report X</Link>
                        <button onClick={() => setPrint(!isPrint)} className='bg-blue-500 py-2 px-10 hover:bg-blue-800 rounded-md text-white font-bold'>Report Z</button >
                        <Link onClick={() => setPrint(false)}  to='z-report' className='bg-blue-500 py-2 px-10 rounded-md text-white font-bold'>Report Z History</Link>
                        <Link onClick={() => setPrint(false)}  to='' className='bg-blue-500 py-2 px-10 rounded-md text-white font-bold'>Refresh</Link>
                  </div>
                  <div id="print-content">
                        <Outlet />
                  </div>


                  {
                        isPrint && <div className=" flex justify-end">
                              <button onClick={handlePrint} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
                                    Print
                              </button>
                        </div>
                  }


            </div>
      );
};

export default Report;
