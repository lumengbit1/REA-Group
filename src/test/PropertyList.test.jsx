import React from 'react';
import 'jest-styled-components';
import '@testing-library/jest-dom';
import * as redux from 'react-redux';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import PropertyList from '../components/PropertyList';
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
  rest.get(settings.BASE_API_DOMAIN, (req, res, ctx) => res(ctx.json(mockResultsData))),
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

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
    const { getByTestId } = render(
      <redux.Provider store={store}>
        <PropertyList type="results" />
      </redux.Provider>,
    );

    await waitFor(() => getByTestId('property'));

    expect(getByTestId('property')).toBeInTheDocument();
  });

  it('2: expect getSavedAction becalled', async () => {
    server.use(
      rest.get(settings.SAVED_BASE_API_DOMAIN, (req, res, ctx) => res(ctx.json(mockSavedData))),
    );

    const { getByTestId } = render(
      <redux.Provider store={store}>
        <PropertyList type="saved" />
      </redux.Provider>,
    );

    await waitFor(() => getByTestId('property'));

    expect(getByTestId('property')).toBeInTheDocument();
  });

  it('3: expect results button onclick event', async () => {
    const resultScreen = render(
      <redux.Provider store={store}>
        <PropertyList type="results" />
      </redux.Provider>,
    );

    const savedScreen = render(
      <redux.Provider store={store}>
        <PropertyList type="saved" />
      </redux.Provider>,
    );
    await waitFor(() => resultScreen.getByText('$726,500'));
    fireEvent.click(resultScreen.getByTestId('testresults'));
    expect(savedScreen.getByText('$726,500')).toBeTruthy();
  });

  it('4: expect saved button onclick event', async () => {
    server.use(
      rest.get(settings.SAVED_BASE_API_DOMAIN, (req, res, ctx) => res(ctx.json(mockSavedData))),
    );

    const savedScreen = render(
      <redux.Provider store={store}>
        <PropertyList type="saved" />
      </redux.Provider>,
    );
    await waitFor(() => savedScreen.getByText('$526,500'));
    fireEvent.click(savedScreen.getByTestId('testsaved'));
    expect(savedScreen.container.querySelector('testsaved')).not.toBeInTheDocument();
  });

  it('5: expect get result failed', async () => {
    server.use(
      rest.get(settings.BASE_API_DOMAIN, (req, res, ctx) => res(ctx.status(500), ctx.json({ message: 'Internal Server Error' }))),
    );

    const { getByTestId } = render(
      <redux.Provider store={store}>
        <PropertyList type="results" />
      </redux.Provider>,
    );

    await waitFor(() => getByTestId('loading'));

    expect(getByTestId('loading')).toBeInTheDocument();
  });

  it('6: expect get saved failed', async () => {
    server.use(
      rest.get(settings.SAVED_BASE_API_DOMAIN, (req, res, ctx) => res(ctx.status(500), ctx.json({ message: 'Internal Server Error' }))),
    );

    const { getByTestId } = render(
      <redux.Provider store={store}>
        <PropertyList type="saved" />
      </redux.Provider>,
    );

    await waitFor(() => getByTestId('loading'));

    expect(getByTestId('loading')).toBeInTheDocument();
  });

  it('7: expect get repeat', async () => {
    server.use(
      rest.get(settings.SAVED_BASE_API_DOMAIN, (req, res, ctx) => res(ctx.json(mockResultsData))),
    );

    const resultScreen = render(
      <redux.Provider store={store}>
        <PropertyList type="results" />
      </redux.Provider>,
    );

    const savedScreen = render(
      <redux.Provider store={store}>
        <PropertyList type="saved" />
      </redux.Provider>,
    );
    await waitFor(() => resultScreen.getByTestId('testresults'));
    fireEvent.click(resultScreen.getByTestId('testresults'));
    expect(savedScreen.container.firstChild.childNodes).toHaveLength(4);
  });
});
