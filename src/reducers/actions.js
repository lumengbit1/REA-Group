import axios from 'axios';
import { createAction } from 'redux-actions';

export const get = createAction('GET_REQUEST');

export const get_loading = createAction('GET_LOADING', (params) => ({
  data: params,
}));

export const get_successed = createAction('GET_RESOLVED', (params) => ({
  data: params,
}));

export const get_failed = createAction('GET_REJECTED', (params) => ({
  data: params,
}));

export const add_property = createAction('ADD_PROPERTY');

export const remove_property = createAction('REMOVE_PROPERTY');

export const getAction = (params) => (dispatch) => {
  dispatch(get());
  dispatch(get_loading(true));

  if (!params) {
    dispatch(get_failed('please fill in the correct type'));
    return null;
  }

  return axios.get(`${params}`)
    .then((response) => {
      dispatch(get_loading(false));
      return dispatch(get_successed(response.data));
    })
    .catch((error) => dispatch(get_failed(error)));
};
