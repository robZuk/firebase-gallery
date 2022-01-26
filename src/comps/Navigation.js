import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import MoreIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontFamily: "Indie Flower, cursive",
    letterSpacing: "3px",
    flexGrow: 1,
    color: "rgba(0, 0, 0, 0.87)",
  },

  bar: {
    background: "transparent",
    boxShadow: "none",
  },

  loginButton: {
    textDecoration: "none",
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Indie Flower, cursive",
    letterSpacing: "3px",
    fontSize: "18px",
  },
  menu: {
    fontFamily: "Indie Flower, cursive",
    letterSpacing: "3px",
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { currentUser, logout } = useAuth();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleLogout(e) {
    e.preventDefault();
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" className={classes.bar}>
          <Toolbar>
            <Typography variant="body2" className={classes.title}>
              {currentUser && (
                <>
                  Hello <b>{currentUser.displayName}</b>
                </>
              )}
            </Typography>
            {currentUser ? (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                >
                  <MoreIcon className={classes.profile} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose} className={classes.menu}>
                    <Link to="/profile">
                      <b>Profile</b>
                    </Link>
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      handleClose();
                      handleLogout(e);
                    }}
                    className={classes.menu}
                  >
                    <b>Logout</b>
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Button>
                <Link className={classes.loginButton} to="/login">
                  <b>Login</b>
                </Link>
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
