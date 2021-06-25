import React from 'react';
import PropertyList from '../PropertyList';
import { getResultsAction, getSavedAction, add_property, remove_property } from '../../reducers/actions';
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
          btnText="Add Property"
          type="results"
          actionFunction={getResultsAction}
          clickAction={add_property}
        />
      </Block>
    </ResultsArea>

    <SavedPropertiesArea>
      <Title>
        Saved Properties
      </Title>

      <Block>
        <PropertyList
          btnText="Remove Property"
          type="saved"
          actionFunction={getSavedAction}
          clickAction={remove_property}
        />
      </Block>
    </SavedPropertiesArea>
  </HomePage>
);

export default Home;
