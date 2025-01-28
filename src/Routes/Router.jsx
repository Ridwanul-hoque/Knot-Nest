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




  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
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
      ]
    },
  ]);