import React from 'react';
import ReactDOM from 'react-dom/client';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Views/Login/Login';
import Home from './Views/Home/Home';
import { ToastContainer } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";

const router = createHashRouter([
  {
    path: "home/:username",
    element: <Home />,
    exact: 'true'
  },
  {
    path: "/",
    element: <Login />,
    exact: 'true'
  },
],{
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>
);

