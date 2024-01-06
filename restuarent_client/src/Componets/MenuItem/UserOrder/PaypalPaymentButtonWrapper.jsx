import React from 'react';

import {
    PayPalButtons,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import useUrl from '../../../CustomHooks/URL/UseUrl';
import { toast } from 'react-toastify';
import { deleteShoppingCart } from '../../utitilies/databse';



export const PaypalPaymentButtonWrapper = ({ info = {} }) => {
    const [{ isPending }] = usePayPalScriptReducer();

    const [url] = useUrl();

    const createOrderHandle = async () => {
        try {
            const res = await fetch(`${url}/paypal/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(info),
            });
            const responseData = await res.json();
            return responseData?.id
        } catch (error) {
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


    function onApprove(data) {
        return fetch(`${url}/paypal/approve`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: data.orderID,
                email: info?.email,
                name: info?.name,
            }),
        })
            .then((response) => response.json())
            .then((orderData) => {
                if (orderData?.success) {
                    deleteShoppingCart();
                    const goToHone = () => {
                        navigate('/')
                        window.location.reload()
                    }

                    setTimeout(goToHone, 1000)
                    localStorage.removeItem('shopping-cart')
                    toast.success("Payment complete");
                }
                else {
                    toast.error("Something is wrong happened")
                }
            });
    }

    return (
        <>
            {isPending ? <div className="spinner" /> : null}

            <PayPalButtons
                style={{
                    color: "gold",
                    layout: "vertical",
                    // shape: 'pill',
                    label: "checkout",
                }}
                disabled={false}
                fundingSource={undefined}
                createOrder={createOrderHandle}
                onApprove={onApprove}
            />
        </>
    );
};

