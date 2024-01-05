import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { SetUser } from '../../../CustomHooks/SetUser/UserHook';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useUrl from '../../../CustomHooks/URL/UseUrl';
import { addToDb, getShoppingCart } from '../../utitilies/databse';
import MenuData from '../../../CustomHooks/MenuData/MenuData';
import { DataContext } from '../../../App';


const FoodCard = ({ item }) => {
const {addData}= useContext(DataContext)
  const { menu, isLoading, refetch } = MenuData();
  const [url] = useUrl();
  const { name, image, price, recipe, id, category } = item;
  const [quantity, setQuantity] = useState(1);
  const inputRef = useRef(null);
  const [user, setuser] = useState('');
  const [loading, setloading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };




  const onSubmit = async (data, e) => {
    e.preventDefault(); // Prevent form submission
 
    setQuantity(parseInt(data.quantity)); // Parse the quantity as an integer
    SetUser(data.name, data.mobile);
    const OrderItem = {
     
      foodId: id,
    };
    // setuser(OrderItem);
    addData(OrderItem)
    // addToDb(id, OrderItem);
    // toast.success("Menu is Added to Cart !!!", {
    //   position: "top-right",
    //   autoClose: 2000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",

    // });
    location.reload()

  
  };

  return (
    <div className="card bg-base-100 shadow-xl w-full md:w-[90%]   rounded-lg mb-2 ">
      <ToastContainer />
      <figure className="">
        <img src={image} alt="Shoes" className="w-full rounded-md" />
      </figure>
      <p className="bg-slate-900 text-white rounded-md e absolute top-0 right-0 p-2">${price}</p>
      <div className="p-2 flex flex-col items-center">
        <h2 className="text-xl font-semibold ">{name}</h2>
        <p className="text-gray-600 text-center ">{recipe}</p>

        <div className="">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            

            <div className="w-full relative  bottom-0">
              <button
                
                className="mt-3 bottom-0 btn btn-outline border-0 border-b-4 bg-slate-100 border-orange-400 py-2 rounded-md hover:bg-slate-200 transition-colors"
              >
                Add to cart
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
