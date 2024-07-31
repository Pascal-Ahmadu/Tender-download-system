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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handlePasswordChange = (event) => {
    // Implement password strength logic here
    // This is a simple example, you should use a more robust method
    setPasswordStrength(event.target.value.length * 10);
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 2 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Create your account
      </Typography>

      <TextField label="Username" fullWidth margin="normal" />
      <TextField label="Email" fullWidth margin="normal" />

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

      <LinearProgress
        variant="determinate"
        value={passwordStrength}
        sx={{ mt: 1, mb: 1 }}
      />
      <Typography variant="caption" color="textSecondary">
        {passwordStrength <= 33
          ? "Weak"
          : passwordStrength <= 66
          ? "Medium"
          : "Strong"}
      </Typography>

      <TextField
        label="Confirm password"
        type={showPassword ? "text" : "password"}
        fullWidth
        margin="normal"
      />

      <TextField label="Organization (optional)" fullWidth margin="normal" />

      <FormControlLabel
        control={<Checkbox />}
        label="Yes, I would like to receive marketing communication from WebData."
        sx={{ mt: 2, mb: 2 }}
      />

      <Button variant="contained" fullWidth size="large">
        Sign Up
      </Button>
    </Box>
  );
}

export default SignupForm;
