import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import useFirestore from "../hooks/useFirestore";
import UploadForm from "../comps/UploadForm";
import ImageGrid from "../comps/ImageGrid";
import Modal from "../comps/Modal/Modal";
import Navigation from "./Navigation";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    textAlign: "center",
  },

  title: {
    letterSpacing: "12px",
    fontFamily: "Amatic SC, cursive",
    fontWeight: "700",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const { currentUser } = useAuth();
  const { loading } = useFirestore("images");

  useEffect(() => {
    selectedImg
      ? document.body.classList.add("no-scroll")
      : document.body.classList.remove("no-scroll");
  }, [selectedImg]);

  const classes = useStyles();
  return (
    <div>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Navigation />
      <div className={classes.root}>
        <Typography
          className={classes.title}
          variant="h3"
          component="h2"
          style={{ color: red[600] }}
        >
          Photos Gallery
        </Typography>
      </div>
      {currentUser && <UploadForm />}
      <ImageGrid setSelectedImg={setSelectedImg} />
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  );
};

export default Gallery;
