import React from 'react';
import 'jest-styled-components';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import Home from '../components/Home';
import eventList from '../reducers/reducer';

const store = createStore(combineReducers({ value: eventList }), applyMiddleware(thunk));

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
