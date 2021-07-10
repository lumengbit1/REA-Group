import React from 'react';
import NumberFormat from 'react-number-format';
import { useDispatch } from 'react-redux';
import { filter_property } from '../../reducers/actions';
import PropertyList from '../PropertyList';
import {
  HomePage,
  PropertiesArea,
  Title,
  Block,
} from './Home.style';

const Home = () => {
  const [inputPrice, setInputPrice] = React.useState();
  const dispatch = useDispatch();

  return (
    <div>
      <NumberFormat
        thousandSeparator
        prefix="$"
        onValueChange={(values) => setInputPrice(values.value)}
      />
      <button
        type="button"
        onClick={() => dispatch(filter_property(inputPrice))}
      >
        filter
      </button>
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
    </div>
  );
};

export default Home;
