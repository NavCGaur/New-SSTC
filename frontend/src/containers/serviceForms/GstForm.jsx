import React, { useState } from "react";
import { Box, TextField, Button, Typography, useTheme, Stack } from "@mui/material";
import ServiceNavbar from "./ServiceNavbar";

const GstForm = () => {
  const theme = useTheme();

  const [formData, setFormData] = useState({
    companyName: "",
    companyGst: "",
    personName: "",
    contactNo: "",
    emailId: "",
    servicesRequired: "",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  // Common TextField styles
  const textFieldSx = {
    backgroundColor: "#fff",
    borderRadius: "0.55rem",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // subtle shadow
    "& .MuiFilledInput-root": {
      borderRadius: "0.55rem",
      border: "1px solid #ccc", // light border
    },
    "& .MuiInputLabel-root": {
      color: "#888", // lighter label
    },
    "& .MuiFilledInput-input::placeholder": {
      color: "#aaa", // lighter placeholder text
    },
  };

  return (

    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: 'rgba(109, 142, 183, 0.3)',

        padding: "16px",
      }}
    >
      <ServiceNavbar />
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          padding: "32px",
          backgroundColor: theme.palette.background.alt || "#22274d",
          borderRadius: "0.75rem",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          "@media (max-width:600px)": {
            padding: "16px", // Adjust padding for smaller screens
          },
        }}
      >
        {/* Form Title */}
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: "bold",
            textAlign: "center",
            color: !theme.palette.background.default,
          }}
        >
          GST Filing Form
        </Typography>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* First Row */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
            >
              <TextField
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                fullWidth
                variant="filled"
                sx={textFieldSx}
              />
              <TextField
                label="Company GST"
                name="companyGst"
                value={formData.companyGst}
                onChange={handleChange}
                required
                fullWidth
                variant="filled"
                sx={textFieldSx}
              />
            </Stack>

            {/* Second Row */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
            >
              <TextField
                label="Name of Person"
                name="personName"
                value={formData.personName}
                onChange={handleChange}
                required
                fullWidth
                variant="filled"
                sx={textFieldSx}
              />
              <TextField
                label="Contact No."
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                required
                fullWidth
                variant="filled"
                sx={textFieldSx}
              />
            </Stack>

            {/* Third Row */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
            >
              <TextField
                label="Email ID"
                name="emailId"
                type="email"
                value={formData.emailId}
                onChange={handleChange}
                required
                fullWidth
                variant="filled"
                sx={textFieldSx}
              />
              <TextField
                label="Services Required"
                name="servicesRequired"
                value={formData.servicesRequired}
                onChange={handleChange}
                required
                fullWidth
                variant="filled"
                sx={textFieldSx}
              />
            </Stack>

            {/* Remarks Row */}
            <TextField
              label="Remarks (Optional)"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              variant="filled"
              fullWidth
              sx={textFieldSx}
            />

            {/* Submit Button */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.secondary.main[900],
                  color: !theme.palette.background.default,
                  fontWeight: "bold",
                  padding: "12px 30px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.main[900],
                  },
                }}
              >
                Submit
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default GstForm;
