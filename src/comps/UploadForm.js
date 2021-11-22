import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Alert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
    height: 0,
    width: 0,
    opacity: 0,
  },

  form: {
    margin: "40px auto",
    textAlign: "center",
  },
}));

const UploadForm = () => {
  const classes = useStyles();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ["image/png", "image/jpeg"];

  const changeHandler = (e) => {
    let selected = e.target.files[0];

    if (!types.includes(selected.type)) {
      setFile(null);
      setError("Please select an image file (png or jpg)");
    } else if (selected.size > 500000) {
      setFile(null);
      setError("Maximum size of file is 500 KB");
    } else {
      setFile(selected);
      setError("");
    }
  };

  const closeAlert = () => {
    setError(null);
  };

  return (
    <>
      <motion.form
        className={classes.form}
        initial={{ x: "calc(100vw + 50%)" }}
        animate={{ x: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          delay: 0.2,
        }}
      >
        <input
          accept="image/*"
          className={classes.input}
          id="icon-button-file"
          type="file"
          onChange={changeHandler}
        />
        <label htmlFor="icon-button-file">
          <IconButton
            style={{ fontSize: 40, color: red[200] }}
            aria-label="upload picture"
            component="span"
          >
            <AddCircleOutlineIcon style={{ fontSize: 40, color: red[200] }} />
          </IconButton>
        </label>

        <div className="output">
          {error && (
            <Alert
              severity="error"
              variant="outlined"
              onClose={() => {
                closeAlert();
              }}
            >
              {error}
            </Alert>
          )}
          {file && (
            <Typography variant="body2" gutterBottom>
              {file.name}
            </Typography>
          )}
          {file && <ProgressBar file={file} setFile={setFile} />}
        </div>
      </motion.form>
    </>
  );
};

export default UploadForm;
