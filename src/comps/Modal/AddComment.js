import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { addComment } from "../../firebase/firestore";
import SendSharpIcon from "@material-ui/icons/SendSharp";

const StyledWrapper = styled.div`
  width: 100%;
  position: relative;
  align-items: center;
  border-top: 1px solid gray;
`;

const StyledForm = styled.form`
  margin: 1% 2%;
`;

const StyledTextarea = styled.textarea`
  width: 90%;
  line-height: 1.5;
  border: none;
  font-family: "Roboto", sans-serif;
  font-style: italic;
  font-weight: 400;
  box-shadow: none;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  &:focus {
    outline: 0.3px;
  }
`;

const StyledButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0%, -50%);
  border: 0;
  background-color: inherit;
  cursor: pointer;
  color: darkgray;
  transition: 0.3s;
  :hover {
    color: gray;
  }
`;

const AddComment = ({ currentUser, imageRef, inputFocus, setInputFocus }) => {
  const textareaRef = useRef();
  const history = useHistory();

  useEffect(() => {
    inputFocus && textareaRef.current.focus();
  }, [inputFocus]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputFocus(false);
    textareaRef.current.value !== "" &&
      addComment(textareaRef.current.value, imageRef, currentUser);
    textareaRef.current.value = "";
  };

  const handleFocus = () => {
    !currentUser && history.push("/login");
  };

  const handleBlur = () => {
    setInputFocus(false);
  };

  return (
    <StyledWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <StyledTextarea
          onBlur={handleBlur}
          onClick={handleFocus}
          placeholder="Add comment ..."
          ref={textareaRef}
          rows="3"
        ></StyledTextarea>
        <StyledButton type="submit">
          <SendSharpIcon />
        </StyledButton>
      </StyledForm>
    </StyledWrapper>
  );
};

export default AddComment;
