import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

export default function TitlebarImageList({ docs, setSelectedImg }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageList rowHeight={180} className={classes.imageList}>
        {docs.map((item) => (
          <ImageListItem key={item.id} onClick={() => setSelectedImg(item.url)}>
            <motion.img
              width="100%"
              height="100%"
              src={item.url}
              alt={item.title}
              whileHover={{ opacity: 1 }}
              whileTap={{
                opacity: 0.8,
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
