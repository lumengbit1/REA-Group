import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { getAction, add_property, remove_property } from '../../reducers/actions';
import settings from '../../settings';

function componentType (type) {
  if (type === 'results') {
    return {
      clickAction: add_property,
      actionFunction: settings.RESULTS_BASE_API_DOMAIN,
      btnText: 'Add Property',
      isResult: true,
    };
  }

  return {
    clickAction: remove_property,
    actionFunction: settings.SAVED_BASE_API_DOMAIN,
    btnText: 'Remove Property',
    isResult: false,
  };
}

const withComponentLoading = (WrappedComponent) => {
  function WithWrap (props) {
    const { type } = props;
    const dispatch = useDispatch();

    const value = useSelector((state) => state[type]);
    const loading = useSelector((state) => state.loading[type]);

    React.useEffect(() => {
      dispatch(getAction(type, componentType(type).actionFunction));
    }, []);

    if (loading) return <div data-testid="loading">Loading...</div>;

    if (_.isEmpty(value)) return null;

    return (
      <WrappedComponent
        records={value}
        isResult={componentType(type).isResult}
        clickAction={(params) => dispatch(componentType(type).clickAction(params))}
        btnText={componentType(type).btnText}
        type={type}
      />
    );
  }

  WithWrap.propTypes = {
    type: PropTypes.string.isRequired,
  };

  return WithWrap;
};

export default withComponentLoading;
