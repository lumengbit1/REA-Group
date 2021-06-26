import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../App';

Enzyme.configure({ adapter: new Adapter() });

describe('Test <App />', () => {
  const warpper = shallow(<App />);
  it('1. Include one <div>', () => {
    expect(warpper.find('div').length).toBe(1);
  });

  it('2. "Header" Could be rendered', () => {
    expect(warpper.find('Content').exists());
  });
});
