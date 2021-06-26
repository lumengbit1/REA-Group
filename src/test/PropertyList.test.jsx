import React from 'react';
import 'jest-styled-components';
import axios from 'axios';
import * as redux from 'react-redux';

import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import PropertyList from '../components/PropertyList';
import eventList from '../reducers/reducer';
import settings from '../settings';

const store = createStore(combineReducers({ value: eventList }), applyMiddleware(thunk));

afterEach(cleanup);

const mockResultsData = [
  {
    price: '$726,500',
    agency: {
      brandingColors: {
        primary: '#ffe512',
      },
      logo: 'https://i1.au.reastatic.net/170x32/d9e65c666e427e655fb63dcfe73f50d4ac7ff9a58c173db9474bd92e75b01070/main.gif',
    },
    id: '1',
    mainImage: 'https://i2.au.reastatic.net/640x480/20bfc8668a30e8cabf045a1cd54814a9042fc715a8be683ba196898333d68cec/main.jpg',
  },

];

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
  it('1: expect rendering correct when type=results', () => {
    const { container } = render(
      <redux.Provider store={store}>
        <PropertyList type="results" />
      </redux.Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('2: expect rendering correct when type=saved', () => {
    const { container } = render(
      <redux.Provider store={store}>
        <PropertyList type="saved" />
      </redux.Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});

describe('Function Test', () => {
  it('1: expect getResultsAction becalled', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet(`${settings.RESULTS_BASE_API_DOMAIN}`).reply(200, mockResultsData);

    const { getByTestId } = render(
      <redux.Provider store={store}>
        <PropertyList type="results" />
      </redux.Provider>,
    );

    await waitFor(() => getByTestId('property'));

    expect(getByTestId('property')).toBeInTheDocument();
  });

  it('2: expect getSavedAction becalled', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet(`${settings.SAVED_BASE_API_DOMAIN}`).reply(200, mockSavedData);

    const { getByTestId } = render(
      <redux.Provider store={store}>
        <PropertyList type="saved" />
      </redux.Provider>,
    );

    await waitFor(() => getByTestId('property'));

    expect(getByTestId('property')).toBeInTheDocument();
  });

  it('3: expect results button onclick event', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet(`${settings.RESULTS_BASE_API_DOMAIN}`).reply(200, mockResultsData);
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    const { getByTestId } = render(
      <redux.Provider store={store}>
        <PropertyList type="results" />
      </redux.Provider>,
    );
    await waitFor(() => getByTestId('test'));
    fireEvent.click(getByTestId('test'));
    expect(mockDispatchFn).toBeCalled();
  });
});
