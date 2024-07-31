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
import { useAuth } from "../contexts/AuthProvider"; // Adjust the path as needed

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
  const [email, setEmail] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();

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

  const getStrengthColor = () => {
    if (passwordStrength <= 33) return "#f44336";
    if (passwordStrength <= 66) return "#ff9800";
    return "#4caf50";
  };

  const passwordsMatch = password === confirmPassword;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!passwordsMatch) {
      setError("Passwords do not match");
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "white",
        overflow: "hidden",
      }}
      component="form"
      onSubmit={handleSubmit}
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
          {error && (
            <Typography color="error" sx={{ textAlign: "center", mb: 2 }}>
              {error}
            </Typography>
          )}
          <TextField
            placeholder="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
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
              <FormHelperText sx={{ mt: 1 }}>
                Password must be 8-16 characters long and include at least one
                uppercase letter, one lowercase letter, and one symbol.
              </FormHelperText>
            </Box>
          )}
          <TextField
            placeholder="Confirm Password"
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
          {!passwordsMatch && (
            <Typography color="error" sx={{ textAlign: "center", mb: 2 }}>
              Passwords do not match
            </Typography>
          )}
          <FormControlLabel
            control={<Checkbox sx={{ color: "black" }} />}
            label="I accept the terms and conditions"
            sx={{
              "& .MuiFormControlLabel-label": {
                color: "#111518",
              },
            }}
          />
          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={!passwordsMatch || loading}
            sx={{
              backgroundColor: "#007bff",
              color: "#fff",
              py: 1.5,
              fontSize: "1rem",
              borderRadius: 2,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
              mb: 2,
            }}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default RegistrationForm;
