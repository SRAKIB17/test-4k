const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer');
const path = require('path');
const PaypalPay = require('./routes/paypal');
require('dotenv').config()
const port = process.env.PORT || 3000
const db = require('./model/model')
// store image from local 
// const storage = multer.diskStorage({
//       destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Uploads will be stored in the 'uploads' directory
//       },
//       filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); // File name will be timestamp + original file extension
//       },
//     });

//     const upload = multer({ storage: storage });



// mdilwware 
// User account 'restaurent'@'localhost' - Database restaurent
app.use(cors())
app.use(express.json())




/* **************************Verify Admin ********************************* */
app.get('/user/admin/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const IDQuery = `SELECT * FROM all_employee WHERE id="${id}"`;
      db.query(IDQuery, (IDErr, IDResult) => {
            if (IDErr) return res.send(false);

            else {
                  if (IDResult.length > 0) {
                        if (IDResult[0].role == "manager") {
                              res.send(true)
                        }
                        else {
                              res.send(false)
                        }
                  }
                  else {
                        res.send(false)
                  }
            }
      })

})
app.get('/user/employee/:id', async (req, res) => {
      const id = req.params.id;
      const IDQuery = `SELECT * FROM all_employee WHERE id="${id}"`;
      db.query(IDQuery, (IDErr, IDResult) => {
            if (IDErr) return res.send(false);

            else {
                  if (IDResult.length > 0) {
                        if (IDResult[0].role !== "manager") {
                              res.send(true)
                        }
                        else {
                              res.send(false)
                        }
                  }
                  else {
                        res.send(false)
                  }
            }
      })

})

/* *********************************** Add Employee****************************/




// find employee using ID 
app.post('/login', async (req, res) => {
      const { id } = req.body;


      const sql = `SELECT id,jobtitle as role,name FROM employee WHERE id="${id}"`;
      db.query(sql, (err, result) => {
            if (err) return res.json({ Found: 0, message: "Employee is Not found" });

            else {
                  const employeeData = result[0];
                  if (!employeeData) {
                        return res.status(500).json({ message: "Error inserting attendance" });

                  }
                  else {

                        const entryDate = new Date().toISOString().split('T')[0];
                        const entryTime = new Date().toISOString().split(/[T.]/)[1];

                        const checkAttendanceQuery = `SELECT Date(entryDate) as day FROM attendance WHERE employeeId="${id}" AND Date(entryDate)="${entryDate}"`;

                        db.query(checkAttendanceQuery, (attendanceErr, attendanceResult) => {
                              if (attendanceErr) {

                                    return res.status(500).json({ message: "Error checking attendance" });
                              }
                              else {
                                    if (attendanceResult.length === 0) {
                                          const insertAttendanceQuery = `INSERT INTO attendance (employeeId,name, entryDate,entryTime,status) VALUES ("${id}","${employeeData.name}", "${entryDate}","${entryTime}","Present")`;

                                          db.query(insertAttendanceQuery, (insertErr, insertResult) => {
                                                if (insertErr) {
                                                      console.error(insertErr);
                                                      return res.status(500).json({ message: "Error inserting attendance" });
                                                }
                                                else {

                                                      res.json({ id: employeeData.id, name: employeeData.name, role: employeeData.role, Found: 1, message: "Attendance recorded" });
                                                }
                                          });

                                    }
                                    else {

                                          res.json({ id: employeeData.id, name: employeeData.name, role: employeeData.role, Found: 1, message: "Attendance already recorded for the day" });
                                    }

                              }
                        })
                  }




            }


      })

})




app.post('/exit', (req, res) => {
      const { userId } = req.body;

      // Get the current logout date and time
      const exitDate = new Date().toISOString().split('T')[0];
      const exitHour = new Date().toISOString().split(/[T.]/)[1];

      // Calculate work hours
      const calculateWorkHoursQuery = 'UPDATE attendance SET exitDate = ?, exitTime = ?, work_hours = TIMEDIFF(exitTime, entryTime) WHERE employeeId = ? AND DATE(entryDate) = ? ';

      db.query(calculateWorkHoursQuery, [exitDate, exitHour, userId, exitDate], (err, results) => {
            if (err) {
                  console.error('Error updating exit details and calculating work hours:', err);
                  res.status(500).json({ success: false, message: 'An error occurred.' });
                  return;
            }

            if (results.affectedRows === 0) {
                  res.status(404).json({ success: false, message: 'User not found or already logged out.' });
            } else {
                  res.status(200).json({ success: true, message: 'Logged out successfully and work hours updated.' });
            }
      });
});




