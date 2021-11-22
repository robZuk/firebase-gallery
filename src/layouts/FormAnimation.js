import React from "react";
import { motion } from "framer-motion";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    fontFamily: "Roboto",

    fontWeight: 400,
  },

  container: {
    minHeight: "95vh",
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function FormContainer({ children, loading }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Grid
          className={classes.container}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          <Container maxWidth="sm">
            <motion.div
              className={classes.motionDiv}
              initial={{ x: "calc(-100vw - 50%)" }}
              animate={{ x: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                delay: 0.2,
              }}
            >
              {children}
            </motion.div>
          </Container>
        </Grid>
      </div>
    </div>
  );
}
