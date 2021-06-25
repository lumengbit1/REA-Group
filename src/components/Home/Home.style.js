import styled from 'styled-components';

export const HomePage = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100vh;
`;

export const ResultsArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
  margin-right: 10px;
  padding-top: 5%;
  border: 1px solid black;
`;

export const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin: 10px;
`;

export const SavedPropertiesArea = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 5%;
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
