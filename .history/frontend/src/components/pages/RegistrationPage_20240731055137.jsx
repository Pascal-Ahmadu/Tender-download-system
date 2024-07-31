// src/components/AccountCreationForm.jsx

import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Person,
  Lock,
  Business,
} from "@mui/icons-material";

const AccountCreationForm = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    organization: "",
    marketing: false,
    showPassword: false,
    passwordStrength: "Weak",
  });

  const handleChange = (prop) => (event) => {
    setFormValues({ ...formValues, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setFormValues({ ...formValues, showPassword: !formValues.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCheckboxChange = (event) => {
    setFormValues({ ...formValues, marketing: event.target.checked });
  };

  const calculatePasswordStrength = (password) => {
    let strength = "Weak";
    if (password.length >= 8) {
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      if (hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars) {
        strength = "Strong";
      } else if (
        hasUpperCase ||
        hasLowerCase ||
        hasNumbers ||
        hasSpecialChars
      ) {
        strength = "Medium";
      }
    }
    return strength;
  };

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    const strength = calculatePasswordStrength(password);
    setFormValues({ ...formValues, password, passwordStrength: strength });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Create an account
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              value={formValues.username}
              onChange={handleChange("username")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formValues.email}
              onChange={handleChange("email")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type={formValues.showPassword ? "text" : "password"}
              value={formValues.password}
              onChange={handlePasswordChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {formValues.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Typography
              variant="body2"
              color={
                formValues.passwordStrength === "Weak" ? "error" : "primary"
              }
            >
              {formValues.passwordStrength}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Use a mix of letters, numbers, and symbols for a strong password.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm Password"
              type={formValues.showPassword ? "text" : "password"}
              value={formValues.confirmPassword}
              onChange={handleChange("confirmPassword")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Organization"
              value={formValues.organization}
              onChange={handleChange("organization")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Business />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formValues.marketing}
                  onChange={handleCheckboxChange}
                />
              }
              label="Yes, I would like to receive marketing communication from WebData."
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary">
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AccountCreationForm;
