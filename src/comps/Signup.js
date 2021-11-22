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

const Signup = () => {
  const classes = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(
        emailRef.current.value,
        nameRef.current.value,
        passwordRef.current.value
      );
      history.push("/");
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  }

  return (
    <FormContainer loading={loading}>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            Sign Up
          </Typography>
          {error && (
            <Alert className={classes.alert} severity="error">
              {error}
            </Alert>
          )}
          <form
            className={classes.form}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <FormGroup>
              <TextField
                type="email"
                label="Email"
                required
                inputRef={emailRef}
                className={classes.input}
              />
              <TextField
                type="text"
                label="Name"
                required
                inputRef={nameRef}
                className={classes.input}
              />
              <TextField
                type="password"
                label="Password"
                required
                inputRef={passwordRef}
                className={classes.input}
              />
              <TextField
                type="password"
                label="Password Confirmation"
                required
                inputRef={passwordConfirmRef}
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
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className={classes.text} style={{ textAlign: "left" }}>
        <Link to="/">Cancel</Link>
      </div>
    </FormContainer>
  );
};

export default Signup;
