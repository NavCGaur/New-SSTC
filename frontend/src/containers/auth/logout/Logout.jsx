import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../state/index"; // Update with the actual path to your authSlice
import { Button } from "@mui/material";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Clear auth token and user data
    localStorage.removeItem("token");
    dispatch(logout());

    // Navigate to login page
    navigate("/login");
  };

  return (
    <Button
      onClick={handleLogout}
      variant="contained"
      color="secondary"
      sx={{
        textTransform: "none",
        backgroundColor: "#ffcd38",
        "&:hover": {
          backgroundColor: "#ff6a38",
        },
      }}
    >
      Log Out
    </Button>
  );
};

export default Logout;
