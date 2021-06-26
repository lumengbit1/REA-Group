import styled from 'styled-components';

export const HomePage = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

export const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin: 10px;
`;

export const PropertiesArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 5%;
  width: 49%;
  border: 1px solid black;
`;

export const Block = styled.div`
  border: 1px dashed #000;
  border-radius: 10px;
  padding: 20px;
  background-color: #fafbfa;
  min-width: 225px;
  min-height: 205px;
`;
