import React from "react";
import CommentMenu from "./CommentMenu";
import styled from "styled-components";
import moment from "moment";

const StyledWrapper = styled.div`
  width: 96%;
  max-width: 100%;
  margin: 2%;
  font-family: "Roboto", sans-serif;
  font-style: italic;
  font-weight: 400;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  & div {
    margin-bottom: 3%;
    & .announcement {
      text-align: center;
      margin-top: 80px;
    }
  }

  /* & > div:nth-child(1) {
    color: red;
  } */
  & div > div {
    display: grid;
    grid-template-columns: 5fr 1fr;
    margin: 0;
    width: 100%;
    word-break: break-all;

    div {
      height: 100%;
      width: 50%;
    }
  }
`;

const StyledDate = styled.div`
  font-size: 12px;
`;

const Comments = ({ img, currentUser, imageRef }) => {
  const sortedByComments =
    img &&
    img.comments.sort(function (a, b) {
      return b.createdAt.seconds - a.createdAt.seconds;
    });

  return (
    <StyledWrapper>
      {img && sortedByComments === 0 ? (
        <p className="announcement">There is no any comment</p>
      ) : (
        img &&
        sortedByComments.map((comment, index) => (
          <div key={index}>
            <div>
              <p>
                <b>{comment.name} </b>
                {comment.comment}
              </p>
              {currentUser && currentUser.uid === comment.userId && (
                <CommentMenu comment={comment} imageRef={imageRef} />
              )}
            </div>
            <StyledDate>
              {moment(comment.createdAt.toDate()).startOf("minutes").fromNow()}
            </StyledDate>
          </div>
        ))
      )}
    </StyledWrapper>
  );
};

export default Comments;
