import React, { Component } from 'react';
import { parseRoutineByName } from '../../helpers';
class RoutineViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prettyRoutine: parseRoutineByName(this.props.selectedRoutine)
    }
  }

  setRoutine = () => {
    this.props.setRoutineCallback(this.props.selectedRoutine);
  }

  render() {
    return (
      <div className="routine-component">
        <div>Put each excercise in the routine here</div>
        {this.state.prettyRoutine.map(day => 
          <div className="list-view">
            {
              day.map(excercise => <span>{excercise}</span>)
            }
            <br/>
          </div>
        )}
        <button onClick={this.setRoutine}>Select Routine</button>
        <button onClick={this.props.closeCallback}>Close</button>
      </div>
    );
  }
}

export default RoutineViewer;
