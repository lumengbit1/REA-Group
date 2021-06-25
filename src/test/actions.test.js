import React from 'react';
import axios from 'axios';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import queryString from 'query-string';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import * as actions from '../reducers/actions';
import settings from '../settings';

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

describe('actions testing', () => {
  it('1.get_location testing', () => {
    const expectedAction = {
      type: 'GET_LOCATION_REQUEST',
    };
    expect(actions.get_location()).toEqual(expectedAction);
  });

  it('2.get_location_successed testing', () => {
    const expectedAction = {
      type: 'GET_LOCATION_RESOLVED',
    };
    expect(actions.get_location_successed()).toEqual(expectedAction);
  });

  it('3.get_weather testing', () => {
    const expectedAction = {
      type: 'GET_WEATHER_REQUEST',
    };
    expect(actions.get_weather()).toEqual(expectedAction);
  });

  it('4.get_weather_successed testing', () => {
    const expectedAction = {
      type: 'GET_WEATHER_RESOLVED',
    };
    expect(actions.get_weather_successed()).toEqual(expectedAction);
  });

  it('5.get_failed functionality testing', () => {
    const expectedAction = {
      type: 'GET_REJECTED',
    };
    expect(actions.get_failed()).toEqual(expectedAction);
  });

  it('6.clear_data functionality testing', () => {
    const expectedAction = {
      type: 'CLEAR_DATA',
    };
    expect(actions.clear_data()).toEqual(expectedAction);
  });

  it('7.weather_loading functionality testing', () => {
    const expectedAction = {
      type: 'WEATHER_LOADING',
    };
    expect(actions.weather_loading()).toEqual(expectedAction);
  });

  it('8.location_loading functionality testing', () => {
    const expectedAction = {
      type: 'LOCATION_LOADING',
    };
    expect(actions.location_loading()).toEqual(expectedAction);
  });
});

describe('async actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('1.creates GET_LOCATION_RESOLVED when getting location has been done', () => {
    mock.onGet(locationUrl(mockLocation)).reply(200, { response: [{ item: 'item1' }, { item: 'item2' }] });

    const expectedActions = [
      { type: 'GET_LOCATION_REQUEST' },
      { type: 'LOCATION_LOADING' },
      {
        type: 'GET_LOCATION_RESOLVED',
        payload: [{ item: 'item1' }, { item: 'item2' }],
      },
    ];

    return store.dispatch(actions.getLocationAction()).then((res) => {
      expect(store.getActions()).toEqual(expectedActions);

      return res;
    }).catch((err) => err);
  });

  it('2.creates GET_WEATHER_RESOLVED when getting weather has been done', () => {
    mock.onGet(weatherUrl(mockLatitude, mockLongitude)).reply(200, { response: [{ item: 'item1' }, { item: 'item2' }] });

    const expectedActions = [
      { type: 'GET_WEATHER_REQUEST' },
      { type: 'WEATHER_LOADING' },
      {
        type: 'GET_WEATHER_RESOLVED',
        payload: [{ item: 'item1' }, { item: 'item2' }],
      },
    ];

    return store.dispatch(actions.getLocationAction()).then((res) => {
      expect(store.getActions()).toEqual(expectedActions);

      return res;
    }).catch((err) => err);
  });

  it('3.creates GET_REJECTED when fetching location faiture', () => {
    mock.onGet(locationUrl(mockLocation)).reply(404);

    return store.dispatch(actions.getLocationAction()).then(() => expect(store.getActions()).rejects);
  });

  it('4.creates GET_REJECTED when fetching weather faiture', () => {
    mock.onGet(weatherUrl(mockLatitude, mockLongitude)).reply(404);

    return store.dispatch(actions.getWeatherAction()).then(() => expect(store.getActions()).rejects);
  });
});
