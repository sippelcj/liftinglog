import React, { Component } from 'react';
import { getRoutineList } from '../../helpers';

class LoggingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentWorkout: this.props.currentWorkout,
    }
  }

  // Create helper for making editable grid
  render() {
    return (
      <div className="list-view">
        {/* {getRoutineList(this.state.currentWorkout)} */}
        <div> View for logging the current day</div>
      </div>
    );
  }
}

export default LoggingView;
