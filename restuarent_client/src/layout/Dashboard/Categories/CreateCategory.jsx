import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import useUrl from '../../../CustomHooks/URL/UseUrl';

const CreateCategory = () => {
      const [url] = useUrl();

      const { register, handleSubmit,reset, formState: { errors } } = useForm();
      const onsubmit = async (data) => {
          
            try {
                  const res = await fetch(`${url}/category`, {
                        method: 'POST',
                        headers:{
                              'Content-Type': 'application/json',
                        },
                       
                        body:JSON.stringify(data)
                  });

                  const responseData = await res.json();


               
                  if (responseData.InsertedId ==1) {
                        reset()

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
      return (
            <div className="flex w-full justify-center items-center   m-3 mx-auto p-4">
                  <div className="w-full    p-6 rounded shadow-2xl  ">
                        <ToastContainer />
                        <div className=' flex justify-between '>
                              <h1 className=" mb-4 text-left text-xl">please insert valid information</h1>
                              <Link to='/dashboardapp/all-categories'> <button className=' btn btn-warning'>Cancel</button></Link>
                        </div>

                        <form onSubmit={handleSubmit(onsubmit)}>
                              <div className="mb-4">
                                    <label className="block text-sm font-semibold mb-1">Category Code</label>
                                    <input
                                          type="text"
                                          name="id"
                                          className="w-full border border-gray-300 bg-white focus:ring focus:ring-blue-300 px-3 py-2 rounded"
                                          {...register('category_code')}
                                          required
                                    />
                              </div>
                              <div className="mb-4">
                                    <label className="block text-sm font-semibold mb-1">Category Name</label>
                                    <input
                                          type="text"
                                          name="name"
                                          className="w-full border border-gray-300 bg-white focus:ring focus:ring-blue-300 px-3 py-2 rounded"
                                          {...register('category_name')}
                                          required
                                    />
                              </div>
                              <div className="mb-4">
                                    <label className="block text-sm font-semibold mb-1">Category Image Url</label>
                                    <input
                                          type="text"
                                          name="name"
                                          className="w-full border border-gray-300 bg-white focus:ring focus:ring-blue-300 px-3 py-2 rounded"

                                          {...register('image_url')}
                                          required
                                    />
                              </div>


                              <div className="mt-4">
                                    <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:ring focus:ring-blue-300">
                                          Add Category
                                    </button>
                              </div>
                        </form>
                  </div>

            </div>
      );
};

export default CreateCategory;