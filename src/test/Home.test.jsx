import React from 'react';
import 'jest-styled-components';
import axios from 'axios';
import * as redux from 'react-redux';
import { Provider } from 'react-redux';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import Home from '../components/Home';
import eventList from '../reducers/reducer';
import settings from '../settings';

const store = createStore(combineReducers({ value: eventList }), applyMiddleware(thunk));

const mockSavedData = [
  {
    price: '$526,500',
    agency: {
      brandingColors: {
        primary: '#000000',
      },
      logo: 'http://i2.au.reastatic.net/agencylogo/WVYSSK/2/20140701084436.gif',
    },
    id: '4',
    mainImage:
      'http://i2.au.reastatic.net/640x480/5e84d96722dda3ea2a084d6935677f64872d1d760562d530c3cabfcb7bcda9c2/main.jpg',
  },
];

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

describe('filter function test', () => {
  it('1: expect filter button onclick event', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet(`${settings.SAVED_BASE_API_DOMAIN}`).reply(200, mockSavedData);

    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();

    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const { getByTestId } = render(
      <redux.Provider store={store}>
        <Home />
      </redux.Provider>,
    );
    await waitFor(() => getByTestId('filter'));
    fireEvent.click(getByTestId('filter'));
    expect(mockDispatchFn).toBeCalled();
  });

  it('2: expect input change event', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet(`${settings.SAVED_BASE_API_DOMAIN}`).reply(200, mockSavedData);

    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();

    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const { getByTestId } = render(
      <redux.Provider store={store}>
        <Home />
      </redux.Provider>,
    );

    await waitFor(() => getByTestId('input'));
    fireEvent.change(getByTestId('input'), { target: { value: '23' } });
    expect(getByTestId('input').value).toBe('$23');
  });
});
