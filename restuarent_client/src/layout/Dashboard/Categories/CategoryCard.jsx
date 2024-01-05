import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useUrl from '../../../CustomHooks/URL/UseUrl';
import useCategory from '../../../CustomHooks/GetCategories';
import { ToastContainer, toast } from 'react-toastify';

const CategoryCard = ({category}) => {
      const [, ,refetch]= useCategory();
      const [url]=useUrl()
      const handleStatus=async(category)=>{
            const id= category.code;
            const text = category.status;
            Swal.fire({
                  title: 'Are you sure?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
                }).then(async(result) => {
                  if (result.isConfirmed) {
                        try {
                              const res = await fetch(`${url}/editStatus/${id}`, {
                                method: 'PATCH',
                                headers: {
                                 'Content-Type': 'application/json',
                                 },
                                 body:JSON.stringify({status:text == 'open'?'close':'open'})
                                
                              });
                        
                              const responseData = await res.json();
                              
                              if (responseData.Updated > 0) {
                                    refetch()
                        
                                toast.success(responseData.message, {
                                  position: "top-right",
                                  autoClose: 3000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                  theme: "light",
                        
                                });
                               
                                
                        
                        
                        
                              } else {
                                toast.error(responseData.message, {
                                  position: "top-right",
                                  autoClose: 3000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                  theme: "light",
                                });
                              }
                            } catch (error) {
                              console.error("Error while sending the order:", error);
                              toast.error("Error while sending the order. Please try again later.", {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                              });
                            }
                  }
                })
      }
      return (
            <div className=' rounded-md border shadow-md bg-gray-100  max-w-xs'>
                  <ToastContainer/>
                  <div className=' flex items-center gap-3 justify-between pr-5'>
                        <img className=' w-[150px] h-[150px]   rounded-s-md' src={category?.category_image} alt="" />
                        <div>
                              <p>{category?.code}</p>
                              <h1 className=' text-xl font-semibold'>{category?.category_name}</h1>
                              <div className=' flex gap-3 justify-between mt-4'>
                                    <Link to={`/dashboardapp/editCategory/${category.code}`}><button className='bg-blue-500 text-white px-2 py-1 rounded mr-2'>  <FontAwesomeIcon icon={faEdit} /></button></Link>
                                    <button onClick={()=>handleStatus(category)} className={`text-white px-2 py-1 ${category.status=='close'? 'bg-red-500':'bg-green-500'} rounded mr-2`}>{category?.status}</button>
                              </div>
                        </div>
                  </div>

            </div>
      );
};

export default CategoryCard;