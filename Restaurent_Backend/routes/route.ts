import { base_paypal_api, client_url } from "@/config";
import { verifyUser } from "@/server/hooks/verifyUser";
import genQuerySelectSql from "@/server/mysql_gen/genQuerySelectSql";
import { generatePayPalAccessToken } from "@/server/utils/generatePayPalAccessToken";
import { NextResponse } from "next/server";
import { poolQuery } from "@/server/models/db";
import { send_email_template } from "@/hooks/email_template";
import generateTokenJWT from "@/server/utils/generateTokenJWT";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { check, userID, email, role } = await verifyUser();

  const { id, email: guestEmail, name } = await req.json();

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

  const userOrderProcessingSelect = ({
    specif_field,
  }: {
    specif_field: string[];
  }) => {
    return genQuerySelectSql({
      table: "orders",
      specific_column: specif_field,
      condition: `createOrderID = ${JSON.stringify(
        createOrderID
      )} AND email = ${JSON.stringify(email ? email : guestEmail)}`,
    });
  };

  const {
    id: txnID,
    amount: { value: amount, currency_code },
    seller_receivable_breakdown: {
      paypal_fee: { value: chargeFee },
    },
  } = purchase_units?.[0]?.payments?.captures?.[0];

  const serviceCharge = ((parseFloat(amount) * 3) / 100)
  const payableAmount = parseFloat(amount) - serviceCharge - chargeFee;

  const user_orders_details_sql = `INSERT INTO payment_information (email ,customerID, createOrderID, orderID, payerEmail,txnID,payableAmount, currency,serviceCharge, chargeFee, payerID, accountStatus) (${userOrderProcessingSelect(
    {
      specif_field: [
        "email",
        `customerID,"${createOrderID}"`,
        `orderID,"${email_address}", "${txnID}","${payableAmount}", "${currency_code}", ${serviceCharge},"${chargeFee}","${payer_id}", "${account_status}"`,
      ],
    }
  )})`;

  const token = generateTokenJWT({
    data: {
      role: role ? role : 'guest',
      email: email ? email : guestEmail,
      orderID: createOrderID
    },
    expiresIn: undefined,
    tokenSecret: process.env.EMAIL_SEND_TOKEN
  })

  const link = `${client_url}/order/${token?.token}`;

  send_email_template({
    email: email ? email : guestEmail,
    link: link,
    linkText: "View Order Details",
    name: "Customer",
    subject: "Thanks for purchasing",
  });
  send_email_template({
    email: email ? email : guestEmail,
    link: link,
    linkText: "View Order Details",
    name: "Customer",
    subject: "Thanks for purchasing",
  });

  return poolQuery({
    sql: user_orders_details_sql,
    additional: {
      success: true,
      txnID,
      payerEmail: email_address,
    },
  });

}
