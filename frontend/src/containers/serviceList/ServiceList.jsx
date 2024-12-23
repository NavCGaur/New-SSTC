import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";

// Service data categorized
const servicesByCategory = {
  Registration: [
    "GST Registration",
    "Company Registration",
    "LLP, Partnership Firm Registration",
    "FSSAI Registration",
    "TRADEMARK Registration",
    "MSME Registration",
    "Shop License Registration",
    "APEDA Registration",
    "EPR License Registration",
    "Icegate Registration",
  ],
  "Return Filing and Other Services": [
    "GST Return Filing",
    "DSC (Digital Signature Certificate)",
    "Import Export Code (IEC)",
    "Accounting & Book-keeping Services",
    "ROC Filing",
    "Income Tax Return Filing (ITR)",
    "Tax Audit",
  ],
};

const TabsAndCards = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const theme = useTheme(); // Access theme
  const categories = Object.keys(servicesByCategory);

  // Handle Tab change
  const handleTabChange = (event, newValue) => setSelectedTab(newValue);

  return (
    <Box sx={{ width: "100%", padding: "2rem", bgcolor: theme.palette.background.default }}>
      {/* Title */}
      <Typography
        variant="h4"
        textAlign="center"
        marginBottom="2rem"
        color={!theme.palette.background.default}     

      >
        Our Services
      </Typography>

      {/* Tabs Section */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        centered
        textColor="secondary"
        indicatorColor="secondary"
        sx={{ marginBottom: "2rem" }}
      >
        {categories.map((category, index) => (
          <Tab
            key={index}
            label={category}
            sx={{
              fontSize: theme.typography.h6.fontSize,
              fontWeight: "bold",
              color: theme.palette.secondary.main,
              "&.Mui-selected": {
                color: theme.palette.primary.main,
              },
            }}
          />
        ))}
      </Tabs>

      {/* Cards Section */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1.5rem",
        }}
      >
        {servicesByCategory[categories[selectedTab]].map((service, index) => (
          <Card
            key={index}
            sx={{
              width: "250px",
              boxShadow: 3,
              bgcolor: theme.palette.background.alt,
              color: !theme.palette.background.default,
              "&:hover": {
                boxShadow: 6,
                transform: "scale(1.05)",
                transition: "all 0.3s ease-in-out",
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                textAlign="center"
                fontWeight="bold"
                color={theme.palette.primary.main}
              >
                {service}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default TabsAndCards;
