import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useUrl from '../../../CustomHooks/URL/UseUrl';
import useCategory from '../../../CustomHooks/GetCategories';
import Loader from '../../../Componets/Loader';
import { ToastContainer, toast } from 'react-toastify';

const EditCategory = () => {
      const [url] = useUrl();
      const [allCategories, isCategoryLoading] = useCategory()
      const { register, handleSubmit } = useForm()
      const { code } = useParams();
      const navigate = useNavigate()

      if (isCategoryLoading) return <Loader />

      const category = allCategories.find(c => c.code == code);


      const onSubmit = async (data) => {
            try {
                  const res = await fetch(`${url}/category`, {
                        method: 'PATCH',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                  });

                  const responseData = await res.json();



                  if (responseData.Updated > 0) {

                        toast.success(responseData.message, {
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",

                        });
                        const goToHone = () => {

                              navigate('/dashboardapp/all-categories');
                        }

                        setTimeout(goToHone, 3000)
                        // deleteShoppingCart();

                        // navigate('/dashboard');




                  } else {
                        toast.error(responseData.message, {
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
            <div className=' flex justify-center'>

                  <div className="w-full  relative bg-white p-6 rounded shadow-md max-w-md">

                        <h2 className="text-2xl  font-semibold mb-4 text-center">Edit Category: </h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                              <div>
                                    <div>
                                          <label className="block font-semibold">Category Code</label>
                                          <input type="text" defaultValue={category.code} className="w-full bg-white border border-gray-300 px-3 py-2 rounded text-black" {...register('code')} />
                                    </div>
                                    <div>
                                          <label className="block font-semibold">Category Name</label>
                                          <input type="text" defaultValue={category.category_name} className="w-full bg-white border border-gray-300 px-3 py-2 rounded text-black" {...register('name')} />
                                    </div>

                                    <div>
                                          <label className="block font-semibold">Category Image URL</label>
                                          <input type="text" defaultValue={category.category_image} className="w-full bg-white border border-gray-300 px-3 py-2 rounded text-black" {...register('image')} />
                                    </div>
                              </div>



                              <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save</button>
                        </form>
                        <ToastContainer/>
                        <Link to='/dashboardapp/all-categories'><button className=' absolute top-3 bg-red-500 text-white rounded-lg px-4 py-1 right-3'>Cancel</button></Link>

                  </div>
            </div>
      );
};

export default EditCategory;