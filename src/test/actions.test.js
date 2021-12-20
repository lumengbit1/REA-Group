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
const reseltsUrl = () => `${settings.BASE_API_DOMAIN}`;
const savedUrl = () => `${settings.SAVED_BASE_API_DOMAIN}`;

const store = mockStore();
const mock = new MockAdapter(axios);

const payload = 'test';
const expectedAction = (type)=>({
  type: type,
  payload: {
    data: 'test'
  }
});

describe('actions testing', () => {
  it('1.get testing', () => {
    const expectedAction = {
      type: 'GET_REQUEST',
    };
    expect(actions.get()).toEqual(expectedAction);
  });

  it('2.get_successed testing', () => {
    expect(actions.get_successed(payload)).toEqual(expectedAction('GET_RESOLVED'));
  });

  it('3.get_failed functionality testing', () => {
    expect(actions.get_failed(payload)).toEqual(expectedAction('GET_REJECTED'));
  });

  it('4.get_loading functionality testing', () => {
    expect(actions.get_loading(payload)).toEqual(expectedAction('GET_LOADING'));
  });

  it('5.add_property functionality testing', () => {
    const expectedAction = {
      type: 'ADD_PROPERTY',
    };
    expect(actions.add_property()).toEqual(expectedAction);
  });

  it('6.remove_property functionality testing', () => {
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

  it('1.creates GET_RESOLVED when getting data has been done', () => {
    mock.onGet(reseltsUrl()).reply(200, { response: [{ item: 'item1' }, { item: 'item2' }] });

    const expectedActions = [
      { type: 'GET_REQUEST' },
      { type: 'GET_LOADING' },
      {
        type: 'GET_RESOLVED',
        payload: [{ item: 'item1' }, { item: 'item2' }],
      },
    ];

    return store.dispatch(actions.getAction(settings.BASE_API_DOMAIN)).then((res) => {
      expect(store.getActions()).toEqual(expectedActions);

      return res;
    }).catch((err) => err);
  });

  it('2.creates GET_REJECTED when fetching data faiture', () => {
    mock.onGet(reseltsUrl()).reply(404);

    const expectedActions = [
      { type: 'GET_REJECTED' },
    ];

    return store.dispatch(actions.getAction(settings.BASE_API_DOMAIN)).catch((err) => {
      expect(store.getActions()).toEqual(expectedActions);

      return err;
    });
  });
});
