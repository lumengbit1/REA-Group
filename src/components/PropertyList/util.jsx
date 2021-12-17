import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { map, isEmpty, size } from 'lodash';
import { getAction, add_property, remove_property } from '../../reducers/actions';
import settings from '../../settings';
import { RootContainer, Container, Title } from './PropertyList.style';

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
  function WithWrap () {
    const dispatch = useDispatch();

    const value = useSelector((state) => state.reducer.entities);
    const result = useSelector((state) => state.reducer.result);
    const loading = useSelector((state) => state.reducer.loading);

    React.useEffect(() => {
      dispatch(getAction(settings.BASE_API_DOMAIN));
    }, []);

    if (loading) return <div data-testid="loading">Loading...</div>;

    if (isEmpty(value)) return null;

    return (
      <RootContainer>
        {map(result, (item, index) => (
          <Container
            key={index}
            length={size(result) || 1}
          >
            <Title>
              {index}
            </Title>
            {map(item, (val) => (
              <WrappedComponent
                key={value[val].id}
                records={value[val]}
                isResult={componentType(index).isResult}
                clickAction={(params) => dispatch(componentType(index).clickAction(params))}
                btnText={componentType(index).btnText}
              />
            ))}
          </Container>
        ))}
      </RootContainer>
    );
  }

  return WithWrap;
};

export default withComponentLoading;
