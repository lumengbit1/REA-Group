import React from 'react';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
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
  const [totalPrice, setTotalPrice] = React.useState(0);
  const dispatch = useDispatch();

  const savedValue = useSelector((state) => state.getIn(['value', 'saved']));

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  React.useEffect(() => {
    if (savedValue.isEmpty()) {
      setTotalPrice(0);
    }
    savedValue.forEach((item) => setTotalPrice(totalPrice + Number(item.get('price').slice(1).split(',').join(''))));
  }, [savedValue]);

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
      <div>
        {formatter.format(totalPrice)}
      </div>
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
