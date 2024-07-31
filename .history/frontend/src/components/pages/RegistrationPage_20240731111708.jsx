// src/RegistrationForm.js

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
import { useAuth } from "../contexts/AuthContext"; // Import useAuth from AuthContext

function RegistrationForm() {
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const { register } = useAuth(); // Use register function from AuthContext

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    setPassword(password);
    setPasswordEntered(true);
    setShowRequirements(true);

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

    setPasswordStrength(
      (lengthValid + uppercaseValid + lowercaseValid + symbolValid) * 25
    );

    if (typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(
      setTimeout(() => {
        setShowRequirements(false);
      }, 2000)
    );
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleTermsChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset error state
    setError("");

    // Check for required fields
    if (!username || !email || !password || !confirmPassword) {
      setError("Please enter all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!termsAccepted) {
      setError("You must accept the terms and conditions.");
      return;
    }

    setLoading(true);

    try {
      await register(email, password);
      alert("Registration successful!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 33) return "#f44336"; // Red for weak
    if (passwordStrength <= 66) return "#ff9800"; // Orange for medium
    return "#4caf50"; // Green for strong
  };

  const passwordsMatch = password === confirmPassword;

  useEffect(() => {
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
            value={username}
            onChange={handleInputChange(setUsername)}
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
            value={email}
            onChange={handleInputChange(setEmail)}
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
            value={password}
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
            value={confirmPassword}
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
            placeholder="role (optional)"
            fullWidth
            margin="normal"
            value={role}
            onChange={handleInputChange(setRole)}
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
                checked={termsAccepted}
                onChange={handleTermsChange}
                sx={{
                  color: "#dbe1e6",
                  "&.Mui-checked": {
                    color: "#2094f3",
                  },
                }}
              />
            }
            label="I confirm that all the details I have entered are correct to the best of my knowledge"
            sx={{ color: "#111518", mt: 2 }}
          />
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            disabled={loading} // Disable button while loading
            sx={{
              bgcolor: "#c8102e",
              color: "white",
              fontWeight: "bold",
              borderRadius: 2,
              py: 1.5,
              mt: 3,
              width: "100%",
              boxSizing: "border-box",
              "&:hover": {
                bgcolor: "#a50f1d",
              },
            }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default RegistrationForm;
