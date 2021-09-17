import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import { produce, current } from 'immer';
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
    [saved_loading]: (state, action) => produce(state, draft => {draft.loading.saved = action.payload}),
    [results_loading]: (state, action) => produce(state, draft => {draft.loading.results = action.payload}),
    [get_results_successed]: (state, action) => produce(state, draft => {draft.results = action.payload.data}),
    [get_saved_successed]: (state, action) => produce(state, draft => {draft.saved = action.payload.data}),
    [get_failed]: (state, action) => produce(state, draft => {draft.errors = action.payload.data}),
    [add_property]: (state, action) => produce(state, draft => {
      const selectedData = draft.results.find((item) => item.id === action.payload);

      if (draft.saved.find((item) => item.id === selectedData.id)) {
        return;
      }

      draft.saved.push(selectedData);
    }),
    [remove_property]: (state, action) => produce(state, draft => {
      const selectedData = draft.saved.find((item) => item.id === action.payload);

      draft.saved = draft.saved.filter((val) => val.id !== selectedData.id);
    }),
  },
  initialState,
);

export default reducer;
