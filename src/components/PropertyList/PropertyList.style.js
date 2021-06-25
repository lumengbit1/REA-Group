import styled, { css } from 'styled-components';

const StyledButton = css`
  position: absolute;
  left: 50%;
  bottom: 1%;
  transform: translate(-50%, -50%);
  width: 180px;
  height: 20px;
  border-radius: 10px;
  display: none;

  &:hover {
    cursor: pointer;
  }
`;

export const Button = styled.button`
  ${StyledButton};

  background-color: #f3c1c2;
  border: 1px solid #cc0007;
  color: #a21519;

  ${(props) => props.isResult && css`
    background-color: #e3f1df;
    border: 1px solid #4d8437;
    color: #4b8333;
  `}
`;

export const PropertyContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 200px;
  height: 180px;
  border: 1px solid #000;
  border-radius: 10px;
  margin: 10px;

  &:hover {
    button {
      display: block;
    }
  }
`;
