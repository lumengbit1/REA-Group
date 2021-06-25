import React from 'react';
import 'jest-styled-components';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WeatherWidget from '../components/WeatherWidget';
import { fromJS } from 'immutable';

Enzyme.configure({ adapter: new Adapter() });

describe('render snapshop testing', () => {
  it('1.renders correctly', () => {
    const wrapper = shallow(<WeatherWidget />);

    expect(wrapper).toMatchSnapshot();
  });

  it('2.weatherRecords props is undefined', () => {
    const wrapper = shallow(<WeatherWidget weatherRecords={undefined} />);

    expect(wrapper.html()).toBe(null);
  });

  it('3.loading props is true', () => {
    const wrapper = shallow(<WeatherWidget loading={true} />);

    expect(wrapper.text()).toBe('Loading...');
  });

  it('4.weatherRecords props has data', () => {
    const weatherData = fromJS({
      "lat": 33.44,
      "lon": -94.04,
      "timezone": "America/Chicago",
      "timezone_offset": -21600,
      "daily": [
        {
          "dt": 1618308000,
          "sunrise": 1618282134,
          "sunset": 1618333901,
          "moonrise": 1618284960,
          "moonset": 1618339740,
          "moon_phase": 0.04,
          "temp": {
            "day": 279.79,
            "min": 275.09,
            "max": 284.07,
            "night": 275.09,
            "eve": 279.21,
            "morn": 278.49
          },
          "feels_like": {
            "day": 277.59,
            "night": 276.27,
            "eve": 276.49,
            "morn": 276.27
          },
          "pressure": 1020,
          "humidity": 81,
          "dew_point": 276.77,
          "wind_speed": 3.06,
          "wind_deg": 294,
          "weather": [
            {
              "id": 500,
              "main": "Rain",
              "description": "light rain",
              "icon": "10d"
            }
          ],
          "clouds": 56,
          "pop": 0.2,
          "rain": 0.62,
          "uvi": 1.93
        },
      ]
    })
    const wrapper = shallow(<WeatherWidget weatherRecords={weatherData} />);

    expect(wrapper.html()).not.toBe(null);
  });
})