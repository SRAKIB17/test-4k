import React, { useState } from 'react';
import useUrl from '../../../CustomHooks/URL/UseUrl';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const AddEmploy = () => {
  const [url]=useUrl();
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
  });

  const jobRoles = ['manager','Waiter', 'Cook', 'Server', 'Bartender'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
  
    // Handle form submission here, e.g. make a POST request to your API
    console.log(formData);
    try {
      const res = await fetch(`${url}/employee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await res.json();



      if (responseData.Inserted > 0) {

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
        // deleteShoppingCart();




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
    
  
  };

  return (
  <>
    <div className="flex w-full justify-center items-center   m-3 mx-auto p-4">
      <div className="w-full font-bold   p-6 rounded shadow-2xl  ">
        <ToastContainer/>
        <h1 className="text-2xl font-bold mb-4 text-center ">Add Employee</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 bg-white focus:ring focus:ring-blue-300 px-3 py-2 rounded"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 bg-white focus:ring focus:ring-blue-300 px-3 py-2 rounded"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Id</label>
            <input
              type="number"
              name="id"
              className="w-full border border-gray-300 bg-white focus:ring focus:ring-blue-300 px-3 py-2 rounded"
              value={formData.id}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              className="w-full border border-gray-300 bg-white focus:ring focus:ring-blue-300 px-3 py-2 rounded"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Job Role</label>
            <select
              name="role"
              className="w-full border border-gray-300 bg-white text-black focus:ring focus:ring-blue-300 px-3 py-2 rounded"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Job Role</option>
              {jobRoles.map((role, index) => (
                <option key={index} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:ring focus:ring-blue-300">
              Add Employee
            </button>
          </div>
        </form>
      </div>
      
    </div>
    <Link to="/dashboard">
                              <button
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:ring focus:ring-blue-300"
                              >
                                    {'<----'} Back
                              </button>
                        </Link>
  </>
  );
};

export default AddEmploy;
