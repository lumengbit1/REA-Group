import styled from 'styled-components';

export const HomePage = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

export const Title = styled.div`
  font-size: 1.875rem;
  font-weight: bold;
  margin: 0.625rem;
`;

export const PropertiesArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 5%;
  width: 49%;
  border: 0.0625rem solid black;
  padding: 1.25rem 0;
  box-sizing: border-box;
`;

export const Block = styled.div`
  border: 0.0625rem dashed #000;
  border-radius: 0.625rem;
  padding: 1.25rem;
  background-color: #fafbfa;
  min-width: 14.0625rem;
  min-height: 12.8125rem;
`;
