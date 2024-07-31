import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  LinearProgress,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)({
  backgroundColor: "#f0f4f8",
  borderRadius: 4,
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
    },
  },
});

const CreateAccount = () => {
  const [passwordStrength, setPasswordStrength] = useState(20);

  return (
    <Box
      sx={{
        maxWidth: 450,
        margin: "auto",
        padding: 3,
        backgroundColor: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom fontWeight="bold">
        Create an account
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <StyledTextField
          fullWidth
          margin="normal"
          label="Username"
          variant="outlined"
        />
        <StyledTextField
          fullWidth
          margin="normal"
          label="Email"
          variant="outlined"
          type="email"
        />
        <StyledTextField
          fullWidth
          margin="normal"
          label="Password"
          variant="outlined"
          type="password"
        />
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Your password must have at least 8 characters, one uppercase letter,
          one lowercase letter, one number and one special character.
        </Typography>
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant="body2" gutterBottom>
            Weak
          </Typography>
          <LinearProgress
            variant="determinate"
            value={passwordStrength}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#000",
              },
            }}
          />
          <Typography variant="body2" sx={{ mt: 1, color: "textSecondary" }}>
            Use a mix of letters, numbers, and symbols for a strong password.
          </Typography>
        </Box>
        <StyledTextField
          fullWidth
          margin="normal"
          label="Confirm Password"
          variant="outlined"
          type="password"
        />
        <StyledTextField
          fullWidth
          margin="normal"
          label="Organisation"
          variant="outlined"
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Yes, I would like to receive marketing communication from WebData."
          sx={{ mt: 2 }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            borderRadius: 2,
            py: 1.5,
            backgroundColor: "#2196f3",
            "&:hover": {
              backgroundColor: "#1976d2",
            },
          }}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default CreateAccount;