// get employee api 
app.get('/employee', (req, res) => {
      const sql = "SELECT * FROM employee";
      db.query(sql, (err, data) => {
            console.log(err)
            if (err) return res.json({ message: "Employee are not Found!!!" });
            res.json(data)
      })

})
// ...

// post employee api 
app.post('/employee', (req, res) => {
      const employee = req.body;

      const { id, name, address, phone, role } = employee;
      const sql = `INSERT INTO employee (id,name,phone,address,jobtitle)
      VALUE("${id}","${name}",'${phone}','${address}','${role}')`;

      db.query(sql, (err, result) => {
            if (err) return res.json({ Inserted: 0, message: "Employee Insertion is failed !!!" });
            res.json({ Inserted: 1, message: "Employee successfully added!!!" })
      })

})

app.delete('/employee/:id', (req, res) => {
      const id = req.params.id;
      console.log(id);
      const idQuery = `DELETE from employee WHERE id = "${id}"`;
      db.query(idQuery, (err, result) => {
            if (err) return res.json({ deleted: 0, message: "User not exists" });
            res.send({ deleted: 1, message: "Employee Deleted successfully!!!" })
      })
})

app.patch('/employee/:id', (req, res) => {
      // const id = req.params.id;

      const data = req.body;

      console.log(data)
      // console.log(id)

      const { name, address, phone, jobtitle, status, id } = data;
      const sql = `
      UPDATE employee
      SET
        name="${name}",
        phone="${phone}",
        address="${address}",
        
        jobtitle="${jobtitle}",
        status="${status}"
       WHERE id="${id}"`;

      db.query(sql, (err, result) => {
            if (err) return res.json({ updated: 0, message: "Employee not found" });
            res.json({ updated: 1, message: "Employee data is Updated!!!" })
      })
})

/*>>>>>>>>>>>>>>>>>>>>>>>>current attendance>>>>>>>>>>>>>>> */
app.get('/today-attendance', (req, res) => {
      const currentDate = new Date().toISOString().split('T')[0];

      // Construct a query that selects attendance records for the current local date.
      const todayQuery = `SELECT * FROM attendance WHERE DATE(entryDate) = "${currentDate}" ORDER BY entryTime DESC`;

      db.query(todayQuery, (todayErr, todayResult) => {
            if (todayErr) {

                  return res.json({ message: "An error occurred while fetching attendance." });
            }

            res.json(todayResult);
      });
});
app.get('/today-report', (req, res) => {

      const currentDate = new Date().toISOString().split('T')[0];

      // Construct a query that selects attendance records for the current local date.
      const todayQuery = `SELECT * FROM orders WHERE DATE(order_date) = "${currentDate}"`;

      db.query(todayQuery, (todayErr, todayResult) => {
            if (todayErr) {
                  return res.json({ message: "An error occurred while fetching attendance." });
            }
            res.json(todayResult);
      });
});


// Get Work Hours for an Employee
app.get('/work-hours', (req, res) => {


      const sql = 'SELECT * FROM attendance ORDER BY entryTime DESC ';
      db.query(sql, (err, result) => {
            if (err) {
                  console.error('Error fetching work hours:', err);
                  res.status(500).send('Internal Server Error');
            } else {
                  res.status(200).json(result);
            }
      });
});

