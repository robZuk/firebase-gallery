import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { makeStyles } from "@material-ui/core/styles";
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

  pos: {
    marginBottom: 12,
  },

  text: {
    ...theme.typography.button,
    padding: theme.spacing(1),
  },

  input: {
    padding: "12px 0",
  },
  alert: {
    margin: "12px 0",
  },
}));

const UpdateProfile = () => {
  const classes = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    currentUser,
    updateUserPassword,
    updateUserEmail,
    updateDisplayName,
  } = useAuth();

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateUserEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updateUserPassword(passwordRef.current.value));
    }
    if (nameRef.current.value !== currentUser.displayName) {
      promises.push(updateDisplayName(nameRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <FormContainer loading={loading}>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            Update Profile
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
                defaultValue={currentUser && currentUser.email}
              />
              <TextField
                type="text"
                label="Name"
                required
                inputRef={nameRef}
                className={classes.input}
                defaultValue={currentUser && currentUser.displayName}
              />

              <TextField
                type="password"
                label="Password"
                required
                inputRef={passwordRef}
                className={classes.input}
                placeholder="Leave blank to keep the same"
              />
              <TextField
                type="password"
                label="Password Confirmation"
                required
                inputRef={passwordConfirmRef}
                className={classes.input}
                placeholder="Leave blank to keep the same"
              />
            </FormGroup>
            <Button
              className={classes.button}
              disabled={loading}
              variant="outlined"
              size="small"
              type="submit"
            >
              Update
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className={classes.text}>
        <Link to="/">Cancel</Link>
      </div>
    </FormContainer>
  );
};

export default UpdateProfile;
