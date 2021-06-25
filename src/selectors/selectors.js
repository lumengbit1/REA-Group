import { createSelector } from 'reselect';

export function getLocationSelector(state) {
  return state.getIn(['value', 'location']);
}

export function getWeatherSelector(state) {
  return state.getIn(['value', 'weather']);
}

export function getWeatherLoadingSelector(state) {
  return state.getIn(['value', 'loading', 'weather']);
}

export function getLocationLoadingSelector(state) {
  return state.getIn(['value', 'loading', 'location']);
}

export function makeLocationSelector() {
  return createSelector(
    [getLocationSelector],
    (records) => records,
  );
}

export function makeWeatherSelector() {
  return createSelector(
    [getWeatherSelector],
    (records) => records,
  );
}

export function makeWeatherLoadingSelector() {
  return createSelector(
    [getWeatherLoadingSelector],
    (records) => records,
  );
}

export function makeLocationLoadingSelector() {
  return createSelector(
    [getLocationLoadingSelector],
    (records) => records,
  );
}
