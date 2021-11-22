import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import UploadForm from "../comps/UploadForm";
import ImageGrid from "../comps/ImageGrid";
import Modal from "../comps/Modal/Modal";
import Navigation from "./Navigation";
import { motion } from "framer-motion";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";

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
}));

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const { currentUser } = useAuth();
  const classes = useStyles();
  return (
    <div>
      <Navigation />
      <motion.div
        className={classes.root}
        initial={{ x: "calc(-100vw - 50%)" }}
        animate={{ x: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          delay: 0.2,
        }}
      >
        <Typography
          className={classes.title}
          variant="h3"
          component="h2"
          style={{ color: red[600] }}
        >
          Photos Gallery
        </Typography>
      </motion.div>
      {currentUser && <UploadForm />}
      <ImageGrid setSelectedImg={setSelectedImg} />
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  );
};

export default Gallery;
