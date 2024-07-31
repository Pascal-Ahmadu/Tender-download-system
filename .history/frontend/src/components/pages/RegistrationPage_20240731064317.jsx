// src/components/SignupForm.js

import React from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  InputAdornment,
  SvgIcon,
  Button,
  IconButton,
} from "@mui/material";
import { AccountCircle, Email, Lock, Business } from "@mui/icons-material";

const SignupForm = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <SvgIcon>
            <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" />
          </SvgIcon>
          <Typography variant="h5" component="h2" sx={{ ml: 1 }}>
            WebData
          </Typography>
        </Box>
        <Typography component="h3" variant="h6">
          Create an account
        </Typography>
        <Box component="form" sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Your password must have at least 8 characters, one uppercase letter,
            one lowercase letter, one number, and one special character.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography variant="body1">Weak</Typography>
            <Box sx={{ width: "100%", ml: 2 }}>
              <Box
                sx={{
                  height: 10,
                  bgcolor: "grey.300",
                  borderRadius: 1,
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    width: "10%",
                    height: "100%",
                    bgcolor: "primary.main",
                    borderRadius: 1,
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Use a mix of letters, numbers, and symbols for a strong password.
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="organisation"
            label="Organisation"
            name="organisation"
            autoComplete="organisation"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Business />
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupForm;
