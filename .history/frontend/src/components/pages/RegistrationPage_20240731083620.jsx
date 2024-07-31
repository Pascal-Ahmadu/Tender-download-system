import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  LinearProgress,
  FormHelperText,
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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordEntered, setPasswordEntered] = useState(false);
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    symbol: false,
  });
  const [showRequirements, setShowRequirements] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    setPassword(password);
    setPasswordEntered(true);
    setShowRequirements(true);

    // Check password validity
    const lengthValid = password.length >= 8 && password.length <= 16;
    const uppercaseValid = /[A-Z]/.test(password);
    const lowercaseValid = /[a-z]/.test(password);
    const symbolValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setPasswordValid({
      length: lengthValid,
      uppercase: uppercaseValid,
      lowercase: lowercaseValid,
      symbol: symbolValid,
    });

    // Calculate strength
    setPasswordStrength(
      (lengthValid + uppercaseValid + lowercaseValid + symbolValid) * 25
    );

    // Clear previous timeout
    if (typingTimeout) clearTimeout(typingTimeout);

    // Set a new timeout
    setTypingTimeout(
      setTimeout(() => {
        setShowRequirements(false);
      }, 2000)
    ); // Hide after 2 seconds of inactivity
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 33) return "#f44336"; // Red for weak
    if (passwordStrength <= 66) return "#ff9800"; // Orange for medium
    return "#4caf50"; // Green for strong
  };

  const passwordsMatch = password === confirmPassword;

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, [typingTimeout]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "white",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          px: 2,
          py: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "480px",
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
                  <Person sx={{ color: "black" }} />
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
              mb: 2,
            }}
          />
          <TextField
            placeholder="Email address"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: "black" }} />
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
              mb: 2,
            }}
          />
          <TextField
            placeholder="Password"
            fullWidth
            type={showPassword ? "text" : "password"}
            onChange={handlePasswordChange}
            onFocus={() => setPasswordEntered(true)}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? (
                      <VisibilityOff sx={{ color: "black" }} />
                    ) : (
                      <Visibility sx={{ color: "black" }} />
                    )}
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
              mb: 2,
            }}
          />
          {passwordEntered && showRequirements && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ color: "#60778a", py: 1 }}>
                Password strength
              </Typography>
              <LinearProgress
                variant="determinate"
                value={passwordStrength}
                sx={{
                  height: 8,
                  borderRadius: 2,
                  backgroundColor: "#e0e0e0",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 2,
                    backgroundColor: getStrengthColor(),
                  },
                }}
              />
              <FormHelperText
                sx={{
                  color: "#60778a",
                  pt: 1,
                }}
              >
                <ul>
                  <li
                    style={{
                      color: passwordValid.length ? "#4caf50" : "#f44336",
                    }}
                  >
                    {passwordValid.length
                      ? "✔ Length between 8 and 16 characters"
                      : "✘ Length between 8 and 16 characters"}
                  </li>
                  <li
                    style={{
                      color: passwordValid.uppercase ? "#4caf50" : "#f44336",
                    }}
                  >
                    {passwordValid.uppercase
                      ? "✔ At least one uppercase letter"
                      : "✘ At least one uppercase letter"}
                  </li>
                  <li
                    style={{
                      color: passwordValid.lowercase ? "#4caf50" : "#f44336",
                    }}
                  >
                    {passwordValid.lowercase
                      ? "✔ At least one lowercase letter"
                      : "✘ At least one lowercase letter"}
                  </li>
                  <li
                    style={{
                      color: passwordValid.symbol ? "#4caf50" : "#f44336",
                    }}
                  >
                    {passwordValid.symbol
                      ? "✔ At least one symbol"
                      : "✘ At least one symbol"}
                  </li>
                </ul>
              </FormHelperText>
            </Box>
          )}
          <TextField
            placeholder="Confirm password"
            fullWidth
            type={showPassword ? "text" : "password"}
            onChange={handleConfirmPasswordChange}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? (
                      <VisibilityOff sx={{ color: "black" }} />
                    ) : (
                      <Visibility sx={{ color: "black" }} />
                    )}
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
              mb: 2,
            }}
          />
          {!passwordsMatch && confirmPassword.length > 0 && (
            <FormHelperText sx={{ color: "#f44336" }}>
              Passwords do not match
            </FormHelperText>
          )}
          <TextField
            placeholder="Organisation (optional)"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Business sx={{ color: "black" }} />
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
              mb: 2,
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
          justifyContent: "center",
          px: 2,
          py: 2,
        }}
      >
        <Button
          variant="contained"
          fullWidth // Make the button span the width of its container
          sx={{
            bgcolor: "#c8102e", // Button color
            color: "white",
            fontWeight: "bold",
            borderRadius: 2,
            py: 1.5, // Adjust vertical padding for height

            mb: 30,
            width: "100%", // Ensure button width is 100% of container width
            boxSizing: "border-box", // Ensure padding is included in width
            "&:hover": {
              bgcolor: "#a50f1d", // Slightly darker on hover
            },
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}

export default SignupForm;
