import React, { Component } from 'react';
import WorkoutEditorView from './index';

class NewWorkoutView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentWorkout: undefined
    };
  }

  handleDone = () => {
    this.props.mainViewCallBack(WorkoutEditorView);
  };

  render() {
    return (
      <div className="list-view">
        New Workout View
        <button type="button" onClick={this.handleDone}>
          Done
        </button>
      </div>
    );
  }
}

export default NewWorkoutView;
