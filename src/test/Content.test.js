import React from 'react';
import 'jest-styled-components';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Content, { mapDispatchToProps } from '../components/Content';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import sinon from 'sinon';
import { getLocationAction, getWeatherAction, clear_data } from "../reducers/actions";
import thunk from 'redux-thunk';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    handleOnSubmit: jest.fn(),
  }

  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  let store = mockStore();
  const enzymeWrapper = mount(
    <Provider store={store} >
      <Content {...props} />
    </Provider>)

  return {
    props,
    enzymeWrapper
  }
}

describe('mapStateToProps,mapDispatchToProps Testing', () => {
  let wrapper, store;
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  beforeEach(() => {
    const initialState = fromJS({
      location: [],
      weather: {},
      errors: {},
    });

    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store} >
        <Content />
      </Provider>)
  })

  it('1.getLocation Testing', () => {
    const dispatchSpy = sinon.spy();
    const { getLocation } = mapDispatchToProps(dispatchSpy);
    getLocation();
    const expectedAction = getLocationAction();
    const spyLastCall = dispatchSpy.args[0][0];
    expect(spyLastCall.types).toEqual(expectedAction.types);
  })

  it('2.getWeatherReport Testing', () => {
    const dispatchSpy = sinon.spy();
    const { getWeatherReport } = mapDispatchToProps(dispatchSpy);
    getWeatherReport();
    const expectedAction = getWeatherAction();
    const spyLastCall = dispatchSpy.args[0][0];
    expect(spyLastCall.types).toEqual(expectedAction.types);
  })

  it('3.ClearData Testing', () => {
    const dispatchSpy = sinon.spy();
    const { ClearData } = mapDispatchToProps(dispatchSpy);
    ClearData();
    const expectedAction = clear_data();
    const spyLastCall = dispatchSpy.args[0][0];
    expect(spyLastCall.types).toEqual(expectedAction.types);
  })
})

describe('render snapshop testing', () => {
  it('renders correctly', () => {
    let wrapper, store;
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    store = mockStore();
    wrapper = shallow(
      <Provider store={store} >
        <Content />
      </Provider>);

    expect(wrapper).toMatchSnapshot();
  });
})
