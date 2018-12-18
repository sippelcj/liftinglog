import React, { Component } from 'react';
// import './WorkoutEditorView.css';

class WorkoutEditorView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentWorkout: undefined
    }
  }

  render() {
    return (
      <div className="workout-editor">
        Workout Editor View
        {this.state.currentWorkout}
        <button>Add Workout</button>
        <button onClick={this.props.closeCallback}>Close</button>
      </div>
    );
  }
}

export default WorkoutEditorView;
