import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useUrl from '../../../CustomHooks/URL/UseUrl';
import { deleteShoppingCart } from '../../utitilies/databse';
import { PaypalPaymentButtonWrapper } from './PaypalPaymentButtonWrapper';

function OrderModal({ updatedItems, totalPrice }) {
    const [cart, setCart] = useState([])
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')

    const navigate = useNavigate()
    const [orderdata, setOrderData] = useState([]);
    const [total, setTotal] = useState(0);
    const [Paypal, seTpaypal] = useState(false);
    const groupedOrders = {};
    const [url] = useUrl();
    const [quantity, setQuantity] = useState(1);

    const {
        register, handleSubmit, reset, formState: { errors }, watch
    } = useForm();

    useEffect(() => {
        setName(watch().name)
        setMobile(watch().mobile)
    }, [watch()])
    const [formData, setFormData] = useState();


    const handleChange = (e) => {
        seTpaypal(false);
        const { name, value } = e.target;

        setFormData(e.target.value)
        if (e.target.value === 'paypal') {
            seTpaypal(true);

        }

    };

    const onSubmit = async (data, e) => {
        e.preventDefault();

        const orderItem = {
            name: data.name,
            mobile: data.mobile,
            orderdata_array: updatedItems,
            total: totalPrice,
            wayToPayment: formData,
        };

        try {
            const res = await fetch(`${url}/orderItem`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderItem),
            });

            const responseData = await res.json();

            if (responseData.InsertedId > 0) {
                localStorage.removeItem('shopping-cart')
                reset()

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

                deleteShoppingCart();
                const goToHone = () => {
                    navigate('/')
                    location.reload()

                }

                setTimeout(goToHone, 5000)
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

    const info = {
        name: name,
        mobile: mobile,
        orderdata_array: updatedItems,
        total: totalPrice,
        wayToPayment: formData,
    }

    return (
        <div>
            <dialog id="order_modal" className="modal">
                <div className="modal-box">
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 rounded shadow-md">
                        <label className="text-sm">
                            Enter your Name:
                            <input
                                className="border bg-gray-100 py-1 px-4 rounded-md focus:ring focus:ring-blue-300 w-full"
                                type="text"
                                {...register('name', { required: true })}
                                required
                            />
                            {
                                errors.name && <span className="text-red-500 text-xs">Name is required</span>
                            }
                        </label>
                        <label className="text-sm">
                            Enter your Mobile:
                            <input
                                className="border bg-gray-100 py-1 px-4 mb-4 rounded-md focus:ring focus:ring-blue-300 w-full"
                                type="text"
                                {...register('mobile', { required: true })}
                                required
                            />
                            {
                                errors.mobile && <span className="text-red-500 text-xs">Mobile is required</span>
                            }
                        </label>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-1">Way To purchase</label>
                            <select
                                name="role"
                                className="w-full border border-gray-300 bg-white text-black focus:ring focus:ring-blue-300 px-3 py-2 rounded"
                                value={formData}
                                onChange={handleChange}
                                required
                            >

                                <option disabled  >Payment Method</option>
                                <option value="cash" selected>cash</option>
                                <option value="paypal" >paypal</option>
                                {/* <option value="" disabled>Select payment method</option>
              {jobRoles.map((role, index) => (
                <option key={index} value={role}>{role}</option>
              ))} */}
                            </select>
                        </div>

                        {
                            Paypal && name && mobile ?
                                <PayPalScriptProvider
                                    options={{
                                        clientId: "AT_KYltTNZ-1Vmi6Ddjr5u6w9iOO7Wp9vWISq7ktrHSDBqKKi6Pp41EZQaDiV0O4j-8EwdRg2wk7Uo97",
                                        components: "buttons",
                                        enableFunding: "paypal",
                                        currency: "USD",
                                    }}
                                >
                                    <PaypalPaymentButtonWrapper info={info} />
                                </PayPalScriptProvider>
                                :
                                <button
                                    className=" bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:ring focus:ring-blue-300 w-full"
                                    type="submit"
                                >
                                    Order Now
                                </button>
                        }
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
}

export default OrderModal;