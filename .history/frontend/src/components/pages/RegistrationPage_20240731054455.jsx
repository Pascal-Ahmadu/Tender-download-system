import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  LinearProgress,
  IconButton,
  InputAdornment,
  Paper,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";

const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(10);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const inputProps = {
    style: {
      borderRadius: 8,
    },
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 3,
        backgroundColor: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Paper elevation={0} sx={{ borderRadius: 4, overflow: "hidden" }}>
        <Box sx={{ padding: 3 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            fontWeight="bold"
            sx={{ mb: 4 }}
          >
            Create an account
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              variant="outlined"
              sx={{ mb: 2 }}
              InputProps={{
                ...inputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              variant="outlined"
              type="email"
              sx={{ mb: 2 }}
              InputProps={{
                ...inputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              sx={{ mb: 2 }}
              InputProps={{
                ...inputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Typography variant="caption" sx={{ display: "block", mb: 2 }}>
              Your password must have at least 8 characters, one uppercase
              letter, one lowercase letter, one number and one special
              character.
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" gutterBottom>
                Weak
              </Typography>
              <LinearProgress
                variant="determinate"
                value={passwordStrength}
                sx={{ height: 8, borderRadius: 4 }}
              />
              <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                Use a mix of letters, numbers, and symbols for a strong
                password.
              </Typography>
            </Box>
            <TextField
              fullWidth
              margin="normal"
              label="Confirm Password"
              variant="outlined"
              type={showConfirmPassword ? "text" : "password"}
              sx={{ mb: 2 }}
              InputProps={{
                ...inputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Organisation"
              variant="outlined"
              sx={{ mb: 2 }}
              InputProps={{
                ...inputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Yes, I would like to receive marketing communication from WebData."
              sx={{ mb: 2 }}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2, borderRadius: 2, py: 1.5 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateAccount;
