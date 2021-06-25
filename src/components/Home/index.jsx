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
          area="results"
          btnText="Add Property"
          btnClass="btnresults"
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
          area="saved"
          btnText="Remove Property"
          btnClass="btnsaved"
          type="saved"
          actionFunction={getSavedAction}
          clickAction={remove_property}
        />
      </Block>
    </SavedPropertiesArea>
  </HomePage>
);

export default Home;
