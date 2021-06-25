import { handleActions } from 'redux-actions';
import { fromJS, List, Map } from 'immutable';
import {
  get_location_successed,
  get_weather_successed,
  get_failed,
  clear_data,
  get_location,
  get_weather,
  weather_loading,
  location_loading,
} from './actions';

const initialState = fromJS({
  location: [],
  weather: {},
  errors: {},
  loading: {
    weather: undefined,
    location: undefined,
  },
});

const reducer = handleActions(
  {
    [get_location]: (state) => state,
    [get_weather]: (state) => state,
    [weather_loading]: (state, action) => {
      const records = fromJS(action.payload);
      return state.setIn(['loading', 'weather'], records);
    },
    [location_loading]: (state, action) => {
      const records = fromJS(action.payload);
      return state.setIn(['loading', 'location'], records);
    },
    [get_location_successed]: (state, action) => {
      const records = fromJS(action.payload.data);
      return state.set('location', records);
    },
    [get_weather_successed]: (state, action) => {
      const records = fromJS(action.payload.data);
      return state.set('weather', records);
    },
    [get_failed]: (state, action) => {
      const errors = fromJS(action.payload.data);
      return state.set('errors', errors);
    },
    [clear_data]: (state) => state.set('location', List()).set('weather', Map()),
  },
  initialState,
);

export default reducer;
