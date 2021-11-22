import React, { useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Container,
  Grid,
  CardContent,
  Button,
  Typography,
  TextField,
  FormGroup,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    color: "gray",
  },

  container: {
    minHeight: "95vh",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
    fontFamily: "Indie Flower, cursive",
    letterSpacing: "3px",
  },

  button: {
    margin: theme.spacing(1),
    justifyContent: "flex-start",
  },

  pos: {
    marginBottom: 12,
  },

  text: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    width: "100%",
    textAlign: "center",
  },

  input: {
    padding: "12px 0",
  },
  alert: {
    margin: "12px 0",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const ForgotPassword = () => {
  const classes = useStyles();
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <div className={classes.root}>
      <div>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
      <Grid
        className={classes.container}
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        display="flex"
      >
        <Container maxWidth="sm">
          <motion.div
            className={classes.motionDiv}
            initial={{ x: "calc(-100vw - 50%)" }}
            animate={{ x: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              delay: 0.2,
            }}
          >
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography variant="h5" component="h2">
                  Password Reset
                </Typography>
                {error && (
                  <Alert className={classes.alert} severity="error">
                    {error}
                  </Alert>
                )}
                {message && (
                  <Alert className={classes.alert} severity="success">
                    {message}
                  </Alert>
                )}
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <FormGroup>
                    <TextField
                      type="email"
                      label="Email"
                      required
                      inputRef={emailRef}
                      id="standard-basic"
                      className={classes.input}
                    />
                  </FormGroup>
                  <Button
                    className={classes.button}
                    disabled={loading}
                    variant="outlined"
                    size="small"
                    type="submit"
                  >
                    Reset Password
                  </Button>
                </form>
                <div className={classes.text}>
                  <Link to="/login">Login</Link>
                </div>
              </CardContent>
            </Card>
            <div className={classes.text} style={{ textAlign: "left" }}>
              <Link to="/">Cancel</Link>
            </div>
            <div className={classes.text}>
              Need an account? <Link to="/signup">Sign Up</Link>
            </div>
          </motion.div>
        </Container>
      </Grid>
    </div>
  );
};

export default ForgotPassword;
