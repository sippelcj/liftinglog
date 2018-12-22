import React, { Component } from 'react';
import { createLoggingForm } from '../../helpers';

class LoggingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWorkout: this.props.currentWorkout
    };
  }

  render() {
    return (
      <div className="list-view">
        {createLoggingForm(this.state.currentWorkout)}
        <div> View for logging the current day</div>
      </div>
    );
  }
}

export default LoggingView;
