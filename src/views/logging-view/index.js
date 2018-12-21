import React, { Component } from 'react';

class WorkoutEditorView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentWorkout: this.getWorkoutByDay(),
    }
  }

  getWorkoutByDay = () => {
      const result = undefined;

      return result;
  }

  render() {
    return (
      <div className="list-view">
        <div> View for current days workout</div>
        {this.state.currentWorkout}
      </div>
    );
  }
}

export default WorkoutEditorView;
