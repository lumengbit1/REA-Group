import { fromJS } from 'immutable';
import reducer from '../reducers/reducer';

const initialState = fromJS({
  results: [],
  saved: [],
  errors: {},
  loading: {
    saved: undefined,
    results: undefined,
  },
});

describe('Test reducer', () => {
  it('1.should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('2.should handle get_results_successed', () => {
    const payload = {
      data: ['test1', 'test2'],
    };

    const expectedState = fromJS({
      results: ['test1', 'test2'],
      saved: [],
      errors: {},
      loading: {
        saved: undefined,
        results: undefined,
      },
    });

    expect(
      reducer(initialState, {
        type: 'GET_RESULTS_RESOLVED',
        payload,
      }),
    ).toEqual(expectedState);
  });

  it('3.should handle get_saved_successed', () => {
    const payload = {
      data: [{ test: 'test' }],
    };

    const expectedState = fromJS({
      results: [],
      saved: [{ test: 'test' }],
      errors: {},
      loading: {
        saved: undefined,
        results: undefined,
      },
    });

    expect(
      reducer(initialState, {
        type: 'GET_SAVED_RESOLVED',
        payload,
      }),
    ).toEqual(expectedState);
  });

  it('4.should handle get_results', () => {
    expect(
      reducer(initialState, {
        type: 'GET_RESULTS_REQUEST',
      }),
    ).toEqual(initialState);
  });

  it('5.should handle get_saved', () => {
    expect(
      reducer(initialState, {
        type: 'GET_SAVED_REQUEST',
      }),
    ).toEqual(initialState);
  });

  it('6.should handle get_failed', () => {
    const payload = {
      data: 'error',
    };

    const expectedState = fromJS({
      results: [],
      saved: [],
      errors: 'error',
      loading: {
        saved: undefined,
        results: undefined,
      },
    });
    expect(
      reducer(initialState, {
        type: 'GET_REJECTED',
        payload,
      }),
    ).toEqual(expectedState);
  });

  it('7.should handle saved_loading', () => {
    const payload = true;

    const expectedState = fromJS({
      results: [],
      saved: [],
      errors: {},
      loading: {
        saved: true,
        results: undefined,
      },
    });
    expect(
      reducer(initialState, {
        type: 'SAVED_LOADING',
        payload,
      }),
    ).toEqual(expectedState);
  });

  it('8.should handle results_loading', () => {
    const payload = true;

    const expectedState = fromJS({
      results: [],
      saved: [],
      errors: {},
      loading: {
        saved: undefined,
        results: true,
      },
    });
    expect(
      reducer(initialState, {
        type: 'RESULTS_LOADING',
        payload,
      }),
    ).toEqual(expectedState);
  });

  it('9.should handle add_property', () => {
    const initialStateAdd = fromJS({
      results: [{ id: 1 }],
      saved: [],
      errors: {},
      loading: {
        saved: undefined,
        results: undefined,
      },
    });
    const payload = 1;

    const expectedState = fromJS({
      results: [{ id: 1 }],
      saved: [{ id: 1 }],
      errors: {},
      loading: {
        saved: undefined,
        results: undefined,
      },
    });
    expect(
      reducer(initialStateAdd, {
        type: 'ADD_PROPERTY',
        payload,
      }),
    ).toEqual(expectedState);
  });

  it('10.should handle remove_property', () => {
    const initialStateAdd = fromJS({
      results: [{ id: 1 }],
      saved: [{ id: 1 }],
      errors: {},
      loading: {
        saved: undefined,
        results: undefined,
      },
    });
    const payload = 1;

    const expectedState = fromJS({
      results: [{ id: 1 }],
      saved: [],
      errors: {},
      loading: {
        saved: undefined,
        results: undefined,
      },
    });
    expect(
      reducer(initialStateAdd, {
        type: 'REMOVE_PROPERTY',
        payload,
      }),
    ).toEqual(expectedState);
  });

  it('11.add_property repeat added', () => {
    const initialStateAdd = fromJS({
      results: [{ id: 1 }],
      saved: [{ id: 1 }],
      errors: {},
      loading: {
        saved: undefined,
        results: undefined,
      },
    });
    const payload = 1;

    const expectedState = fromJS({
      results: [{ id: 1 }],
      saved: [{ id: 1 }],
      errors: {},
      loading: {
        saved: undefined,
        results: undefined,
      },
    });
    expect(
      reducer(initialStateAdd, {
        type: 'ADD_PROPERTY',
        payload,
      }),
    ).toEqual(expectedState);
  });
});
