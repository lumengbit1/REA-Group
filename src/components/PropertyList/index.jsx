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
  const { records, btnText, isResult, clickAction, type } = props;

  return (
    <>
      {records.map((item) => (
        <PropertyContainer key={item.id} data-testid="property">
          <Property
            id="property"
            price={item.price}
            color={item.agency.brandingColors.primary}
            logo={item.agency.logo}
            mainImage={item.mainImage}
          />
          <Button
            data-testid={`test${type}`}
            isResult={isResult}
            onClick={() => clickAction(item.id)}
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
  type: PropTypes.string.isRequired,
};

export default withComponentLoading(PropertyList);
