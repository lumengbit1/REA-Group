import 'moment-timezone';
import React from 'react';
import moment from 'moment';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import withComponentLoading from './util';
import { Table } from './style';

const WeatherWidget = (props) => {
  const { weatherRecords } = props;

  return (
    <Table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Maximum Temperature</th>
          <th>Minimum Temperature</th>
          <th>Weather Conditions</th>
        </tr>
      </thead>

      <tbody>
        {weatherRecords.get('daily').map((weatherValue, index) => (
          <tr key={weatherValue.get('dt')}>
            <td>
              {moment().add(index, 'days').tz(weatherRecords.get('timezone')).format('dddd, Do MMM YYYY')}
            </td>
            <td>
              {`${weatherValue.get('temp').get('max')}°`}
            </td>
            <td>
              {`${weatherValue.get('temp').get('min')}°`}
            </td>
            <td>
              {weatherValue.get('weather') && weatherValue.get('weather').map((val) => val.get('description'))}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

WeatherWidget.propTypes = {
  weatherRecords: ImmutablePropTypes.map,
};

WeatherWidget.defaultProps = {
  weatherRecords: Map(),
};

export default withComponentLoading(WeatherWidget);
