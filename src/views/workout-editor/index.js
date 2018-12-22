import React, { Component } from 'react';
import NewWorkoutView from './new-workout';

class WorkoutEditorView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWorkout: undefined
    };
  }

  addWorkout = () => {
    const newView = <NewWorkoutView mainViewCallBack={this.props.mainViewCallBack} />;
    this.props.mainViewCallBack(newView);
  };

  render() {
    return (
      <div className="list-view">
        Workout Editor View
        {this.state.currentWorkout}
        <button type="button" onClick={this.addWorkout}>
          New Workout
        </button>
        <button type="button" onClick={this.props.closeCallback}>
          Close
        </button>
      </div>
    );
  }
}

export default WorkoutEditorView;
