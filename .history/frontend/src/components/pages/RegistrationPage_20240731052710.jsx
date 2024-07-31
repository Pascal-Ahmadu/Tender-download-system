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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(50);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const inputProps = {
    style: {
      borderRadius: 20,
    },
  };

  return (
    <Box
      sx={{
        maxWidth: { xs: "100%", sm: 450 },
        margin: "auto",
        padding: { xs: 2, sm: 3 },
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Paper elevation={3} sx={{ borderRadius: 4, overflow: "hidden" }}>
        <Box sx={{ padding: { xs: 2, sm: 3 } }}>
          <IconButton sx={{ marginBottom: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            Create your account
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              variant="outlined"
              sx={{ backgroundColor: "#f0f4f8" }}
              InputProps={inputProps}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              variant="outlined"
              type="email"
              sx={{ backgroundColor: "#f0f4f8" }}
              InputProps={inputProps}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              sx={{ backgroundColor: "#f0f4f8" }}
              InputProps={{
                ...inputProps,
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
              sx={{ backgroundColor: "#f0f4f8" }}
              InputProps={{
                ...inputProps,
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
              label="Organization (optional)"
              variant="outlined"
              sx={{ backgroundColor: "#f0f4f8" }}
              InputProps={inputProps}
            />
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" gutterBottom>
                Your password is weak
              </Typography>
              <LinearProgress
                variant="determinate"
                value={passwordStrength}
                sx={{ height: 10, borderRadius: 5 }}
              />
              <Typography
                variant="body2"
                sx={{ mt: 1, color: "primary.main", cursor: "pointer" }}
              >
                Make it strong
              </Typography>
            </Box>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: 20, py: 1.5 }}
            >
              Sign up
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateAccount;
