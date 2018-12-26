import React, { Component } from 'react';

class AddExerciseView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exerciseName: 'New Excercise'
    };
  }

  updateInput = e => {
    this.setState({
      exerciseName: e.target.value
    });
  };

  AddExerciseToLogView = () => {
    const newLogData = this.props.loggingData;
    // this.state.exerciseName
    newLogData[this.state.exerciseName] = [
      {
        checked: false,
        reps: '',
        weight: ''
      }
    ];

    this.props.setLoggingDataCallback(newLogData);
    this.props.backToLogView();
  };

  render() {
    return (
      <div className="list-view">
        {/* search bar for excercises */}
        {/* Excercise list */}
        {/* if custom input */}
        <input type="text" onChange={this.updateInput} defaultValue="enter a name" />
        <button type="button" onClick={() => this.AddExerciseToLogView()}>
          {' '}
          Done{' '}
        </button>
      </div>
    );
  }
}

export default AddExerciseView;
