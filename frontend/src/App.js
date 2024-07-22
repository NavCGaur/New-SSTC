import React from 'react';


import { createBrowserRouter, RouterProvider } from 'react-router-dom';


//Style imports
import './App.css';

//Container import
import Layout from '../src/layout'
import About from '../src/containers/about/About'


//Page import
import ServiceOne from './containers/serviceone/ServiceOne';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />
  },

  {
    path:'/about',
    element:<About />
  },
  {
    path: '/service-one',
    element: <ServiceOne />
  }


]);

function App() {
 
  return (
      <RouterProvider router={router} />
  );
}

export default App;
