import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import _ from 'lodash';
import {
  MainBodyContainer,
  Root,
} from './MainRouter.styles';

const MainRouter = ({ component: Component, ...rest }) => {
  const cloned_props = { ...rest };

  const _component = () => (
    <Root>
      <MainBodyContainer>
        <Component
          {...cloned_props}
        />
      </MainBodyContainer>
    </Root>
  );

  _.assign(cloned_props, { component: _component });

  return (
    <Route
      {...rest}
      render={() => (
        <Component
          {...cloned_props}
        />
      )}
    />
  );
};

MainRouter.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
  ]),
};

MainRouter.defaultProps = {
  component: null,
};

export default MainRouter;
