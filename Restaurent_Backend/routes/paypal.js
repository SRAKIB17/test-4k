const { Router } = require("express");
const db = require("../model/model");
const PaypalPay = Router()
const PAYPAL_CLIENT_ID = "AT_KYltTNZ-1Vmi6Ddjr5u6w9iOO7Wp9vWISq7ktrHSDBqKKi6Pp41EZQaDiV0O4j-8EwdRg2wk7Uo97"
const PAYPAL_CLIENT_SECRET = "EE9cDoQhWBdDqZRKUyOOTJv-GddDi7rbk0T993ZHh6pW3lLeBZTF_h-twikQf_egS_3hVVGHLS7-5g62"
const base_paypal_api = "https://api-m.sandbox.paypal.com";

const generatePayPalAccessToken = async () => {
    try {
        if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
            throw new Error("MISSING_API_CREDENTIALS");
        }
        const auth = Buffer.from(
            PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
        ).toString("base64");

        const response = await fetch(`${base_paypal_api}/v1/oauth2/token`, {
            method: "POST",
            body: "grant_type=client_credentials",
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });
        const data = await response.json();
        return data.access_token;
    } catch (error) {
    }
};



PaypalPay.post('/create', async (req, res) => {
    const body = req.body
    const { name, mobile, orderdata_array, total, wayToPayment } = body

    const accessToken = await generatePayPalAccessToken();
    const url = `${base_paypal_api}/v2/checkout/orders`;
    const payload = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: total,
                },
            },
        ],
    };

    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        method: "POST",
        body: JSON.stringify(payload),
    });


    try {
        const jsonResponse = await response.json();
        const createOrderID = jsonResponse?.id

        const orderDate = new Date().toISOString().split('T')[0];
        const orderTime = new Date().toISOString().slice(11, 19);

        const insertCustomerQuery = `INSERT INTO customer (name, phoneNumber) VALUES (${JSON.stringify(name)},${JSON.stringify(mobile)})`;
        const orderQuery = `INSERT INTO orders (executionTime, orderDate, wayOfPurchase, customerPhoneNumber, createOrderID) VALUES (${JSON.stringify(orderTime)},${JSON.stringify(orderDate)},"paypal",${JSON.stringify(mobile)},${JSON.stringify(createOrderID)})`;

        db.query(`${insertCustomerQuery};${orderQuery}`, (orderError, orderResults) => {
            if (orderError) {
                return res.status(500).json({ InsertedId: 0, message: 'Error inserting order data' });
            }
            const orderId = orderResults?.[1]?.insertId;

            const itemsQuery = 'INSERT INTO orderItem (orderID, itemID, quantity) VALUES ?';
            const item = orderdata_array?.map((r => {
                return [orderId, r?.id, r?.quantity]
            }))

            try {
                db.query(itemsQuery, [item], function (err, result) {
                    if (err) {
                        return res.send({ success: false, message: "Error inserting order data" })
                    };
                    return res.send(jsonResponse)
                });

            }
            catch {
                return res.json({ InsertedId: 1, message: 'Order placed successfully' });
            }
        });

    } catch (err) {
        return res.send({
            success: false, error: "Failed to create order."
        })
    }
})

PaypalPay.post("/approve", async (req, res) => {
    const body = req?.body
    const { id, name } = body

    const accessToken = await generatePayPalAccessToken();
    const url = `${base_paypal_api}/v2/checkout/orders/${id}/capture`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const jsonResponse = await response.json();

    const {
        payer,
        payment_source,
        id: createOrderID,
        purchase_units,
    } = jsonResponse;

    const {
        paypal: { account_status },
    } = payment_source;

    const { email_address, payer_id } = payer;

    const {
        id: txnID,
        amount: { value: amount, currency_code },
        seller_receivable_breakdown: {
            paypal_fee: { value: chargeFee },
        },
    } = purchase_units?.[0]?.payments?.captures?.[0];

    const updateOrder = `UPDATE orders SET paymentGetawayFee = ${chargeFee}, paymentStatus = 'paid', payerEmail=${JSON.stringify(email_address)}, txnID=${JSON.stringify(txnID)} WHERE orderID = 1;`
    db.query(updateOrder, async (err, result) => {
        if (err) return res.send({ success: false, message: "Something is wrong." })
        else {
            return res.send({ success: true, message: "Payment completed" })
        }
    })
})

module.exports = PaypalPay