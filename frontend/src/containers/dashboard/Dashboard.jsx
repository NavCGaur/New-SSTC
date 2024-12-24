import React from "react";
import FlexBetween from "../../components/flexbetween/FlexBetween";
import Header from "../../components/header/Header";
import Papa from "papaparse";
import { useGetAllUsersQuery } from "../../state/api"; 
import StatBox from "../../components/statbox/Statbox";
import OverviewChart from "../../components/overviewChart/OverviewChart";
import BreakdownChart from "../../components/breakdownChart/BreakdownChart";



import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";

import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data: users, isLoading, isError } = useGetAllUsersQuery();

  
  const totalUsers = users? users.length:"0";
  const totalServices = users ? users.reduce((sum, user) => sum + user.services.length, 0)
  : 0;
  


  // Function to handle CSV download
  const handleDownload = () => {
    if (isLoading || isError || !users) {
      alert("Data is not available yet.");
      return;
    }

    // Map user data to a CSV-friendly format
    const csvData = users.map((user) => ({
      Name: user.name || '',
      Email: user.email || '',
      "Residential Address": user.residential_address 
        ? `${user.residential_address.street || ''}, ${user.residential_address.city || ''}, ${user.residential_address.state || ''}, ${user.residential_address.pincode || ''}`
        : '',
      "Business Address": user.business_address 
        ? `${user.business_address.street || ''}, ${user.business_address.city || ''}, ${user.business_address.state || ''}, ${user.business_address.pincode || ''}`
        : '',
      Services: user.services ? user.services.map((service) => service.serviceName).join(", ") : '',
      Status: user.services ? user.services.map((service) => service.paymentStatus).join(", ") : '',
    }));

    // Convert to CSV and trigger download
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "users_report.csv";
    link.click();
  
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={handleDownload}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download All User Data
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Customers"
          value={users && totalUsers}
          increase="+14%"
          description="Since last month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total Sales"
          value={users && totalServices}
          increase="+21%"
          description="Since last month"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart isDashboard={true} />
        </Box>
        <StatBox
          title="Monthly Sales"
          value={users && totalUsers}
          increase="+5%"
          description="Since last month"
          icon={
            
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Yearly Sales"  
          value={users && 100}
          increase="+43%"
          description="Since last year"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
      </Box>
      <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
          mt="2rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales By Category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="1rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of real states and information via category for revenue
            made for this year and total sales.
          </Typography>
        </Box>
    </Box>
  );
};

export default Dashboard;
