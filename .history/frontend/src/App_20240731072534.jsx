import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import RegistrationForm from "./components/pages/RegistrationPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Create a theme instance
const theme = createTheme({
  typography: {
    fontFamily: "Bento, sans-serif",
  },
});

const app = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default app;
