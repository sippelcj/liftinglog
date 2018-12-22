import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parseRoutineByName } from '../../helpers';

class RoutineViewer extends Component {
  static propTypes = {
    selectedRoutine: PropTypes.string.isRequired,
    setRoutineCallback: PropTypes.func.isRequired,
    closeCallback: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      prettyRoutine: parseRoutineByName(props.selectedRoutine)
    };
  }

  setRoutine = () => {
    const { setRoutineCallback, selectedRoutine } = this.props;

    setRoutineCallback(selectedRoutine);
  };

  render() {
    const { closeCallback } = this.props;
    const { prettyRoutine } = this.state;

    return (
      <div className="routine-component">
        <div>Put each excercise in the routine here</div>
        {prettyRoutine.map(day => (
          <div className="list-view">
            {day.map(excercise => (
              <span>{excercise}</span>
            ))}
            <br />
          </div>
        ))}
        <button type="button" onClick={this.setRoutine}>
          Select Routine
        </button>
        <button type="button" onClick={closeCallback}>
          Close
        </button>
      </div>
    );
  }
}

export default RoutineViewer;
