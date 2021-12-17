import React from 'react';
import 'jest-styled-components';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import Home from '../components/Home';
import reducer from '../reducers';

const store = createStore(reducer, applyMiddleware(thunk));

describe('Render Test', () => {
  it('case: expect rendering correct', () => {
    const { container } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
