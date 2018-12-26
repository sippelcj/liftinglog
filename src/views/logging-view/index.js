import React, { Component } from 'react';
import { IconContext } from 'react-icons';
import { FaPlusCircle } from 'react-icons/fa';
import { createLoggingForm, createLogForWorkout, addSetToExcercise } from '../../helpers';

// Loggingdata looks like:
//
// const expected = {
//   'Barbell Bench': [
//     {
//       checked: false,
//       reps: 5,
//       weight: ''
//     }
//   ],
//   'Barbell Squat': [
//     {
//       checked: false,
//       reps: 5,
//       weight: ''
//     },
//   ]
// };
class LoggingView extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // create log on load
    const newLog = createLogForWorkout(this.props.currentWorkout);
    window.localStorage.setItem(this.props.currentDay.format('YYYY-MM-DD'), JSON.stringify(newLog));
  }

  render() {
    const { currentWorkout, loggingData } = this.props;
    let content = 'Nothing scheduled for today';

    if (currentWorkout) {
      content = createLoggingForm(this, this.props.currentDay, loggingData, addSetToExcercise);
    }

    return (
      <div className="list-view">
        {content}
        <button type="button" onClick={this.props.resultsView}>
          Finish, If changes are made, ask to save to the original workout
        </button>
        <button onClick={this.props.openExerciseSelector} className="add-button" type="button">
          <IconContext.Provider value={{ size: '2em' }}>
            <div>
              Add <FaPlusCircle />
            </div>
          </IconContext.Provider>
        </button>
      </div>
    );
  }
}

export default LoggingView;
