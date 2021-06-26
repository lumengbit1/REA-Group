import React from 'react';
import PropertyList from '../PropertyList';
import {
  HomePage,
  ResultsArea,
  Title,
  SavedPropertiesArea,
  Block,
} from './Home.style';

const Home = () => (
  <HomePage>
    <ResultsArea>
      <Title>
        Results
      </Title>

      <Block>
        <PropertyList
          type="results"
        />
      </Block>
    </ResultsArea>

    <SavedPropertiesArea>
      <Title>
        Saved Properties
      </Title>

      <Block>
        <PropertyList
          type="saved"
        />
      </Block>
    </SavedPropertiesArea>
  </HomePage>
);

export default Home;
