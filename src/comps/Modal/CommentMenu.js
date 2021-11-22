import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Menu from "@material-ui/core/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { deleteComment } from "../../firebase/firestore";
const useStyles = makeStyles((theme) => ({
  menu: {
    fontfamily: "Roboto sans-serif",
    fontStyle: "italic",
    fontWeight: "400",
    fontSize: "14px",
  },
}));

const CommentMenu = ({ comment, imageRef }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="menu"
        aria-controls="menu-appbar"
        onClick={handleMenu}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        keepMounted
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={(e) => {
            console.log(deleteComment);
            deleteComment(comment, imageRef);
            handleClose();
          }}
          className={classes.menu}
        >
          Delete Comment
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
          }}
          className={classes.menu}
        >
          Close
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CommentMenu;
