import axios from 'axios';
import { createAction } from 'redux-actions';
import queryString from 'query-string';
import _ from 'lodash';
import settings from '../settings';

export const get_location = createAction('GET_LOCATION_REQUEST');

export const weather_loading = createAction('WEATHER_LOADING', (loading) => loading);

export const location_loading = createAction('LOCATION_LOADING', (loading) => loading);

export const get_weather = createAction('GET_WEATHER_REQUEST');

export const get_location_successed = createAction('GET_LOCATION_RESOLVED');

export const get_weather_successed = createAction('GET_WEATHER_RESOLVED');

export const clear_data = createAction('CLEAR_DATA');

export const get_failed = createAction('GET_REJECTED');

export const getLocationAction = (location, params) => (dispatch) => {
  dispatch(get_location());
  dispatch(location_loading(true));

  return axios.get(`${settings.LOCATIONIQ_BASE_API_DOMAIN}?${queryString.stringify(_.assign({ q: location, key: settings.LOCATIONIQ_KEY, format: 'json' }, params))}`)
    .then((response) => {
      dispatch(location_loading(false));
      return dispatch(get_location_successed(response));
    })
    .catch((error) => dispatch(get_failed(error)));
};

export const getWeatherAction = (latitude, longitude, params) => (dispatch) => {
  dispatch(get_weather());
  dispatch(weather_loading(true));

  return axios.get(`${settings.OPEN_WEATHER_MAP_BASE_API_DOMAIN}?${queryString.stringify(_.assign({ lat: latitude, lon: longitude, appid: settings.OPEN_WEATHER_MAP_KEY, units: 'metric', exclude: 'current,minutely,hourly' }, params))}`)
    .then((response) => {
      dispatch(weather_loading(false));
      return dispatch(get_weather_successed(response));
    })
    .catch((error) => dispatch(get_failed(error)));
};
