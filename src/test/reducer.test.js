import React from 'react'
import { fromJS } from 'immutable';
import reducer from './../reducers/reducer'

const initialState = fromJS({
  location: [],
  weather: {},
  errors: {},
  loading: {
    weather: undefined,
    location: undefined,
  },
});

describe('Test reducer', () => {
  it('1.should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('2.should handle get_location_successed', () => {
    const payload = {
      data: ['test1', 'test2']
    };

    const expectedState = fromJS({
      location: ['test1', 'test2'],
      weather: {},
      errors: {},
      loading: {
        weather: undefined,
        location: undefined,
      },
    });

    expect(
      reducer(initialState, {
        type: 'GET_LOCATION_RESOLVED',
        payload
      })
    ).toEqual(expectedState);
  })

  it('3.should handle get_weather_successed', () => {
    const payload = {
      data: { test: 'test' }
    };

    const expectedState = fromJS({
      location: [],
      weather: { test: 'test' },
      errors: {},
      loading: {
        weather: undefined,
        location: undefined,
      },
    });

    expect(
      reducer(initialState, {
        type: 'GET_WEATHER_RESOLVED',
        payload
      })
    ).toEqual(expectedState);
  })

  it('4.should handle get_location', () => {
    expect(
      reducer(initialState, {
        type: 'GET_LOCATION_REQUEST',
      })
    ).toEqual(initialState);
  })

  it('5.should handle get_weather', () => {
    expect(
      reducer(initialState, {
        type: 'GET_WEATHER_REQUEST',
      })
    ).toEqual(initialState);
  })

  it('6.should handle clear_data', () => {
    const changedState = fromJS({
      location: ['test1', 'test2'],
      weather: { test: 'test' },
      errors: {},
      loading: {
        weather: undefined,
        location: undefined,
      },
    });

    expect(
      reducer(changedState, {
        type: 'CLEAR_DATA',
      })
    ).toEqual(initialState);
  })

  it('7.should handle get_failed', () => {
    const payload = {
      data: { error: 'error' }
    };

    const expectedState = fromJS({
      location: [],
      weather: {},
      errors: { error: 'error' },
      loading: {
        weather: undefined,
        location: undefined,
      },
    });
    expect(
      reducer(initialState, {
        type: 'GET_REJECTED',
        payload
      })
    ).toEqual(expectedState);
  })

  it('8.should handle weather_loading', () => {
    const payload = true;

    const expectedState = fromJS({
      location: [],
      weather: {},
      errors: {},
      loading: {
        weather: true,
        location: undefined,
      },
    });
    expect(
      reducer(initialState, {
        type: 'WEATHER_LOADING',
        payload
      })
    ).toEqual(expectedState);
  })

  it('9.should handle location_loading', () => {
    const payload = true;

    const expectedState = fromJS({
      location: [],
      weather: {},
      errors: {},
      loading: {
        weather: undefined,
        location: true,
      },
    });
    expect(
      reducer(initialState, {
        type: 'LOCATION_LOADING',
        payload
      })
    ).toEqual(expectedState);
  })
})
