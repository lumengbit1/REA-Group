import axios from 'axios';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import * as actions from '../reducers/actions';
import settings from '../settings';

Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const reseltsUrl = () => `${settings.RESULTS_BASE_API_DOMAIN}`;
const savedUrl = () => `${settings.SAVED_BASE_API_DOMAIN}`;

const store = mockStore();
const mock = new MockAdapter(axios);

describe('actions testing', () => {
  it('1.get_results testing', () => {
    const expectedAction = {
      type: 'GET_RESULTS_REQUEST',
    };
    expect(actions.get_results()).toEqual(expectedAction);
  });

  it('2.get_results_successed testing', () => {
    const expectedAction = {
      type: 'GET_RESULTS_RESOLVED',
    };
    expect(actions.get_results_successed()).toEqual(expectedAction);
  });

  it('3.get_saved testing', () => {
    const expectedAction = {
      type: 'GET_SAVED_REQUEST',
    };
    expect(actions.get_saved()).toEqual(expectedAction);
  });

  it('4.get_saved_successed testing', () => {
    const expectedAction = {
      type: 'GET_SAVED_RESOLVED',
    };
    expect(actions.get_saved_successed()).toEqual(expectedAction);
  });

  it('5.get_failed functionality testing', () => {
    const expectedAction = {
      type: 'GET_REJECTED',
    };
    expect(actions.get_failed()).toEqual(expectedAction);
  });

  it('6.saved_loading functionality testing', () => {
    const expectedAction = {
      type: 'SAVED_LOADING',
    };
    expect(actions.saved_loading()).toEqual(expectedAction);
  });

  it('7.results_loading functionality testing', () => {
    const expectedAction = {
      type: 'RESULTS_LOADING',
    };
    expect(actions.results_loading()).toEqual(expectedAction);
  });

  it('8.add_property functionality testing', () => {
    const expectedAction = {
      type: 'ADD_PROPERTY',
    };
    expect(actions.add_property()).toEqual(expectedAction);
  });

  it('9.remove_property functionality testing', () => {
    const expectedAction = {
      type: 'REMOVE_PROPERTY',
    };
    expect(actions.remove_property()).toEqual(expectedAction);
  });
});

describe('async actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('1.creates GET_RESULTS_RESOLVED when getting results has been done', () => {
    mock.onGet(reseltsUrl()).reply(200, { response: [{ item: 'item1' }, { item: 'item2' }] });

    const expectedActions = [
      { type: 'GET_RESULTS_REQUEST' },
      { type: 'RESULTS_LOADING' },
      {
        type: 'GET_RESULTS_RESOLVED',
        payload: [{ item: 'item1' }, { item: 'item2' }],
      },
    ];

    return store.dispatch(actions.getResultsAction()).then((res) => {
      expect(store.getActions()).toEqual(expectedActions);

      return res;
    }).catch((err) => err);
  });

  it('2.creates GET_SAVED_RESOLVED when getting saved has been done', () => {
    mock.onGet(savedUrl()).reply(200, { response: [{ item: 'item1' }, { item: 'item2' }] });

    const expectedActions = [
      { type: 'GET_SAVED_REQUEST' },
      { type: 'SAVED_LOADING' },
      {
        type: 'GET_SAVED_RESOLVED',
        payload: [{ item: 'item1' }, { item: 'item2' }],
      },
    ];

    return store.dispatch(actions.getSavedAction()).then((res) => {
      expect(store.getActions()).toEqual(expectedActions);

      return res;
    }).catch((err) => err);
  });

  it('3.creates GET_REJECTED when fetching results data faiture', () => {
    mock.onGet(reseltsUrl()).reply(404);

    const expectedActions = [
      { type: 'GET_REJECTED' },
    ];

    return store.dispatch(actions.getResultsAction()).catch((err) => {
      expect(store.getActions()).toEqual(expectedActions);

      return err;
    });
  });

  it('4.creates GET_REJECTED when fetching saved data faiture', () => {
    mock.onGet(savedUrl()).reply(404);

    const expectedActions = [
      { type: 'GET_REJECTED' },
    ];

    return store.dispatch(actions.getSavedAction()).catch((err) => {
      expect(store.getActions()).toEqual(expectedActions);

      return err;
    });
  });
});
