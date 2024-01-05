import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Userorder from "../Componets/MenuItem/UserOrder/Userorder";
import Home from "../HOme/Home/Home/Home";

import AddEmploy from "../layout/Dashboard/Addemploy/AddEmploy";
import AddMenu from "../layout/Dashboard/Addmenu/AddMenu";
import AllEmploy from "../layout/Dashboard/AllEmploy/AllEmploy";
import Allmenu from "../layout/Dashboard/Allmenu/Allmenu";
import EmployeeAttendance from "../layout/Dashboard/Attendance/EmployeeAttendance/EmployeeAttendance";
import TodaysAttendance from "../layout/Dashboard/Attendance/TodaysAttendays/TodaysAttendance";
import Editmenu from "../layout/Dashboard/EditMenu/Editmenu";
import EmplyEdidt from "../layout/Dashboard/EmplyEdidt/EmplyEdidt";
import Statistics from "../layout/Dashboard/Statistics/Statistics";

import CashOrder from "../Componets/OrderList/CashOrder";
import PaypalOrder from "../Componets/OrderList/PaypalOrder";
import ReportX from "../Componets/Reports/ReportX";
import XReport from "../Componets/Reports/XReport";
import ZReportHistory from "../Componets/Reports/ZReportHistory";
import AdminRoute from "../Componets/SecureRoutes/AdminRoute/AdminRoute";
import Login from "../Login/Login";
import PersonalAttantdance from "../layout/Dashboard/Attendance/PersonalAttendance/PersonalAttantdance";
import CreateCategory from "../layout/Dashboard/Categories/CreateCategory";
import EditCategory from "../layout/Dashboard/Categories/EditCategory";
import ShowCategories from "../layout/Dashboard/Categories/ShowCategories";
import DashboardApp from "../layout/Dashboard/DashboardApp/DashboardApp";
import DashboardHome from "../layout/Dashboard/DashboardHome/DashboardHome";
import Report from "../layout/Dashboard/Report/Report";
import PrivateRoute from "./PrivateRoute";




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: '/order',
        element: <Userorder />
      },
    ],
  },
  {
    path: 'login',
    element: <Login />
  },

  {
    path: "dashboardapp",
    element: <PrivateRoute><DashboardApp /></PrivateRoute>,
    children: [
      {
        path: '/dashboardapp', // Empty path for the default child route
        element: <DashboardHome />
      },
      {
        path: 'cash-order',
        element: <CashOrder />
      },
      {
        path: 'paypal-order',
        element: <PaypalOrder />
      },
      {
        path: 'allmenu',
        element: <AdminRoute><Allmenu /></AdminRoute>
      },
      {
        path: 'addmenu',
        element: <AdminRoute><AddMenu /></AdminRoute>
      },
      {
        path: 'all-categories',
        element: <AdminRoute><ShowCategories /></AdminRoute>
      },
      {

        path: 'add-category',
        element: <AdminRoute><CreateCategory /></AdminRoute>
      },
      {
        path: 'editCategory/:code',
        element: <EditCategory />
      },
      {
        path: 'addemploy',
        element: <AdminRoute> <AddEmploy /></AdminRoute>
      },
      {
        path: 'edit-menu/:id',
        element: <AdminRoute> <Editmenu /></AdminRoute>
      },
      {
        path: 'emplyedit/:id',
        element: <AdminRoute><EmplyEdidt /></AdminRoute>
      },

      {
        path: 'allemploy',
        element: <AdminRoute> <AllEmploy /></AdminRoute>

      },

      {
        path: 'statistics',
        element: <PrivateRoute><Statistics /></PrivateRoute>
      },
      {
        path: 'report',
        element: <PrivateRoute><Report /></PrivateRoute>,
        children: [
          {
            path: '',
            element: <ReportX />

          },
          {
            path: 'x-report',
            element: <XReport />
          },
          {
            path: 'z-report',
            element: <ZReportHistory />
          }
        ]
      },
      {
        path: "todays-attendance",
        element: <TodaysAttendance />
      },
      {
        path: "personal-attendance",
        element: <PersonalAttantdance />
      },
      {
        path: "employee-attendance",
        element: <EmployeeAttendance />
      },


    ],
  }

]);

export default router;
