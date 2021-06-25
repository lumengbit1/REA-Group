import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';

const withComponentLoading = (WrappedComponent) => {
  function WithWrap(props) {
    const { loading, weatherRecords } = props;

    if (loading) return 'Loading...';

    if (!weatherRecords || weatherRecords.isEmpty()) return null;

    return (
      <WrappedComponent {...props} />
    );
  }

  WithWrap.propTypes = {
    loading: PropTypes.bool,
    weatherRecords: ImmutablePropTypes.map,
  };

  WithWrap.defaultProps = {
    loading: undefined,
    weatherRecords: Map(),
  };

  return WithWrap;
};

export default withComponentLoading;
