import reducer from '../reducers';

const initialState = {
  result: {
    results: [],
    saved: [],
  },
  entities: {},
  errors: {},
  loading: undefined,
};

describe('Test reducer', () => {
  it('1.should return the initial state', () => {
    expect(reducer(undefined, {}).reducer).toEqual(initialState);
  });

  it('2.should handle get_successed', () => {
    const payload = {
      data: {
        results: [{id: 1, price: 1}],
        saved: [{id: 2, price: 2}],
      },
    };

    const expectedState = {
      result: {
        results: [1],
        saved: [2],
      },
      entities: {
        '1': {id: 1, price: 1},
        '2': {id: 2, price: 2},
      },
      errors: {},
      loading: undefined,
    };

    expect(
      reducer(initialState, {
        type: 'GET_RESOLVED',
        payload,
      }).reducer
    ).toEqual(expectedState);
  });

  it('3.should handle get', () => {
    expect(
      reducer(initialState, {
        type: 'GET_REQUEST',
      }).reducer,
    ).toEqual(initialState);
  });

  it('4.should handle get_failed', () => {
    const payload = {
      data: 'error',
    };

    const expectedState = {
      result: {
        results: [],
        saved: [],
      },
      entities: {},
      errors: 'error',
      loading: undefined,
    };

    expect(
      reducer(initialState, {
        type: 'GET_REJECTED',
        payload,
      }).reducer,
    ).toEqual(expectedState);
  });

  it('5.should handle saved_loading', () => {
    const payload = {
      data: true,
    };

    const expectedState = {
      result: {
        results: [],
        saved: [],
      },
      entities: {},
      errors: {},
      loading: true,
    };

    expect(
      reducer(initialState, {
        type: 'GET_LOADING',
        payload,
      }).reducer,
    ).toEqual(expectedState);
  });

  it('6.should handle add_property', () => {
    const initialStateAdd = {
      result: {
        results: [1],
        saved: [2],
      },
      entities: {
        '1': {id: 1, price: 1},
        '2': {id: 2, price: 2},
      },
      errors: {},
      loading: undefined,
    };

    const payload = 1;

    const expectedState = {
      result: {
        results: [],
        saved: [1],
      },
      entities: {},
      errors: {},
      loading: undefined,
    };

    expect(
      reducer(initialState, {
        type: 'ADD_PROPERTY',
        payload,
      }).reducer,
    ).toEqual(expectedState);
  });

  it('7.should handle remove_property', () => {
    const payload = 2;

    const expectedState = {
      result: {
        results: [2],
        saved: [],
      },
      entities: {},
      errors: {},
      loading: undefined,
    };

    expect(
      reducer(initialState, {
        type: 'REMOVE_PROPERTY',
        payload,
      }).reducer,
    ).toEqual(expectedState);
  });
});
