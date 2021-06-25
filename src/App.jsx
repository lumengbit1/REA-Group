import React from 'react';
import PropTypes from 'prop-types';

const App = (props) => (
  <div className="App">
    {props.children}
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
