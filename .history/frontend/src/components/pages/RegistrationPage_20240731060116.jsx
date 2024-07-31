import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  LinearProgress,
  InputAdornment,
  IconButton,
  Grid,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Business,
} from "@mui/icons-material";

function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handlePasswordChange = (event) => {
    setPasswordStrength(event.target.value.length * 10);
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 2 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Create an account
      </Typography>

      <TextField
        label="Username"
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Email"
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        fullWidth
        margin="normal"
        onChange={handlePasswordChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Typography
        variant="caption"
        color="textSecondary"
        sx={{ display: "block", mt: 1 }}
      >
        Your password must have at least 8 characters, one uppercase letter, one
        lowercase letter, one number and one special character.
      </Typography>

      <Box sx={{ mt: 1, mb: 2 }}>
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ display: "block" }}
        >
          {passwordStrength <= 33
            ? "Weak"
            : passwordStrength <= 66
            ? "Medium"
            : "Strong"}
        </Typography>
        <LinearProgress variant="determinate" value={passwordStrength} />
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ display: "block" }}
        >
          Use a mix of letters, numbers, and symbols for a strong password.
        </Typography>
      </Box>

      <TextField
        label="Confirm Password"
        type={showPassword ? "text" : "password"}
        fullWidth
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Organisation"
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Business />
            </InputAdornment>
          ),
        }}
      />

      <FormControlLabel
        control={<Checkbox />}
        label="Yes, I would like to receive marketing communication from WebData."
        sx={{ mt: 2, mb: 2 }}
      />

      <Grid container justifyContent="flex-end">
        <Button variant="contained" size="small" sx={{ mt: 2, mb: 2 }}>
          Sign Up
        </Button>
      </Grid>
    </Box>
  );
}

export default SignupForm;
