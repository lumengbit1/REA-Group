import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import Router from '../router/routers';
import reducer from '../reducers';

const store = createStore(reducer, applyMiddleware(thunk));

describe('Route Test', () => {
  it('Route Test', () => {
    const component = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <Router />
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
