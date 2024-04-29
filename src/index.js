import React from 'react';
import ReactDOM from 'react-dom/client';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Views/Login';

const router = createHashRouter([
  {
    path: "/clone-login-portal",
    element: <Login />,
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
    <RouterProvider router={router} />
  </React.StrictMode>
);

