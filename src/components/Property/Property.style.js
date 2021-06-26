import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  align-items: center;
  height: 15%;
  padding: 10px;
  border-radius: 10px 10px 0 0;
  background-color: ${(props) => props.backgroundColor};
`;

export const Logo = styled.div`
  max-width: 40%;
`;

export const LogoImg = styled.img`
  width: 100%;
  height: 100%;
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
