import React from 'react';
import PropertyList from '../PropertyList';
import {
  HomePage,
  PropertiesArea,
  Title,
  Block,
} from './Home.style';

const Home = () => (
  <HomePage>
    <PropertiesArea>
      <Title>
        Results
      </Title>

      <Block>
        <PropertyList type="results" />
      </Block>
    </PropertiesArea>

    <PropertiesArea>
      <Title>
        Saved Properties
      </Title>

      <Block>
        <PropertyList type="saved" />
      </Block>
    </PropertiesArea>
  </HomePage>
);

export default Home;
