import React from "react";
import useFirestore from "../hooks/useFirestore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import styled from "styled-components";

const StyledGrid = styled.div`
  margin: 20px auto;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;

const StyledFavoriteIcon = styled(FavoriteIcon)`
  z-index: 1;
  color: white;
  opacity: 0;
  transition: 0.3s linear;
  grid-area: icon1;
`;

const StyledModeCommentIcon = styled(ModeCommentIcon)`
  z-index: 1;
  color: white;
  opacity: 0;
  transition: 0.3s linear;
  grid-area: icon2;
`;
const StyledLikesNumber = styled.div`
  z-index: 1;
  color: white;
  font-family: "Roboto", sans-serif;
  opacity: 0;
  transition: 0.3s linear;
  grid-area: number1;
`;
const StyledCommentsNumber = styled.div`
  z-index: 1;
  color: white;
  font-family: "Roboto", sans-serif;
  opacity: 0;
  transition: 0.3s linear;
  grid-area: number2;
`;

const StyledImgWrapper = styled.div`
  width: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
  overflow: hidden;
  height: 0;
  padding: 50% 0;
  position: relative;
  opacity: 0.8;

  &:hover {
    opacity: 1;
    ${StyledModeCommentIcon}, ${StyledFavoriteIcon}, ${StyledLikesNumber}, ${StyledCommentsNumber} {
      opacity: 1;
      transition: 0.1s linear;
    }
  }
`;
const StyledIconWrapper = styled.div`
  width: 60%;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr 55px 1fr 1fr;
  grid-template-areas: "icon1 number1 . icon2 number2";
  justify-items: center;
  align-items: center;
`;

const StyledImg = styled.img`
  min-width: 100%;
  min-height: 100%;
  max-width: 150%;
  position: absolute;
  top: 0;
  left: 0;
`;

const ImageGrid = ({ setSelectedImg }) => {
  const { docs } = useFirestore("images");
  return (
    <>
      <StyledGrid>
        {docs &&
          docs.map((doc) => (
            <StyledImgWrapper
              className="img-wrap"
              key={doc.id}
              onClick={() => setSelectedImg(doc)}
            >
              <StyledIconWrapper>
                <StyledFavoriteIcon />
                <StyledLikesNumber>
                  <b>{doc.likes ? doc.likes.length : 0}</b>
                </StyledLikesNumber>
                <StyledModeCommentIcon />
                <StyledCommentsNumber>
                  <b>{doc.comments ? doc.comments.length : 0}</b>
                </StyledCommentsNumber>
              </StyledIconWrapper>
              <StyledImg src={doc.url} alt="uploaded pic" />
            </StyledImgWrapper>
          ))}
      </StyledGrid>
    </>
  );
};

export default ImageGrid;
