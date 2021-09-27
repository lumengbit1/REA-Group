import axios from 'axios';
import { createAction } from 'redux-actions';

export const get = createAction('GET_REQUEST', (type) => ({
  type,
}));

export const get_loading = createAction('GET_LOADING', (type, params) => ({
  type,
  data: params,
}));

export const get_successed = createAction('GET_RESOLVED', (type, params) => ({
  type,
  data: params,
}));

export const get_failed = createAction('GET_REJECTED', (type, params) => ({
  type,
  data: params,
}));

export const add_property = createAction('ADD_PROPERTY');

export const remove_property = createAction('REMOVE_PROPERTY');

export const getAction = (type, params) => (dispatch) => {
  dispatch(get(type));
  dispatch(get_loading(type, true));

  if (!type || !params) {
    dispatch(get_failed('please fill in the correct type'));
    return null;
  }

  return axios.get(`${params}`)
    .then((response) => {
      dispatch(get_loading(type, false));
      return dispatch(get_successed(type, response.data));
    })
    .catch((error) => dispatch(get_failed(error)));
};
