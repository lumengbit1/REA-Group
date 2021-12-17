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
  result: {
    results: [],
    saved: [],
  },
  entities: {},
  errors: {},
  loading: undefined,
};

const getReducer = handleActions(
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
        saved: [saved],
      };
      const normalizedData = normalize(action.payload.data, value);

      draft.entities = { ...draft.entities, ...normalizedData.entities.results, ...normalizedData.entities.saved };
      draft.result.results = normalizedData.result.results;
      draft.result.saved = normalizedData.result.saved;
    }),
    [get_failed]: (state, action) => produce(state, (draft) => { draft.errors = action.payload.data; }),
    [add_property]: (state, action) => produce(state, (draft) => {
      remove(draft.result.results, (n) => n === action.payload);

      draft.result.saved.push(action.payload);
    }),
    [remove_property]: (state, action) => produce(state, (draft) => {
      remove(draft.result.saved, (n) => n === action.payload);

      draft.result.results.push(action.payload);
    }),
  },
  initialState,
);

export default getReducer;
