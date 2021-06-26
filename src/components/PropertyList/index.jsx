import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import withComponentLoading from './util';
import Property from '../Property';
import {
  Button,
  PropertyContainer,
} from './PropertyList.style';

const PropertyList = (props) => {
  const { records, btnText, isResult, clickAction } = props;

  return (
    <>
      {records.map((item) => (
        <PropertyContainer key={item.get('id')}>
          <Property
            price={item.get('price')}
            color={item.getIn(['agency', 'brandingColors', 'primaryitem'])}
            logo={item.getIn(['agency', 'logo'])}
            id={item.get('id')}
            mainImage={item.get('mainImage')}
          />
          <Button
            data-testid="test"
            isResult={isResult}
            onClick={() => clickAction(item.get('id'))}
          >
            {btnText}
          </Button>
        </PropertyContainer>
      ))}
    </>
  );
};

PropertyList.propTypes = {
  records: ImmutablePropTypes.list.isRequired,
  btnText: PropTypes.string.isRequired,
  isResult: PropTypes.bool.isRequired,
  clickAction: PropTypes.func.isRequired,
};

export default withComponentLoading(PropertyList);