//   emplyee works details 
app.get('/my-attendance', async (req, res) => {
      try {
            // Get parameters from the request
            const start_date = req.query.start_date;
            const end_date = req.query.end_date;
            const employee_id = req.query.employee_id;


            // Execute the SQL query
            const sql = `
          SELECT
          employeeId,
            name,
            COUNT(*) AS total_attendance,
            CONCAT(
              TIME_FORMAT(SEC_TO_TIME(SUM(TIME_TO_SEC(work_hours))), '%k'),
              ' hours ',
              TIME_FORMAT(SEC_TO_TIME(SUM(TIME_TO_SEC(work_hours))), '%i'),
              ' minutes'
            ) AS total_hours
          FROM
            attendance
          WHERE
            employeeId = ?
            AND entryDate BETWEEN ? AND ?
          GROUP BY
            name
        `;



            db.query(sql, [employee_id, start_date, end_date], (err, result) => {
                  if (err) return res.status(500).send({
                        status: false,
                        message: "Doesn't found any data."
                  })
                  console.log(result);
                  res.status(200).json({
                        status: true,
                        message: "Data Found",

                        data: { startDate: start_date, endDate: end_date, ...result[0] }
                  });
            })
      } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
      }
});

//api by start and end data
app.get('/orders-time', (req, res) => {
      const startDate = req.query.startDate; // Assuming date format: 'YYYY-MM-DD'
      const endDate = req.query.endDate;

      const setGroupConcatMaxLenQuery = 'SET SESSION group_concat_max_len = 10000000000000;';
      db.query(setGroupConcatMaxLenQuery, (setGroupConcatError) => {
            if (setGroupConcatError) {
                  console.error('Error setting group_concat_max_len:', setGroupConcatError);
                  res.status(500).json({ message: "Internal Server Error" });
                  return;
            }

            const query = `
          SELECT
            orders.orderID,
            orders.executionTime,
            orders.orderDate,
            orders.customerPhoneNumber,
            orders.wayOfPurchase,
            orders.orderStatus,
            GROUP_CONCAT(
              JSON_OBJECT(
                'itemID', orderItem.itemID,
                'quantity', orderItem.quantity
              )
            ) AS items
          FROM orders
          LEFT JOIN orderItem ON orders.orderID = orderItem.orderID
          WHERE orders.orderDate BETWEEN ? AND ?
          GROUP BY orders.orderID
        `;

            db.query(query, [startDate, endDate], (error, results) => {
                  if (error) {
                        console.error('Error fetching orders:', error);
                        res.status(500).json({ message: "Internal Server Error" });
                        return;
                  }

                  // Parse the items and send the response
                  const ordersWithItems = results.map(order => ({
                        ...order,
                        items: order.items ? JSON.parse(`[${order.items}]`) : []  // Parse only if items exist
                  }));

                  res.status(200).json(ordersWithItems);
            });
      });
});




/* ***********************************MENU API's****************************/

// get all menu api 
app.get('/menu', (req, res) => {

      const sql = "SELECT * FROM item";
      db.query(sql, (err, data) => {
            if (err) return res.json(err);
            return res.json(data)
      })
})

//menu push
// app.post('/menu', upload.single('image'),  (req, res) => {
app.post('/menu', (req, res) => {
      const menu = req.body;


      const { name, recipe, category, price, image, quantity } = menu;
      // const image = req.file.path;

      const sql = `INSERT INTO item(name,recipe,image,category,price,quantity) VALUE("${name}","${recipe}","${image}","${category}",${price},${quantity})`;
      db.query(sql, (err, result) => {
            if (err) return res.json({ InsertedId: 0, messgae: "Menu is not Inserted" });
            res.json({ InsertedId: 1, message: "Menu inserted successfully" })
      })
})

app.put('/menu/quantity', (req, res) => {
      const menu = req.body;
      const { quantity, id } = menu;
      const sql = `UPDATE item SET quantity=${quantity} WHERE id = ${id}`;
      db.query(sql, (err, result) => {
            if (err) return res.json({ InsertedId: 0, messgae: "Quantity can't not updated" });
            res.json({ InsertedId: 1, message: "Quantity updated" })
      })
})

//delete a specific menu api
app.delete('/menu', async (req, res) => {
      const id = req.body.id;
      console.log(id);
      const sql = `DELETE FROM item WHERE id=${id}`;
      db.query(sql, (err, result) => {
            if (err) return res.json({ Deleted: 0, message: "Menu is not Found" });
            res.json({ Deleted: 1, message: "Successfully deleted menu" })
      })
})

