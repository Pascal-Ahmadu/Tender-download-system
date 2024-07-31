// src/theme.js
import { createTheme } from "@mui/material/styles";

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    // Customize typography if needed
    fontFamily: "Roboto, Arial, sans-serif",
  },
  // Add other custom styles or overrides here
});

export default theme;
