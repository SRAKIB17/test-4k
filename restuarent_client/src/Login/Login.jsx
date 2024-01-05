import React, { useContext, useState } from 'react';
import restaurent from '../../public/restaurent.json'
import Lottie from 'react-lottie';
import { Controller, useForm } from 'react-hook-form';
import { AuthContext } from '../providers/AuthoProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
      const { login } = useContext(AuthContext);
      const navigate = useNavigate()
      const location = useLocation()
      const [loading, isLoading] = useState(false)
      const { handleSubmit, register, formState: { errors } } = useForm();

      const from = location.state?.from?.pathname || '/'

      const onSubmit = (data) => {
            isLoading(true)
            login(data.id)
                  .then((r) => {

                        navigate(from, { replace: true })

                        isLoading(false)
                  })
                  .catch(err => {
                        toast.error("User Id is Incorrect . Please Provide Valid Id", {
                              position: "top-right",
                              autoClose: 2000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",

                        });
                        isLoading(false)
                  })
           



      };

      //lottie image
      const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: restaurent, // Replace with your animation JSON data
      };
      return (

            <div>
                  <ToastContainer />
                  <div className='py-6 shadow-md flex justify-around'>
                        <div className='flex items-center justify-center'>
                              <Link to="/">
                                    <button
                                          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:ring focus:ring-blue-300"
                                    >
                                          {'<----'} Back
                                    </button>
                              </Link>
                        </div>
                        <h2 className=' text-3xl font-bold text-center'>Welcome to X</h2>
                  </div>
                  <div className="hero  ">

                        <div className="hero-content flex-col md:flex-row">
                              <div className="flex  justify-center items-center hidden md:block ">
                                    <Lottie className="" options={defaultOptions} />
                              </div>
                              <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                          <div className="form-control">
                                                <label className="label">
                                                      <span className="label-text">User ID</span>
                                                </label>
                                                <input type="text" placeholder="Enter your ID" className="input input-bordered"
                                                      {...register("id", { required: "ID is required" })}
                                                />
                                                {errors.id && <p className="text-red-500 mt-1">{errors.id.message}</p>}
                                          </div>

                                          <div className="form-control mt-6">
                                                {
                                                      loading ? <button className="btn">
                                                            <span className="loading loading-spinner"></span>
                                                            loading
                                                      </button>
                                                            : <button className="btn btn-primary">Login </button>
                                                }

                                          </div>
                                    </form>
                              </div>
                        </div>
                  </div>

            </div>
      );
};

export default Login;