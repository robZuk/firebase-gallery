import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { Card, CardContent, Button, Typography } from "@material-ui/core";
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
  },

  input: {
    padding: "12px 0",
  },
  alert: {
    margin: "12px 0",
  },
}));

const Profile = () => {
  const classes = useStyles();

  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  async function handleLogout() {
    setError("");
    setLoading(true);
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }

    setLoading(false);
  }

  return (
    <FormContainer loading={loading}>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            Profile
          </Typography>
          {error && (
            <Alert className={classes.alert} severity="error">
              {error}
            </Alert>
          )}
          <Typography variant="body1">
            Email: {currentUser && currentUser.email}
          </Typography>
          <div className={classes.text}>
            <Link to="/update-profile">Update Profile</Link>
          </div>
        </CardContent>
        <Button
          onClick={handleLogout}
          className={classes.button}
          disabled={loading}
          variant="outlined"
          size="small"
          type="submit"
        >
          Log Out
        </Button>
      </Card>
      <div className={classes.text}>
        <Link to="/">Cancel</Link>
      </div>
    </FormContainer>
  );
};

export default Profile;
