import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Gallery from "./comps/Gallery";
import Signup from "./comps/Signup";
import Login from "./comps/Login";
import Profile from "./comps/Profile";
import ForgotPassword from "./comps/ForgotPassword";
import UpdateProfile from "./comps/UpdateProfile";
import Container from "@material-ui/core/Container";
import { ProvideAuth } from "./hooks/useAuth";
import PrivateRoute from "./comps/PrivateRoute";

function App() {
  return (
    <div>
      <Container maxWidth="lg">
        <Router>
          <ProvideAuth>
            <Switch>
              <Route exact path="/" component={Gallery} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute
                path="/forgot-password"
                component={ForgotPassword}
              />
            </Switch>
          </ProvideAuth>
        </Router>
      </Container>
    </div>
  );
}

export default App;
