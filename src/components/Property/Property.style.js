import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  align-items: center;
  height: 15%;
  padding: 0.625rem;
  border-radius: 0.625rem 0.625rem 0 0;
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
  padding-left: 0.3125rem;
`;
