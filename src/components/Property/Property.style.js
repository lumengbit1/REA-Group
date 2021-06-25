import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 15%;
  border-radius: 10px 10px 0 0;
  background-color: ${(props) => props.backgroundColor};
`;

export const Logo = styled.span`
  position: absolute;
  max-height: 25px;
  overflow: hidden;
  margin: 1px 1px 1px 10px;
  box-sizing: border-box;
  left: 2%;
  top: 1%;
`;

export const LogoImg = styled.img`
  width: 100%;
  height: 100%;
`;

export const ID = styled.span`
  background: inherit;
  background-clip: text;
  color: transparent;
  filter: invert(1) grayscale(1) contrast(9);
`;

export const Content = styled.div`
  height: 65%;
`;

export const Price = styled.div`
  height: 20%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 5px;
`;
