import styled, { css } from 'styled-components';

const StyledButton = css`
  position: absolute;
  left: 50%;
  bottom: 1%;
  transform: translate(-50%, -50%);
  width: 11.25rem;
  height: 1.25rem;
  border-radius: 0.625rem;
  display: none;

  &:hover {
    cursor: pointer;
  }
`;

export const Button = styled.button`
  ${StyledButton};

  background-color: #f3c1c2;
  border: 0.0625rem solid #cc0007;
  color: #a21519;

  ${(props) => props.isResult && css`
    background-color: #e3f1df;
    border: 0.0625rem solid #4d8437;
    color: #4b8333;
  `}
`;

export const PropertyContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 12.5rem;
  height: 11.25rem;
  border: 0.0625rem solid #000;
  border-radius: 0.625rem;
  margin: 0.625rem;

  &:hover {
    button {
      display: block;
    }
  }
`;
