import React from 'react';

import './Layout.css'

//Container import
import Header from '../src/containers/header/Header';
import About from '../src/containers/about/About';
import Service from '../src/containers/service/Service';
import Cta from './containers/cta/Cta';
import Footer from './containers/footer/Footer';



function Layout() {
  return ( 
    <div className="layout-container">
        <Header />
        <About />
        <Service />
        <Cta />
        <Footer />
    </div>    

  )
}

export default Layout