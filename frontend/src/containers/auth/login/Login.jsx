import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  TextField, 
  Button, 
  Snackbar, 
  Alert, 
  Box, 
  Typography, 
  useTheme,
  Paper,
  IconButton,
  InputAdornment,
  CircularProgress,
  FormControl,
  InputLabel,
  OutlinedInput
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../../state/api";
import { loginSuccess } from "../../../state";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ServiceNavbar from "../../serviceForms/ServiceNavbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const theme = useTheme();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ email, password }).unwrap();
      const { token, user } = response.data;
      
      
      localStorage.setItem("token",token);
      dispatch(loginSuccess({ token, user}));
      console.log("get token in login after setting it up",localStorage.getItem("token"));
      
      setSnackbarMessage("Login successful! Redirecting...");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setTimeout(() => {
        if (user.role === "Admin") {
          navigate("/service/dashboard");
        } else if (user.role === "User") {
          navigate("/service/users"); 
        } else {
          navigate("/");
        }
      }, 1000);
    } catch (error) {
      setSnackbarMessage(error.data?.message || "Login failed. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.primary.main,
        padding: { xs: 2, sm: 4 },
        height: "100%",
      }}
    >
     <ServiceNavbar />

      <Paper
        elevation={12}
        sx={{
          p: { xs: 3, sm: 6 },
          width: "100%",
          maxWidth: "450px",
          minHeight: "450px",
          borderRadius: 2,
          backgroundColor: theme.palette.mode === 'dark' 
            ? theme.palette.primary.dark
            : '#ffffff',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.01)'
          }
        }}
      >
        <Typography 
          variant="h4" 
          component="h1"
          textAlign="center"
          fontWeight="bold"
          mb={6}
          color={theme.palette.primary.alt}
        >
          MD ASSOCIATES
        </Typography>

        <Box 
          component="form" 
          onSubmit={handleLogin}
          sx={{
            '& .MuiFormControl-root': { mb: 5 },
            '& .MuiButton-root': { mt: 2 },
          }}
        >
          <FormControl variant="outlined" fullWidth required>
            <InputLabel htmlFor="email" shrink>Email</InputLabel>
            <OutlinedInput
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              sx={{
                backgroundColor: theme.palette.primary.alt,

                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />
          </FormControl>

          <FormControl variant="outlined" fullWidth required>
            <InputLabel htmlFor="password" shrink>Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"  
              sx={{
                backgroundColor: theme.palette.primary.main
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{
              py: 1.5,
              position: 'relative',
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
                transform: 'translateY(-1px)',
              },
              transition: 'transform 0.2s ease-in-out',
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Login"
            )}
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity={snackbarSeverity} 
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
