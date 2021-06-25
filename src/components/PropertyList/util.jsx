import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

const withComponentLoading = (WrappedComponent) => {
  function WithWrap(props) {
    const { actionFunction, type, clickAction } = props;
    const dispatch = useDispatch();

    const value = useSelector((state) => state.getIn(['value', type]));
    const loading = useSelector((state) => state.getIn(['value', 'loading', type]));

    React.useEffect(() => {
      dispatch(actionFunction());
    }, []);

    if (loading) return <div>Loading...</div>;

    if (!value || value.isEmpty()) return null;

    return (
      <WrappedComponent
        {...props}
        records={value}
        isResult={type === 'results'}
        clickAction={(params) => dispatch(clickAction(params))}
      />
    );
  }

  WithWrap.propTypes = {
    actionFunction: PropTypes.func.isRequired,
    clickAction: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
  };

  return WithWrap;
};

export default withComponentLoading;
