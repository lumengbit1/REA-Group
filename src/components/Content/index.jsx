import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { fromJS, Map } from 'immutable';

import Select from 'react-select';
import { getLocationAction, getWeatherAction, clear_data } from '../../reducers/actions';
import { makeLocationSelector, makeWeatherSelector, makeWeatherLoadingSelector, makeLocationLoadingSelector } from '../../selectors/selectors';
import WeatherWidget from '../WeatherWidget';
import { Root, SubmitBtn, SelectContainer } from './style';

function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const Content = (props) => {
  const { getLocation, locationRecords, getWeatherReport, weatherRecords, ClearData, weatherLoading, locationLoading } = props;
  const [inputValue, setInputValue] = React.useState();

  const prevInputValue = usePrevious({ inputValue });

  const isActive = inputValue && inputValue.get('value').get('lat') && inputValue.get('value').get('lon');
  const latitude = inputValue && inputValue.get('value').get('lat');
  const longitude = inputValue && inputValue.get('value').get('lon');

  const options = locationRecords && locationRecords.size > 0
    ? locationRecords.map((record) => _.assign({}, { label: record.get('display_name'), value: { lat: record.get('lat'), lon: record.get('lon') } })).toJS()
    : [];

  const handleInputChange = _.debounce((value) => {
    if (value) {
      getLocation(value);
    }
  }, 500);

  const handleOnChange = (value) => {
    setInputValue(fromJS(value));
  };

  const handleOnSubmit = () => {
    getWeatherReport(latitude, longitude);
  };

  React.useEffect(() => {
    if (prevInputValue && prevInputValue.inputValue && !inputValue) {
      ClearData();
    }
  }, [inputValue]);

  return (
    <Root>
      <SelectContainer>
        <Select
          value={Map(inputValue).toJS()}
          onInputChange={handleInputChange}
          onChange={handleOnChange}
          options={options}
          isClearable
          isLoading={locationLoading}
        />
      </SelectContainer>
      <SubmitBtn
        disabled={!isActive}
        onClick={handleOnSubmit}
      >
        Submit
      </SubmitBtn>

      <WeatherWidget
        weatherRecords={weatherRecords}
        loading={weatherLoading}
      />

    </Root>
  );
};

Content.propTypes = {
  getLocation: PropTypes.func.isRequired,
  getWeatherReport: PropTypes.func.isRequired,
  ClearData: PropTypes.func.isRequired,
  locationRecords: ImmutablePropTypes.list,
  weatherRecords: ImmutablePropTypes.map,
  weatherLoading: PropTypes.bool,
  locationLoading: PropTypes.bool,
};

Content.defaultProps = {
  locationRecords: undefined,
  weatherRecords: undefined,
  weatherLoading: undefined,
  locationLoading: undefined,
};

export const makeMapStateToProps = () => {
  const getLocationSelector = makeLocationSelector();
  const getWeatherSelector = makeWeatherSelector();
  const getWeatherLoadingSelector = makeWeatherLoadingSelector();
  const getLocationLoadingSelector = makeLocationLoadingSelector();

  const mapStateToProps = (state) => ({
    locationRecords: getLocationSelector(state),
    weatherRecords: getWeatherSelector(state),
    weatherLoading: getWeatherLoadingSelector(state),
    locationLoading: getLocationLoadingSelector(state),
  });
  return mapStateToProps;
};

export const mapDispatchToProps = (dispatch) => ({
  getLocation: (location) => dispatch(getLocationAction(location)),
  getWeatherReport: (lat, lon) => dispatch(getWeatherAction(lat, lon)),
  ClearData: () => dispatch(clear_data()),
});

export default connect(
  makeMapStateToProps,
  mapDispatchToProps,
)(Content);
