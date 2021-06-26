import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../App';

Enzyme.configure({ adapter: new Adapter() });

describe('Test <App />', () => {
  const warpper = shallow(
    <App>
      <span />
    </App>,
  );
  it('1. Include one <span>', () => {
    expect(warpper.find('span').length).toBe(1);
  });
});
