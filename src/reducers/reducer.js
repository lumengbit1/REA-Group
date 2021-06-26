import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import {
  get_results_successed,
  get_saved_successed,
  get_failed,
  get_results,
  get_saved,
  saved_loading,
  results_loading,
  add_property,
  remove_property,
} from './actions';

const initialState = fromJS({
  results: [],
  saved: [],
  errors: {},
  loading: {
    saved: undefined,
    results: undefined,
  },
});

const reducer = handleActions(
  {
    [get_results]: (state) => state,
    [get_saved]: (state) => state,
    [saved_loading]: (state, action) => {
      const records = fromJS(action.payload);
      return state.setIn(['loading', 'saved'], records);
    },
    [results_loading]: (state, action) => {
      const records = fromJS(action.payload);
      return state.setIn(['loading', 'results'], records);
    },
    [get_results_successed]: (state, action) => {
      const records = fromJS(action.payload.data);
      return state.set('results', records);
    },
    [get_saved_successed]: (state, action) => {
      const records = fromJS(action.payload.data);
      return state.set('saved', records);
    },
    [get_failed]: (state, action) => {
      const errors = fromJS(action.payload.data);
      return state.set('errors', errors);
    },
    [add_property]: (state, action) => {
      const selectedData = state.get('results').find((item) => item.get('id') === action.payload);

      if (state.get('saved').find((item) => item.get('id') === selectedData.get('id'))) {
        return state;
      }

      return state.update('saved', (val) => val.push(selectedData));
    },
    [remove_property]: (state, action) => {
      const selectedData = state.get('saved').find((item) => item.get('id') === action.payload);

      return state.update('saved', (item) => item.filter((val) => val.get('id') !== selectedData.get('id')));
    },
  },
  initialState,
);

export default reducer;
