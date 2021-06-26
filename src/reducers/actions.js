import axios from 'axios';
import { createAction } from 'redux-actions';
import settings from '../settings';

export const get_results = createAction('GET_RESULTS_REQUEST');

export const saved_loading = createAction('SAVED_LOADING', (loading) => loading);

export const results_loading = createAction('RESULTS_LOADING', (loading) => loading);

export const get_saved = createAction('GET_SAVED_REQUEST');

export const get_results_successed = createAction('GET_RESULTS_RESOLVED');

export const get_saved_successed = createAction('GET_SAVED_RESOLVED');

export const get_failed = createAction('GET_REJECTED');

export const add_property = createAction('ADD_PROPERTY', (params) => params);

export const remove_property = createAction('REMOVE_PROPERTY', (params) => params);

export const getResultsAction = () => (dispatch) => {
  dispatch(get_results());
  dispatch(results_loading(true));

  return axios.get(`${settings.RESULTS_BASE_API_DOMAIN}`)
    .then((response) => {
      dispatch(results_loading(false));
      return dispatch(get_results_successed(response));
    })
    .catch((error) => dispatch(get_failed(error)));
};

export const getSavedAction = () => (dispatch) => {
  dispatch(get_saved());
  dispatch(saved_loading(true));

  return axios.get(`${settings.SAVED_BASE_API_DOMAIN}`)
    .then((response) => {
      dispatch(saved_loading(false));
      return dispatch(get_saved_successed(response));
    })
    .catch((error) => dispatch(get_failed(error)));
};
