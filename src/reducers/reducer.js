import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import { produce } from 'immer';
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

const initialState = {
  results: [],
  saved: [],
  errors: {},
  loading: {
    saved: undefined,
    results: undefined,
  },
};

const reducer = handleActions(
  {
    [get_results]: (state) => state,
    [get_saved]: (state) => state,
    [saved_loading]: (state, action) => {
      const nextState = produce(state, draft => {
        draft.loading.saved = action.payload;
      });
      return nextState;
    },
    [results_loading]: (state, action) => {
      const nextState = produce(state, draft => {
        draft.loading.results = action.payload;
      });
      return nextState;
    },
    [get_results_successed]: (state, action) => {
      const nextState = produce(state, draft => {
        draft.results = action.payload.data;
      });
      return nextState;
    },
    [get_saved_successed]: (state, action) => {
      const nextState = produce(state, draft => {
        draft.saved = action.payload.data;
      });
      return nextState;
    },
    [get_failed]: (state, action) => {
      const nextState = produce(state, draft => {
        draft.errors = action.payload.data;
      });
      return nextState;
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
