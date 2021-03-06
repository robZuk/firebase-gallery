import { useState, useEffect } from "react";
import useFirestore from "../../hooks/useFirestore";
import { LazyMotion, domAnimation, m } from "framer-motion";
import styled from "styled-components";
import LikesAndComments from "./Likes&Comments";
import Comments from "./Comments";
import AddComment from "./AddComment";
import { useAuth } from "../../hooks/useAuth";
import { db } from "../../firebase/config";
import { doc } from "firebase/firestore";
import moment from "moment";

const StyledBackdrop = styled.div`
  z-index: 2;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
`;

const StyledAnimation = styled(m.div)`
  position: relative;
  margin: 20px auto;
  width: 100%;
  max-width: 756px;
  height: auto;
  max-height: 95vh;
  background: white;
  overflow-x: hide;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  box-shadow: 3px 5px 7px rgba(0, 0, 0, 0.3);
`;

const StyledImageContainer = styled.div`
  position: relative;
`;

const StyledImg = styled.img`
  width: 100%;
  cursor: pointer;
  object-fit: cover;
  @media (orientation: landscape) {
    max-height: 95vh;
  }
  @media (orientation: portrait) {
    max-height: 50vh;
  }
`;
const StyledTitle = styled.aside`
  width: 95%;
  position: absolute;
  bottom: 0;
  text-align: right;
  padding: 5px 5% 10px 0px;
  margin: 0;
  font-size: 16px;
  color: white;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  background-color: rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 22px -13px rgba(0, 0, 8, 1);
`;

const Wrapper = styled.div`
  margin: 0px;
  padding: 0;
  width: 100%;
  display: grid;
  grid-template-rows: 40px minmax(auto, 230px) 70px;
`;

const Modal = ({ setSelectedImg, selectedImg }) => {
  const { docs } = useFirestore("images");
  const { currentUser } = useAuth();
  const [inputFocus, setInputFocus] = useState(false);
  const [image, setImage] = useState();

  const imageRef = doc(db, "images", selectedImg.id);

  const handleFocus = () => {
    setInputFocus(true);
  };

  const handleClick = () => {
    setSelectedImg(null);
  };

  useEffect(() => {
    docs.forEach((doc) => doc.id === selectedImg.id && setImage(doc));
  }, [docs, selectedImg.id, image, inputFocus]);

  return (
    <StyledBackdrop>
      <LazyMotion features={domAnimation}>
        <StyledAnimation initial={{ y: "-100vh" }} animate={{ y: 0 }}>
          <StyledImageContainer>
            <StyledImg
              src={selectedImg.url}
              alt="enlarged pic"
              onClick={handleClick}
            />
            <StyledTitle>
              added by {selectedImg.name}{" "}
              {moment(selectedImg.createdAt.toDate())
                .startOf("minutes")
                .fromNow()}
            </StyledTitle>
          </StyledImageContainer>
          <Wrapper>
            <LikesAndComments
              img={image}
              currentUser={currentUser}
              imageRef={imageRef}
              handleFocus={handleFocus}
            />
            <Comments
              img={image}
              currentUser={currentUser}
              imageRef={imageRef}
            />
            <AddComment
              img={image}
              currentUser={currentUser}
              imageRef={imageRef}
              inputFocus={inputFocus}
              setInputFocus={setInputFocus}
            />
          </Wrapper>
        </StyledAnimation>
      </LazyMotion>
    </StyledBackdrop>
  );
};

export default Modal;
