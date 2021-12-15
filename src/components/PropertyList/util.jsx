import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { map, isEmpty } from 'lodash';
import { getAction, add_property, remove_property } from '../../reducers/actions';
import settings from '../../settings';

function componentType (type) {
  if (type === 'results') {
    return {
      clickAction: add_property,
      btnText: 'Add Property',
      isResult: true,
    };
  }

  return {
    clickAction: remove_property,
    btnText: 'Remove Property',
    isResult: false,
  };
}

const withComponentLoading = (WrappedComponent) => {
  function WithWrap (props) {
    const { type } = props;
    const dispatch = useDispatch();

    const value = useSelector((state) => state.data);

    const id = useSelector((state) => state[type]);
    const loading = useSelector((state) => state.loading);
    const selectedValue = map(id, (item) => value[item]);

    React.useEffect(() => {
      dispatch(getAction(settings.BASE_API_DOMAIN));
    }, []);

    if (loading) return <div data-testid="loading">Loading...</div>;

    if (isEmpty(value)) return null;

    return (
      <WrappedComponent
        records={selectedValue}
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
