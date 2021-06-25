import React from 'react';
import axios from 'axios';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import queryString from 'query-string';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { fromJS } from 'immutable';
import * as actions from '../reducers/actions';
import settings from '../settings';
import {
  makeLocationSelector,
  makeWeatherSelector,
  getLocationSelector,
  getWeatherSelector,
  getWeatherLoadingSelector,
  getLocationLoadingSelector,
  makeWeatherLoadingSelector,
  makeLocationLoadingSelector,
} from '../selectors/selectors';

Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockLocation = 'Melbourne, Australia';
const mockLatitude = '-37.8141705';
const mockLongitude = '144.9655616';
const locationUrl = (location) => `${settings.LOCATIONIQ_BASE_API_DOMAIN}?${queryString.stringify({ q: location, key: settings.LOCATIONIQ_KEY, format: 'json' })}`;
const weatherUrl = (latitude, longitude) => `${settings.OPEN_WEATHER_MAP_BASE_API_DOMAIN}?${queryString.stringify({ lat: latitude, lon: longitude, appid: settings.OPEN_WEATHER_MAP_KEY, units: 'metric', exclude: 'current,minutely,hourly' })}`;

const store = mockStore();
const mock = new MockAdapter(axios);

const initialState = fromJS({
  value: {
    location: ['test1', 'test2'],
    weather: { test: 'test' },
    errors: {},
    loading: {
      weather: undefined,
      location: undefined,
    },
  }
})

describe(`Test <App />`, () => {
  it('1.should return getLocationSelector state', () => {
    expect(getLocationSelector(initialState)).toEqual(initialState.get('value').get('location'));
  });

  it('2.should return getWeatherSelector state', () => {
    expect(getWeatherSelector(initialState)).toEqual(initialState.get('value').get('weather'));
  });

  it('3.should return getWeatherLoadingSelector state', () => {
    expect(getWeatherLoadingSelector(initialState)).toEqual(initialState.get('value').get('loading').get('weather'));
  });

  it('4.should return getLocationLoadingSelector state', () => {
    expect(getLocationLoadingSelector(initialState)).toEqual(initialState.get('value').get('loading').get('location'));
  });

  it('5.should return makeLocationSelector state', () => {
    mock.onGet(locationUrl(mockLocation)).reply(200, { response: [{ item: 'item1' }, { item: 'item2' }] });

    const expectedActions = [
      { type: 'GET_LOCATION_REQUEST' },
      {
        type: 'GET_LOCATION_RESOLVED',
        payload: [{ item: 'item1' }, { item: 'item2' }],
      },
    ];

    return store.dispatch(actions.getLocationAction()).then((res) => {
      expect(makeLocationSelector(initialState)).toEqual(initialState.get('value').get('location'));

      return res;
    }).catch((err) => err);
  });

  it('6.should return makeWeatherSelector state', () => {
    mock.onGet(weatherUrl(mockLatitude, mockLongitude)).reply(200, { response: [{ item: 'item1' }, { item: 'item2' }] });

    const expectedActions = [
      { type: 'GET_WEATHER_REQUEST' },
      {
        type: 'GET_WEATHER_RESOLVED',
        payload: [{ item: 'item1' }, { item: 'item2' }],
      },
    ];

    return store.dispatch(actions.getLocationAction()).then((res) => {
      expect(makeWeatherSelector(initialState)).toEqual(initialState.get('value').get('weather'));

      return res;
    }).catch((err) => err);
  });

  it('7.should return makeWeatherLoadingSelector state', () => {
    expect(makeWeatherLoadingSelector()(initialState)).toEqual(undefined);

    return store.dispatch(actions.getWeatherAction()).then((res) => {
      expect(makeWeatherLoadingSelector()(initialState)).toEqual(false);

      return res;
    }).catch((err) => err);
  });

  it('8.should return makeLocationLoadingSelector state', () => {
    expect(makeLocationLoadingSelector()(initialState)).toEqual(undefined);

    return store.dispatch(actions.getLocationAction()).then((res) => {
      expect(makeLocationLoadingSelector()(initialState)).toEqual(false);

      return res;
    }).catch((err) => err);
  });
})