//update menu api
app.patch("/menu", (req, res) => {
      const newMenu = req.body;
      const { id, name, image, price, recipe, category } = newMenu;
      console.log(id, name, image, price, recipe, category);

      const sql = `UPDATE item
                        SET
                              name="${name}",
                              recipe="${recipe}",
                              image="${image}",
                              category="${category}",
                              price=${price}
                        WHERE id =${id}`
      db.query(sql, (err, result) => {
            if (err) return res.json({ Updated: 0, message: "Menu Updation is Failed!!!" });
            res.json({ Updated: 1, message: "Menu successfully updated!!!" });
      })


})



/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Orders API >>>>>>>>>>>>>>>>>>>>> */
app.use('/paypal', PaypalPay)

app.post('/orderItem', (req, res) => {
      const data = req.body;
      const orderDate = new Date().toISOString().split('T')[0];
      const orderTime = new Date().toISOString().slice(11, 19);

      // Check if the customer already exists
      const checkCustomerQuery = 'SELECT * FROM customer WHERE name = ? AND phoneNumber = ? LIMIT 1';

      db.query(checkCustomerQuery, [data.name, data.mobile], (checkError, checkResults) => {
            if (checkError) {
                  return res.status(500).json({ InsertedId: 0, message: 'Error checking customer' });
            }
            if (checkResults.length === 0) {
                  // Customer does not exist, insert into the customer table
                  const insertCustomerQuery = 'INSERT INTO customer (name, phoneNumber) VALUES (?, ?)';

                  db.query(insertCustomerQuery, [data.name, data.mobile], (insertError, insertResults) => {
                        if (insertError) {
                              console.error('Error inserting customer:', insertError);
                              return res.status(500).json({ InsertedId: 0, message: 'Error inserting customer' });
                        }

                        const customerId = insertResults.insertId;

                        // Insert order data into the database
                        const orderQuery = 'INSERT INTO orders (executionTime, orderDate, wayOfPurchase, customerPhoneNumber) VALUES (?, ?, ?, ?)';

                        db.query(orderQuery, [orderTime, orderDate, data.wayToPayment, data.mobile], (orderError, orderResults) => {
                              if (orderError) {
                                    console.error('Error inserting order data:', orderError);
                                    return res.status(500).json({ InsertedId: 0, message: 'Error inserting order data' });
                              }

                              const orderId = orderResults.insertId;

                              // Insert order items into the database
                              const itemsQuery = 'INSERT INTO orderItem (orderID, itemID, quantity) VALUES (?, ?, ?)';

                              data.orderdata_array.forEach(item => {
                                    db.query(itemsQuery, [orderId, item.id, item.quantity], (itemError) => {
                                          if (itemError) {
                                                console.error('Error inserting item:', itemError);
                                          }
                                    });
                              });

                              res.status(200).json({ InsertedId: 1, message: 'Order placed successfully' });
                        });
                  });
            } else {
                  // Customer already exists, use the existing customer ID
                  const customerId = checkResults[0].customerID;

                  // Insert order data into the database
                  const orderQuery = 'INSERT INTO orders (executionTime, orderDate, wayOfPurchase, customerPhoneNumber) VALUES (?, ?, ?, ?)';

                  db.query(orderQuery, [orderTime, orderDate, data.wayToPayment, data.mobile], (orderError, orderResults) => {
                        if (orderError) {
                              console.error('Error inserting order data:', orderError);
                              return res.status(500).json({ InsertedId: 0, message: 'Error inserting order data' });
                        }

                        const orderId = orderResults.insertId;

                        // Insert order items into the database
                        const itemsQuery = 'INSERT INTO orderItem (orderID, itemID, quantity) VALUES (?, ?, ?)';

                        data.orderdata_array.forEach(item => {
                              db.query(itemsQuery, [orderId, item.id, item.quantity], (itemError) => {
                                    if (itemError) {
                                          console.error('Error inserting item:', itemError);
                                    }
                              });
                        });

                        res.status(200).json({ InsertedId: 1, message: 'Order placed successfully' });
                  });
            }
      });
});



// get orders api 

