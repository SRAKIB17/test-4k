import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AllemployData from '../../../CustomHooks/AllemployData/AllemployData';
import useUrl from '../../../CustomHooks/URL/UseUrl';
import { ToastContainer, toast } from 'react-toastify';

const EmplyEdidt = ({ id }) => {

  const { employee, isLoading, refetch } = AllemployData();

  const [formData, setFormData] = useState({});
  const [employItem, setEmployItem] = useState(null);

  const jobRoles = ['manager', 'Waiter', 'Kitchen'];
  const [url] = useUrl();
  useEffect(() => {
    if (!isLoading) {
      const item = employee.find(item => item.id === id);
      if (item) {
        setEmployItem(item);
        setFormData({
          id:id,
          name: item.name,
          address: item.address,
          phone: item.phone,
          jobtitle: item.jobtitle,
          status: item.status
          // Add other fields here
        });
      }
    }
  }, [id, employee, isLoading]);


  

  const handleFormSubmit = async (e) => {
    e.preventDefault();

 

    try {
      const res = await fetch(`${url}/employee/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await res.json();


      if (responseData.updated > 0) {
        toast.success(responseData.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });

        
      } else {
        toast.error(responseData.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error) {
      console.error('Error while sending the request:', error);
      toast.error('Error while sending the request. Please try again later.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };


  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full flex justify-center items-center bg-gray-100 ">
      <ToastContainer></ToastContainer>
      <div className="w-full bg-white p-6 rounded shadow-md max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Edit Employee: {id}</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <label className="block font-semibold">Name</label>
          <input
            type="text"
            value={formData.name || ''}
            className="w-full bg-white border border-gray-300 px-3 py-2 rounded text-black"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <label className="block font-semibold">Address</label>
          <input
            type="text"
            value={formData.address || ''}
            className="w-full bg-white border border-gray-300 px-3 py-2 rounded text-black"
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />

          <label className="block font-semibold">Phone</label>
          <input
            type="text"
            value={formData.phone || ''}
            className="w-full bg-white border border-gray-300 px-3 py-2 rounded text-black"
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          <label className="block font-semibold">Role</label>
          <select
            value={formData.jobtitle || ''}
            className="select select-bordered w-full max-w-xs"
            onChange={(e) => setFormData({ ...formData, jobtitle: e.target.value })}
          >
            {/* <option value="">Select a role</option> */}
            {jobRoles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <label className="block font-semibold">Status</label>
          <select
            value={formData.status || ''}
            className="select select-bordered w-full max-w-xs"
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            {/* <option value="">Select a role</option> */}
           
              <option  value={'active'}>Active</option>
           
              <option  value={'close'}>Deactive</option>
           

         
          </select>

        

          {/* Add more form fields here */}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmplyEdidt;
