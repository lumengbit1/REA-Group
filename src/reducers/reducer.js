import { handleActions } from 'redux-actions';
import { produce } from 'immer';
import { normalize, schema } from 'normalizr';
import { remove } from 'lodash';
import {
  get_successed,
  get_failed,
  get,
  get_loading,
  add_property,
  remove_property,
} from './actions';

const initialState = {
  results: [],
  saved: [],
  data: {},
  errors: {},
  loading: undefined,
};

const reducer = handleActions(
  {
    [get]: (state) => state,
    [get_loading]: (state, action) => produce(state, (draft) => {
      draft.loading = action.payload.data;
    }),
    [get_successed]: (state, action) => produce(state, (draft) => {
      const results = new schema.Entity('results');
      const saved = new schema.Entity('saved');
      const value = {
        results: [results],
        saved: [saved]
      };
      const normalizedData = normalize(action.payload.data, value);

      draft.data = {...draft.data, ...normalizedData.entities.results, ...normalizedData.entities.saved}
      draft.results = normalizedData.result.results;
      draft.saved = normalizedData.result.saved;
    }),
    [get_failed]: (state, action) => produce(state, (draft) => { draft.errors = action.payload.data; }),
    [add_property]: (state, action) => produce(state, (draft) => {
      remove(draft.results, (n)=>n === action.payload);

      draft.saved.push(action.payload);
    }),
    [remove_property]: (state, action) => produce(state, (draft) => {
      remove(draft.saved, (n)=>n === action.payload);

      draft.results.push(action.payload);
    }),
  },
  initialState,
);

export default reducer;
