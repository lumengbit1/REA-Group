import { handleActions } from 'redux-actions';
import { produce } from 'immer';
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
  errors: {},
  loading: {
    saved: undefined,
    results: undefined,
  },
};

const reducer = handleActions(
  {
    [get]: (state) => state,
    [get_loading]: (state, action) => produce(state, (draft) => {
      draft.loading[action.payload.type] = action.payload.data;
    }),
    [get_successed]: (state, action) => produce(state, (draft) => {
      draft[action.payload.type] = action.payload.data;
    }),
    [get_failed]: (state, action) => produce(state, (draft) => { draft.errors = action.payload.data; }),
    [add_property]: (state, action) => produce(state, (draft) => {
      const selectedData = draft.results.find((item) => item.id === action.payload);

      if (draft.saved.find((item) => item.id === selectedData.id)) {
        return;
      }

      draft.saved.push(selectedData);
    }),
    [remove_property]: (state, action) => produce(state, (draft) => {
      const selectedData = draft.saved.find((item) => item.id === action.payload);

      draft.saved = draft.saved.filter((val) => val.id !== selectedData.id);
    }),
  },
  initialState,
);

export default reducer;
