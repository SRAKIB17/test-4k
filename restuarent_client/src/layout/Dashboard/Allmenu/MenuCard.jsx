import React from 'react';
import { Link } from 'react-router-dom';
import useUrl from '../../../CustomHooks/URL/UseUrl';
import { ToastContainer, toast } from 'react-toastify';
import MenuData from '../../../CustomHooks/MenuData/MenuData';
import Swal from 'sweetalert2';

const MenuCard = ({ menu }) => {
      const {refetch}=MenuData();
      const [url]=useUrl()
      const handleDelete=async(id)=>{

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
                              const res = await fetch(`${url}/menu`, {
                                method: 'DELETE',
                                headers: {
                                 'Content-Type': 'application/json',
                                 },
                                body: JSON.stringify({id:id}),
                              });
                        
                              const responseData = await res.json();
                        
                        
                        
                              if (responseData.Deleted > 0) {
                        
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
                                // deleteShoppingCart();
                        
                                // navigate('/dashboard');
                                refetch()
                        
                        
                        
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
            <div className=' rounded-lg border flex flex-col'>
                  <ToastContainer/>
                  <img className=' rounded-t-lg' src={menu?.image} alt="" />
                  <div className=' p-4 '>
                        <h1 className=' text-2xl font-semibold'>{menu?.name}</h1>
                        <p className=' text-justify'>
                              {menu?.recipe}
                        </p>
                        <div>
                              <p><span className=' font-semibold'>Category : </span> {menu?.category}</p>
                              <p><span className=' font-semibold'>Price : </span>${menu?.price}</p>
                        </div>

                  </div>
                  <div className=' flex justify-between mt-auto px-6 pb-4'>
                        <Link to={`/dashboardapp/edit-menu/${menu.id}`}><button className=' bg-blue-500 px-4 py-1 hover:bg-blue-900 text-white rounded-lg '>Edit</button></Link>
                        <button onClick={()=>handleDelete(menu?.id)} className='bg-red-500 hover:bg-red-900 text-white px-4 py-1 rounded-lg '>Delete</button>
                  </div>


            </div>
      );
};

export default MenuCard;