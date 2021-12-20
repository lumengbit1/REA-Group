import React from 'react';
import PropTypes from 'prop-types';
import withComponentLoading from './util';
import Property from '../Property';
import {
  Button,
  PropertyContainer,
  Container,
} from './PropertyList.style';

const PropertyList = (props) => {
  const { records, btnText, isResult, clickAction } = props;

  return (
    <Container>
      <PropertyContainer
        key={records.id}
        data-testid="property"
      >
        <Property
          id="property"
          price={records.price}
          color={records.agency.brandingColors.primary}
          logo={records.agency.logo}
          mainImage={records.mainImage}
        />
        <Button
          data-testid={btnText}
          isResult={isResult}
          onClick={() => clickAction(records.id)}
        >
          {btnText}
        </Button>
      </PropertyContainer>
    </Container>
  );
};

PropertyList.propTypes = {
  records: PropTypes.shape().isRequired,
  btnText: PropTypes.string.isRequired,
  isResult: PropTypes.bool.isRequired,
  clickAction: PropTypes.func.isRequired,
};

export default withComponentLoading(PropertyList);
