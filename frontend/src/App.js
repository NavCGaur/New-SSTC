import React from 'react';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./sentry/errorBoundary";
import AdminLayout from "./containers/adminLayout/AdminLayout";
import Dashboard from "./containers/dashboard/Dashboard";
import Layout from '../src/layout';
import ServiceOne from './containers/serviceone/ServiceOne';
import GstForm from './containers/serviceForms/GstForm';
import ServiceNavbar from './containers/serviceForms/ServiceNavbar';
import About from './containers/about/About';
import ServiceList from './containers/serviceList/ServiceList'
import AdminUserDashboard from './containers/userManagement/AdminUserDashboard'

import FileUpload  from './components/fileupload/FileUpload';


// Separate component for MUI-styled routes
const MUIRoutes = () => {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Routes>
          <Route path='/' element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<AdminUserDashboard />} />

          </Route>
          <Route path='/service-one' element={<ServiceOne />} replace />
          <Route path='/gstform' element={<GstForm />} replace />
          <Route path='/navbar' element={<ServiceNavbar/>} />
          <Route path='/service-list' element={<ServiceList/>} />

        </Routes>
      </CssBaseline>
    </ThemeProvider>
  );
};

// Non-MUI routes
const PlainRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<Layout />} />
      <Route path="/about" element={<About />} />
      <Route path='/fileupload' element={<FileUpload />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/service/*" element={<MUIRoutes />} />
          <Route path="/*" element={<PlainRoutes />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;