import {
  createBrowserRouter,

} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Registration from "../pages/Registration/Registration";
import Login from "../pages/Login/Login";
import AllBioData from "../pages/AllBioData/AllBioData";
import BioDetails from "../pages/BioDetails/BioDetails";
import CheckOut from "../pages/CheckOut/CheckOut";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";
import Dashboard from "../pages/Dashboard/Dashboard";
import AddData from "../pages/Dashboard/AddData/AddData";
import ViewData from "../pages/Dashboard/ViewData/ViewData";
import AdminDashbaord from "../pages/Dashboard/AdminDashboard/AdminDashbaord";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import Favourite from "../pages/Dashboard/Favourite/Favourite";
import ContactRequest from "../pages/Dashboard/ContactRequest/ContactRequest";
import ApprovedStatus from "../pages/Dashboard/ApprovedStatus/ApprovedStatus";
import Review from "../pages/Shared/Review/Review";
import AddReview from "../pages/AddReview/AddReview";
import UserReview from "../pages/UserReview/UserReview";
import UserDashboard from "../pages/UserDashboard/UserDashboard";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'BioData/:id',
        element: <BioDetails></BioDetails>,
        loader: ({ params }) => fetch(`http://localhost:5000/Bio/${params.id}`)
      },
      {
        path: 'checkout/:id',
        element: <CheckOut></CheckOut>,
        loader: ({ params }) => fetch(`http://localhost:5000/Bio/${params.id}`)
      },
      {
        path: 'register',
        element: <Registration></Registration>
      },
      {
        path: 'BioData',
        element: <AllBioData></AllBioData>,

      },
      {
        path: 'review',
        element: <Review></Review>,

      },
      {
        path: 'addreview',
        element: <AddReview></AddReview>,

      },
      {
        path: 'adminreview',
        element: <UserReview></UserReview>,

      },
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
    children: [
      
      {
        path: 'addData',
        element: <PrivateRoutes><AddData></AddData></PrivateRoutes>
      },
      {
        path: 'viewData',
        element: <PrivateRoutes><ViewData></ViewData></PrivateRoutes>
      },
      {
        path: 'favourite',
        element: <PrivateRoutes><Favourite></Favourite></PrivateRoutes>
      },
      {
        path: 'contact',
        element: <PrivateRoutes><ContactRequest></ContactRequest></PrivateRoutes>
      },
      {
        path: 'addreview',
        element: <PrivateRoutes><AddReview></AddReview></PrivateRoutes>,

      },
      {
        path: 'user',
        element: <PrivateRoutes><UserDashboard></UserDashboard></PrivateRoutes>,

      },


      {
        path: 'adminDashboard',
        element: <AdminRoutes><AdminDashbaord></AdminDashbaord></AdminRoutes>
      },
      {
        path: 'manageUsers',
        element: <AdminRoutes><ManageUsers></ManageUsers></AdminRoutes>
      },
      {
        path: 'approveStatus',
        element: <AdminRoutes><ApprovedStatus></ApprovedStatus></AdminRoutes>
      },
      
      // {
      //   path: 'add',
      //   element: <AdminRoutes></AdminRoutes>,

      // },
      // {
      //   path: 'adminHome',
      //   element: <AdminRoutes></AdminRoutes>
      // },
      
      // {
      //   path: 'updateItem/:id',
      //   element: <AdminRoutes></AdminRoutes>,

      // },
      // {
      //   path: 'allUsers',
      //   element: <AdminRoutes></AdminRoutes>
      // }

    ]
  }
]);