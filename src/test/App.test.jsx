import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

describe('Test <App />', () => {
  it('case: expect rendering correct', () => {
    const { container } = render(
      <App>
        <span />
      </App>,
    );
    expect(container).toMatchSnapshot();
  });
});
