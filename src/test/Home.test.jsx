import React from 'react';
import 'jest-styled-components';
import '@testing-library/jest-dom';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import * as redux from 'react-redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render, waitFor, fireEvent, cleanup } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import Home from '../components/Home';
import eventList from '../reducers/reducer';
import settings from '../settings';

const store = createStore(combineReducers({ value: eventList }), applyMiddleware(thunk));

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

const server = setupServer(
  rest.get(settings.RESULTS_BASE_API_DOMAIN, (req, res, ctx) => res(ctx.json(mockResultsData))),
  rest.get(settings.SAVED_BASE_API_DOMAIN, (req, res, ctx) => res(ctx.json(mockSavedData))),
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

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
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();

    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const { getByTestId } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );
    await waitFor(() => getByTestId('filter'));
    fireEvent.click(getByTestId('filter'));
    expect(mockDispatchFn).toBeCalled();
  });

  it('2: expect input change event', async () => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();

    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const { getByTestId } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );

    await waitFor(() => getByTestId('input'));
    fireEvent.change(getByTestId('input'), { target: { value: '23' } });
    expect(getByTestId('input').value).toBe('$23');
  });
});

describe('total price function test', () => {
  it('1: expect total price return 0', async () => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();

    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );
    await waitFor(() => getByTestId('testsaved'));
    expect(getByText('$526,500')).toBeInTheDocument();
  });
});
