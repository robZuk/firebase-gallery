import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../hooks/useAuth";
import { Link, useHistory } from "react-router-dom";
import {
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
  FormGroup,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import FormContainer from "../layouts/FormAnimation";

const useStyles = makeStyles((theme) => ({
  root: { color: "gray" },

  button: {
    margin: theme.spacing(1),
    justifyContent: "flex-start",
  },

  text: {
    ...theme.typography.button,
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
}));

const Login = () => {
  const classes = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <FormContainer loading={loading}>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            Login
          </Typography>
          {error && (
            <Alert className={classes.alert} severity="error">
              {error}
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
              <TextField
                type="password"
                label="Password"
                required
                inputRef={passwordRef}
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
              Login
            </Button>
          </form>
          <div className={classes.text}>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </CardContent>
      </Card>
      <div className={classes.text} style={{ textAlign: "left" }}>
        <Link to="/">Cancel</Link>
      </div>
      <div className={classes.text}>
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </FormContainer>
  );
};

export default Login;
