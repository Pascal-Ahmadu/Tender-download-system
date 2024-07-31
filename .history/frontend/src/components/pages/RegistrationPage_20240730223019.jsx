import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  LinearProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(50);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 2 }}>
      <IconButton sx={{ marginBottom: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h5" component="h1" gutterBottom>
        Create your account
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          variant="outlined"
          type="email"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
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
          fullWidth
          margin="normal"
          label="Confirm password"
          variant="outlined"
          type={showConfirmPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Organization (optional)"
          variant="outlined"
        />
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" gutterBottom>
            Your password is weak
          </Typography>
          <LinearProgress variant="determinate" value={passwordStrength} />
          <Typography
            variant="body2"
            sx={{ mt: 1, color: "primary.main", cursor: "pointer" }}
          >
            Make it strong
          </Typography>
        </Box>
        <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign up
        </Button>
      </Box>
    </Box>
  );
};

export default CreateAccount;
