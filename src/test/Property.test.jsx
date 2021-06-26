import React from 'react';
import 'jest-styled-components';

import { render, waitFor } from '@testing-library/react';
import Property from '../components/Property';

describe('Function Test', () => {
  it('1: renders Property correctly', async () => {
    const { getByText } = render(
      <Property
        price="$726,500"
        color="#ffe512"
        logo="http://i1.au.reastatic.net/agencylogo/XRWXMT/12/20120927204448.gif"
        mainImage="http://i2.au.reastatic.net/640x480/20bfc8668a30e8cabf045a1cd54814a9042fc715a8be683ba196898333d68cec/main.jpg"
      />,
    );
    const price = await waitFor(() => getByText('$726,500'));
    expect(price).toBeInTheDocument();
  });
});
