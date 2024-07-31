import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
} from "@mui/material";
import bcrypt from "bcryptjs";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ErrorIcon from "@mui/icons-material/Error";
import mercyImage from "../../assets/Mercy.png";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import zxcvbn from "zxcvbn";

// Validation schema
const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  organisation: yup.string().required("Organisation is required"),
});

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLaptop = useMediaQuery(theme.breakpoints.between("md", "lg"));

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      organisation: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError("");

      try {
        const hashedPassword = await bcrypt.hash(values.password, 10);

        const response = await fetch(
          "http://localhost:5000/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: values.username,
              email: values.email,
              password: hashedPassword,
              organisation: values.organisation,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to register user");
        }

        const data = await response.json();
        setSuccess(true);
        formik.resetForm();
      } catch (error) {
        setError(error.message);
        setFailure(true);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleCloseSuccess = () => {
    setSuccess(false);
    navigate("/login");
  };

  const handleCloseFailure = () => {
    setFailure(false);
  };

  const handlePasswordChange = (e) => {
    formik.handleChange(e);
    const strength = zxcvbn(e.target.value).score;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = (strength) => {
    switch (strength) {
      case 0:
        return "red";
      case 1:
        return "orange";
      case 2:
        return "yellow";
      case 3:
        return "lightgreen";
      case 4:
        return "green";
      default:
        return "red";
    }
  };

  return (
    <Container maxWidth="lg">
      <Box
        mt={5}
        p={3}
        boxShadow={3}
        bgcolor="background.paper"
        borderRadius={2}
        sx={{
          ml: {
            xs: "auto",
            sm: "auto",
            md: isLaptop ? 30 : isTablet ? 50 : 40,
            lg: 70,
          },
          width: {
            xs: "100%",
            sm: "75%",
            md: isLaptop ? "50%" : isTablet ? "70%" : "80%",
            lg: "50%",
          },
        }}
      >
        <Typography variant="h5" gutterBottom>
          <Box display="flex" alignItems="center">
            <img
              src={mercyImage}
              alt="Registration"
              style={{
                width: "150px",
                height: "auto",
                marginRight: "8px",
              }}
            />
            <Typography variant="h5" fontWeight="bold" color="#D0202E">
              Registration
            </Typography>
          </Box>
        </Typography>

        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            sx={{ borderRadius: "15px", fontSize: "0.8rem" }}
            InputProps={{
              style: {
                borderRadius: "15px",
                padding: "8px",
              },
            }}
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ borderRadius: "15px", fontSize: "0.8rem" }}
            InputProps={{
              style: {
                borderRadius: "15px",
                padding: "8px",
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={handlePasswordChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ borderRadius: "15px", fontSize: "0.8rem" }}
            InputProps={{
              style: {
                borderRadius: "15px",
                padding: "8px",
              },
            }}
          />
          <Box mt={1}>
            <LinearProgress
              variant="determinate"
              value={(passwordStrength / 4) * 100}
              sx={{
                height: "10px",
                borderRadius: "5px",
                bgcolor: getPasswordStrengthColor(passwordStrength),
              }}
            />
            <Typography
              variant="caption"
              display="block"
              color={getPasswordStrengthColor(passwordStrength)}
              mt={1}
            >
              Password Strength:{" "}
              {
                ["Very Weak", "Weak", "Fair", "Good", "Strong"][
                  passwordStrength
                ]
              }
            </Typography>
          </Box>
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            sx={{ borderRadius: "15px", fontSize: "0.8rem" }}
            InputProps={{
              style: {
                borderRadius: "15px",
                padding: "8px",
              },
            }}
          />
          <TextField
            label="Organisation"
            name="organisation"
            value={formik.values.organisation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            error={
              formik.touched.organisation && Boolean(formik.errors.organisation)
            }
            helperText={
              formik.touched.organisation && formik.errors.organisation
            }
            sx={{ borderRadius: "15px", fontSize: "0.8rem" }}
            InputProps={{
              style: {
                borderRadius: "15px",
                padding: "8px",
              },
            }}
          />
          <Box mt={2} display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#D0202E",
                color: "white",
                borderRadius: "25px",
                padding: "10px 30px",
                fontSize: "0.9rem",
                "&:hover": {
                  backgroundColor: "#A91B26",
                },
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Register"}
            </Button>
          </Box>
        </form>

        <Dialog
          open={success}
          onClose={handleCloseSuccess}
          aria-labelledby="success-dialog-title"
          aria-describedby="success-dialog-description"
        >
          <DialogTitle id="success-dialog-title">
            <Box display="flex" alignItems="center">
              <CheckCircleIcon color="success" />
              <Typography variant="h6" ml={1}>
                Registration Successful
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Typography>Thank you for registering!</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseSuccess} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={failure}
          onClose={handleCloseFailure}
          aria-labelledby="failure-dialog-title"
          aria-describedby="failure-dialog-description"
        >
          <DialogTitle id="failure-dialog-title">
            <Box display="flex" alignItems="center">
              <ErrorIcon color="error" />
              <Typography variant="h6" ml={1}>
                Registration Failed
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Typography>{error}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseFailure} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default RegistrationForm;
