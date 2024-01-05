import React from 'react';
import CryptoJS from "crypto-js";

import {
    PayPalButtons,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

import { paypal_approve_order_api, paypal_create_order_api } from "@/config";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { getCookie } from 'cookies-next';

const ref_tkn: any = getCookie("ref_tkn");

export const PaypalPaymentButtonWrapper = ({ info = {} }: { info: any }) => {
    const router = useRouter();
    const [{ isPending }] = usePayPalScriptReducer();

    const searchParams = useSearchParams()
    const token: any = searchParams.get('token')
    const secret: any = process.env.NEXT_PUBLIC_TOKEN_SECRET
    const bytes = CryptoJS.AES.decrypt(token?.replaceAll(" ", "+"), secret);
    var cartItem = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))


    function createOrderHandle() {
        return fetch(`${paypal_create_order_api}`, {
            method: "POST",
            headers: {
                ref_tkn: ref_tkn,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                info: info,
                cart: {
                    productID: cartItem?.productID,
                    amount: cartItem?.price
                },
            }),
        })
            .then((response) => response.json())
            .then((order) => {
                return order.id;
            });
    }

    function onApprove(data: any) {
        // replace this url with your server
        return fetch(`${paypal_approve_order_api}`, {
            method: "POST",
            headers: {
                ref_tkn: ref_tkn,
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
                // Your code here after capture the order
                toast.success("Payment complete");
                router.push("/dashboard/orders");
                localStorage.removeItem("cart");
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

