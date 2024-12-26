import React from 'react';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store  from "./state/store"; // Import your Redux store
import ErrorBoundary from "./sentry/errorBoundary";
import AdminLayout from "./containers/adminLayout/AdminLayout";
import Dashboard from "./containers/dashboard/Dashboard";
import FrontendLayout from '../src/layout';
import ServiceOne from './containers/serviceone/ServiceOne';
import GstForm from './containers/serviceForms/GstForm';
import ServiceNavbar from './containers/serviceForms/ServiceNavbar';
import About from './containers/about/About';
import ServiceList from './containers/serviceList/ServiceList'
import AdminUserDashboard from './containers/userManagement/AdminUserDashboard'
import {ProtectedRoute} from './protected/ProtectedRoute'

import FileUpload  from './components/fileupload/FileUpload';
import Login from './containers/auth/login/Login';
import GSTRegistration from './containers/serviceForms/GstRegistration';
import Footer from './containers/footer/Footer';
import UnAuthorized from './containers/auth/unAuthoruzed/UnAuthorized';

// Separate component for MUI-styled routes
const MUIRoutes = () => {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Routes>
        <Route path="/" element={<ProtectedRoute store={store} requiredRole="Admin"><AdminLayout /></ProtectedRoute> } >  
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<AdminUserDashboard />} />
          </Route>
          <Route path='/service-one' element={<ServiceOne />} replace />
          <Route path='/gstform' element={<GstForm />} replace />
          <Route path='/navbar' element={<ServiceNavbar/>} />
          <Route path='/service-list' element={<ServiceList/>} />
          <Route path="/login" element={<Login />} />
          <Route path='/unauthorized' element={<UnAuthorized />} />
        </Routes>
      </CssBaseline>
    </ThemeProvider>
  );
};

// Non-MUI routes
const FrontendRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<FrontendLayout />} />
      <Route path="/gstregistration" element={<GSTRegistration />} />
      <Route path="/contactus" element={<Footer />} />

    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/service/*" element={<MUIRoutes />} />
          <Route path="/*" element={<FrontendRoutes />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;