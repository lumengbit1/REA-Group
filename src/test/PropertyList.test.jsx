import axios from 'axios';
import React from 'react';
import 'jest-styled-components';
import '@testing-library/jest-dom';
import * as redux from 'react-redux';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import PropertyList from '../components/PropertyList';
import reducer from '../reducers';
import settings from '../settings';

const store = createStore(reducer, applyMiddleware(thunk));

const mockData = {
  "results": [
    {
      "price": "$726,500",
      "agency": {
        "brandingColors": {
          "primary": "#ffe512"
        },
        "logo": "https://i1.au.reastatic.net/170x32/d9e65c666e427e655fb63dcfe73f50d4ac7ff9a58c173db9474bd92e75b01070/main.gif"
      },
      "id": "1",
      "mainImage": "https://i2.au.reastatic.net/640x480/20bfc8668a30e8cabf045a1cd54814a9042fc715a8be683ba196898333d68cec/main.jpg"
    }
  ],
  "saved": [
    {
      "price": "$526,500",
      "agency": {
        "brandingColors": {
          "primary": "#000000"
        },
        "logo": "https://i2.au.reastatic.net/170x32/3015ba9710c7e3ddc2ac30f45fd7906df5b04e442a7f6948f75a6029b8b871e2/main.gif"
      },
      "id": "4",
      "mainImage": "https://i2.au.reastatic.net/640x480/5e84d96722dda3ea2a084d6935677f64872d1d760562d530c3cabfcb7bcda9c2/main.jpg"
    }
  ]
}

const server = setupServer(
  rest.get(settings.BASE_API_DOMAIN, (req, res, ctx) => res(ctx.json(mockData))),
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe('Render Test', () => {
  it('1: expect rendering correct', () => {
    const { container } = render(
      <redux.Provider store={store}>
        <PropertyList />
      </redux.Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});

describe('Function Test', () => {
  it('1: expect getAction becalled', async () => {
    const { getAllByTestId } = render(
      <redux.Provider store={store}>
        <PropertyList />
      </redux.Provider>,
    );

    await waitFor(() => getAllByTestId('property'));

    expect(getAllByTestId('property').length).toBe(2);
  });

  it('2: expect results button onclick event', async () => {
    const screen = render(
      <redux.Provider store={store}>
        <PropertyList />
      </redux.Provider>,
    );

    await waitFor(() => screen.getByText('$726,500'));

    expect(screen.getAllByTestId('Add Property').length).toBe(1);
    expect(screen.getAllByTestId('Remove Property').length).toBe(1);

    fireEvent.click(screen.getByTestId('Add Property'));

    expect(screen.getAllByTestId('Remove Property').length).toBe(2);
  });

  it('3: expect saved button onclick event', async () => {
    const screen = render(
      <redux.Provider store={store}>
        <PropertyList />
      </redux.Provider>,
    );
    await waitFor(() => screen.getByText('$526,500'));

    expect(screen.getAllByTestId('Add Property').length).toBe(1);
    expect(screen.getAllByTestId('Remove Property').length).toBe(1);

    fireEvent.click(screen.getByTestId('Remove Property'));

    expect(screen.getAllByTestId('Add Property').length).toBe(2);
  });

  it('4: expect get failed', async () => {
    server.use(
      rest.get(settings.BASE_API_DOMAIN, (req, res, ctx) => res(ctx.status(500), ctx.json({ message: 'Internal Server Error' }))),
    );

    const { getByTestId } = render(
      <redux.Provider store={store}>
        <PropertyList />
      </redux.Provider>,
    );

    await waitFor(() => getByTestId('loading'));

    expect(getByTestId('loading')).toBeInTheDocument();
  });
});