app.get('/orders', (req, res) => {
      // Increase the group_concat_max_len if needed
      const setGroupConcatMaxLenQuery = 'SET SESSION group_concat_max_len = 10000000000000;';
      db.query(setGroupConcatMaxLenQuery, (setGroupConcatError) => {
            if (setGroupConcatError) {
                  return res.status(500).json({ message: "Internal Server Error" });
            }
            const query = `
            SELECT
            orders.*,
            GROUP_CONCAT(
                JSON_OBJECT(
                    'itemID', orderItem.itemID,
                    'quantity', orderItem.quantity
                )
            ) AS items
        FROM orders
        LEFT JOIN orderItem ON orders.orderID = orderItem.orderID
        GROUP BY orders.orderID
        `;

            db.query(query, (error, results) => {
                  if (error) {
                        console.error('Error fetching orders:', error);
                        return res.status(500).json({ message: "Internal Server Error" });
                  }

                  // Parse the items and send the response
                  const ordersWithItems = results.map(order => ({
                        ...order,
                        items: JSON.parse(`[${order.items}]`)
                  }));

                  res.status(200).json(ordersWithItems);
            });
      });
});

app.patch('/orders/:id', (req, res) => {
      const order_id = req.params.id;
      const text = req.body.buttonText;
      const updateQuery = `UPDATE orders SET orderStatus = "${text}" WHERE orderID = "${order_id}"`;

      const updateItem = req?.body?.items?.map(r => {
            return `UPDATE item SET quantity = ${r?.quantity} WHERE id = "${r?.id}"`
      })?.join(";")
      db.query(`${updateQuery};${updateItem}`, (err, result) => {
            if (err) {
                  return res.status(500).json({ updated: 0, message: 'Error updating payment method.' });
            }
            res.json({ updated: 1, message: 'Payment method updated successfully.' });
      });
});


