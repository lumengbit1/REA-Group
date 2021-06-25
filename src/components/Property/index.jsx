import React from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  Logo,
  LogoImg,
  ID,
  Content,
  Price,
} from './Property.style';

const Property = (props) => {
  const { color, logo, id, mainImage, price } = props;

  return (
    <>
      <Header backgroundColor={color}>
        <Logo>
          <LogoImg src={logo} alt="logo" />
        </Logo>
        <ID>
          ID:
          {id}
        </ID>
      </Header>
      <Content>
        <LogoImg src={mainImage} alt="image" />
      </Content>
      <Price>
        {price}
      </Price>
    </>
  );
};

Property.propTypes = {
  color: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  mainImage: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default Property;
