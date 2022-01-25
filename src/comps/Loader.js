import spinner from "../assets/spinner.gif";
import styled from "styled-components";

const StyledLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  & img {
    width: 200px
`;

const Loader = () => {
  return (
    <StyledLoader>
      <img src={spinner} alt="Loading" />
    </StyledLoader>
  );
};

export default Loader;
