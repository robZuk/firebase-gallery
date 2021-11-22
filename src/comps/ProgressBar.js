import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";
import { motion } from "framer-motion";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const ProgressBar = ({ file, setFile }) => {
  const { progress, url } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <motion.div
      className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}
      style={{ background: red[200], height: "5px", marginTop: "20px" }}
    ></motion.div>
  );
};

export default ProgressBar;
