import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { addLike, deleteLike } from "../../firebase/firestore";
import { motion } from "framer-motion";
import styled from "styled-components";

const StyledWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 5fr 1fr 5fr;
  justify-items: center;
  align-items: center;
  border-bottom: 1px solid gray;
  @media (orientation: portrait) {
    grid-template-columns: 1fr 4fr 1fr 4fr;
  }
  & p {
    justify-self: start;
    font-family: "Roboto", sans-serif;
    font-style: italic;
    font-weight: 400;
    margin: 0;
    padding: 0;
  }
`;

const StyledFavoriteIcon = styled(FavoriteIcon)`
  transition: 0.3s linear;
  cursor: pointer;
  color: ${({ $like }) => `${!$like ? "salmon" : "lightgray"}`};
  font-size: 25px;
  text-align: center;
`;

function LikesAndComments({ img, currentUser, imageRef }) {
  const history = useHistory();
  const [like, setLike] = useState();

  useEffect(() => {
    return img && currentUser && img.likes.includes(currentUser.uid)
      ? setLike(false)
      : setLike(true);
  }, [currentUser, img]);

  function updateLike() {
    currentUser && like && addLike(imageRef, currentUser);
    currentUser && !like && deleteLike(imageRef, currentUser);
    !currentUser && history.push("/login");
  }

  return (
    <StyledWrapper>
      <div
        style={{
          position: "relative",
          display: "grid",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <motion.i whileTap={{ scale: 1.2 }} style={{ position: "absolute" }}>
          <StyledFavoriteIcon onClick={updateLike} $like={like} />
        </motion.i>
      </div>
      <p>Likes: {img && img.likes ? img.likes.length : 0} </p>
      <ChatBubbleOutlineIcon />
      <p>Comments: {img && img.comments ? img.comments.length : 0} </p>
    </StyledWrapper>
  );
}
export default LikesAndComments;
