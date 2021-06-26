import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getResultsAction, getSavedAction, add_property, remove_property } from '../../reducers/actions';

function componentType(type) {
  if (type === 'results') {
    return {
      clickAction: add_property,
      actionFunction: getResultsAction,
      btnText: 'Add Property',
      isResult: true,
    };
  }

  return {
    clickAction: remove_property,
    actionFunction: getSavedAction,
    btnText: 'Remove Property',
    isResult: false,
  };
}

const withComponentLoading = (WrappedComponent) => {
  function WithWrap(props) {
    const { type } = props;
    const dispatch = useDispatch();

    const value = useSelector((state) => state.getIn(['value', type]));
    const loading = useSelector((state) => state.getIn(['value', 'loading', type]));

    React.useEffect(() => {
      dispatch(componentType(type).actionFunction());
    }, []);

    if (loading) return <div data-testid="loading">Loading...</div>;

    if (!value || value.isEmpty()) return null;

    return (
      <WrappedComponent
        records={value}
        isResult={componentType(type).isResult}
        clickAction={(params) => dispatch(componentType(type).clickAction(params))}
        btnText={componentType(type).btnText}
      />
    );
  }

  WithWrap.propTypes = {
    type: PropTypes.string.isRequired,
  };

  return WithWrap;
};

export default withComponentLoading;
