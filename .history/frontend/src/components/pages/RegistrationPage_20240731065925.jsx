import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "white",
        overflow: "hidden",
        marginRight: "5",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1, // Allow this container to grow and fill the space
        }}
      >
        <Box
          component="header"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #f0f2f5",
            px: 5,
            py: 2,
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center", // Center content vertically
            alignItems: "center",
            px: 4,
            py: 5,
            overflowY: "auto", // Allow scrolling within this container if needed
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              maxWidth: "480px", // Adjusted maxWidth to fit better in the viewport
              boxSizing: "border-box",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: "#111518",
                py: 3,
              }}
            >
              Create your account
            </Typography>
            <TextField
              placeholder="Username"
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  borderColor: "#dbe1e6",
                },
                "& .MuiInputBase-input": {
                  color: "#111518",
                  p: "15px",
                  fontSize: "1rem",
                },
              }}
            />
            <TextField
              placeholder="Email address"
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  borderColor: "#dbe1e6",
                },
                "& .MuiInputBase-input": {
                  color: "#111518",
                  p: "15px",
                  fontSize: "1rem",
                },
              }}
            />
            <TextField
              placeholder="Password"
              fullWidth
              type={showPassword ? "text" : "password"}
              onChange={handlePasswordChange}
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  borderColor: "#dbe1e6",
                },
                "& .MuiInputBase-input": {
                  color: "#111518",
                  p: "15px",
                  fontSize: "1rem",
                },
              }}
            />
            <Typography variant="body2" sx={{ color: "#60778a", py: 1 }}>
              Password strength:{" "}
              {passwordStrength <= 33
                ? "Weak"
                : passwordStrength <= 66
                ? "Medium"
                : "Strong"}
            </Typography>
            <TextField
              placeholder="Confirm password"
              fullWidth
              type={showPassword ? "text" : "password"}
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  borderColor: "#dbe1e6",
                },
                "& .MuiInputBase-input": {
                  color: "#111518",
                  p: "15px",
                  fontSize: "1rem",
                },
              }}
            />
            <TextField
              placeholder="Organisation (optional)"
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Business />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  borderColor: "#dbe1e6",
                },
                "& .MuiInputBase-input": {
                  color: "#111518",
                  p: "15px",
                  fontSize: "1rem",
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "#dbe1e6",
                    "&.Mui-checked": {
                      color: "#2094f3",
                    },
                  }}
                />
              }
              label="Yes, I would like to receive marketing communication from WebData."
              sx={{ color: "#111518", mt: 2 }}
            />
          </Box>
        </Box>
        <Box
          component="footer"
          sx={{
            display: "flex",
            justifyContent: "flex-end", // Align button to the right
            px: 4,
            py: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              minWidth: "84px",
              maxWidth: "480px",
              bgcolor: "#2094f3",
              color: "white",
              fontWeight: "bold",
              borderRadius: 2,
              px: 4,
              "&:hover": {
                bgcolor: "#1976d2",
              },
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default SignupForm;
