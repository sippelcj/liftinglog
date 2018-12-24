import React, { Component } from 'react';
import {
  createLoggingForm,
  createLogForWorkout,
  createLoggingStructure,
  addSetToExcercise
} from '../../helpers';

class LoggingView extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // Put workout into state so we can modify it (add excercise, sets, ect...)
    this.state.currentWorkout = this.props.currentWorkout;
    this.state.loggingData = createLoggingStructure(this.state.currentWorkout);
    // create log on load
    const newLog = createLogForWorkout(this.state.currentWorkout);
    window.localStorage.setItem(this.props.currentDay.format('YYYY-MM-DD'), JSON.stringify(newLog));
    // write log?
  }

  render() {
    const { currentWorkout, loggingData } = this.state;
    let content = 'Nothing scheduled for today';

    if (currentWorkout) {
      content = createLoggingForm(this, loggingData, addSetToExcercise);
    }

    return (
      <div className="list-view">
        {content}
        <button type="button" onClick={this.props.resultsView}>
          Finish
        </button>
      </div>
    );
  }
}

export default LoggingView;