// Endpoint to get the four most sold items
app.get('/most-sold', (req, res) => {
      // Query to get the top four most sold items with their quantities
      const sql = `
        SELECT
          m.id,
          m.name,
          m.recipe,
          m.image,
          m.category,
          m.price,
          m.status,
          SUM(oi.quantity) AS totalQuantity
        FROM
          item AS m
        JOIN
          orderItem AS oi ON m.id = oi.itemID
        GROUP BY
          m.id, m.name, m.recipe, m.image, m.category, m.price, m.status
        ORDER BY
          totalQuantity DESC
        LIMIT
          4
      `;

      db.query(sql, (err, topItems) => {
            if (err) {
                  console.error('Error executing query: ' + err.stack);
                  return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.json(topItems);
      });
});


app.get('/orders-within-dates', (req, res) => {
      // Define the start and end dates as query parameters
      const { startDate, endDate } = req.query;

      // Check if the required parameters are provided
      if (!startDate || !endDate) {
            return res.status(400).json({ error: 'Start date and end date are required.' });
      }

      // SQL query to retrieve orders within the specified date range
      const sql = `
      SELECT
      m.id,
      m.name,
      m.recipe,
      m.image,
      m.category,
      m.price,
      m.status,
      SUM(oi.quantity) AS totalQuantity
  FROM item AS m
  JOIN orderItem AS oi ON m.id = oi.itemID
  JOIN (
      SELECT DISTINCT o.orderID
      FROM orders AS o
      WHERE o.orderDate BETWEEN ? AND ?
  ) AS filtered_orders ON oi.orderID = filtered_orders.orderID
  GROUP BY m.id, m.name, m.recipe, m.image, m.category, m.price, m.status
  ORDER BY totalQuantity DESC
  LIMIT 4;
  
      `;

      db.query(sql, [startDate, endDate], (err, orders) => {
            if (err) {
                  console.error('Error executing query: ' + err.stack);
                  return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.json(orders);
      });
});


//   x-repotrt 
app.get('/report-x', (req, res) => {
      const sql = `SELECT last_z_report_date
      FROM report
      ORDER BY rid DESC
      LIMIT 1; `;
      db.query(sql, (err, result) => {
            if (err) return res.json({ err })
            else {
                  const currentDate = new Date();

                  // Get the components of the date
                  const year = currentDate.getFullYear();
                  const month = currentDate.getMonth() + 1; // Months are zero-based
                  const day = currentDate.getDate();

                  // Format the date as a string (e.g., 'YYYY-MM-DD')
                  const endDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;



                  const startDate = result[0].last_z_report_date;



                  const sql = `
                  SELECT
                        m.id,
                        m.name,
                    
                  
                        m.category,
                        m.price,
                  
                        SUM(oi.quantity) AS totalQuantity
                  FROM item AS m
                  JOIN orderItem AS oi ON m.id = oi.itemID
                  JOIN (
                        SELECT DISTINCT o.orderID
                        FROM orders AS o
                        WHERE o.orderDate BETWEEN ? AND ?
                  ) AS filtered_orders ON oi.orderID = filtered_orders.orderID
                  GROUP BY m.id, m.name, m.recipe, m.image, m.category, m.price, m.status
                  ORDER BY totalQuantity DESC
                  LIMIT 4;
              
                  `;

                  db.query(sql, [startDate, endDate], (err, orders) => {

                        if (err) {
                              console.error('Error executing query: ' + err.stack);
                              return res.status(500).json({ error: 'Internal Server Error' });
                        }
                        res.json({ orders: orders, lastDate: endDate, startDate: startDate });
                  })




            }

      })
})

app.post('/report-x', (req, res) => {
      const { startDate, endDate, price } = req.body;


      const sql = `INSERT INTO
                   report(last_z_report_date,startDate,last_report_price)
                   VALUE(?,?,?) `;
      db.query(sql, [endDate, startDate, price], (err, result) => {
            if (err) return res.json(err);
            res.json({
                  status: true,
                  message: "Pdf Download Successfully!!!"
            })
      })

})

app.get('/zHistory', (req, res) => {
      const sql = `SELECT * FROM report`;
      db.query(sql, (err, result) => {
            if (err) return res.json(err);
            res.json(result)
      })
})




//customer api

app.get('/total-customer', (req, res) => {
      const sql = 'SELECT COUNT(name) as totalCustomer from customer';
      db.query(sql, (err, customers) => {
            if (err) return res.json(err);
            res.json(customers)
      })
})
app.get('/customer', (req, res) => {
      const sql = 'SELECT * from customer';
      db.query(sql, (err, customers) => {
            if (err) return res.json(err);
            res.json(customers)
      })
})


//category added api
app.post('/category', async (req, res) => {
      const category = req.body;
      const { category_code, category_name, image_url } = category;


      const category_query = `INSERT INTO category(code,category_name,category_image) value("${category_code}","${category_name}","${image_url}")`;

      db.query(category_query, (err, result) => {
            if (err) return res.json({ insertId: 0, message: "Category is not inserted" })
            res.json({ InsertedId: 1, message: "Category is Inserted" })
      })
})

//get category api
app.get('/category', (req, res) => {
      const sql = "SELECT * FROM category";
      db.query(sql, (err, results) => {
            if (err) return res.json(err)
            res.json(results)
      })
})

//update category api
app.patch('/category', (req, res) => {
      const category = req.body;
      const { code, name, image } = category;
      // console.log(code,name,image);
      const sql = `
      UPDATE category
            SET
                  code ='${code}',
                  category_name='${name}',
                  category_image='${image}'
            WHERE code ='${code}'
      `;
      db.query(sql, (err, result) => {
            if (err) return res.json({ Updated: 0, message: "Category update is Failed!!!" });
            res.json({ Updated: 1, message: "Category successfully updated!!!" });
      })
})


//get specific category
app.get('/category/:code', (req, res) => {
      const code = req.params.code;

      const sql = `SELECT * FROM category WHERE code = ${code}`;

      db.query(sql, (err, result) => {
            if (err) return res.json(err);
            res.json(result)
      })
})

// update category status 
app.patch('/editStatus/:code', (req, res) => {
      const code = req.params.code;
      const { status } = req.body;

      const sql = `
      UPDATE category
            SET
            status ='${status}'
            WHERE code ='${code}'
      `;
      db.query(sql, (err, result) => {
            if (err) return res.json({ Updated: 0, message: "Status update is Failed!!!" });
            res.json({ Updated: 1, message: "Status successfully updated!!!" });
      })

})





app.get('/', (req, res) => {
      res.send('Server is running...!')
})

app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
})