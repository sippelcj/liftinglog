/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { getRoutineList } from '../../helpers';
import RoutineViewer from '../routine-view';

class RoutineEditorView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRoutine: this.props.currentRoutine,
      routineList: Object.keys(getRoutineList())
    };
  }

  setRoutine = e => {
    // set the main state to the selected routine
    const newView = (
      <RoutineViewer
        closeCallback={this.props.closeCallback}
        mainViewCallBack={this.props.mainViewCallBack}
        setStateCallback={this.props.setStateCallback}
        setRoutineCallback={this.props.setRoutineCallback}
        selectedRoutine={e.target.innerText} // todo better way to get this?
      />
    );
    this.props.mainViewCallBack(newView);
  };

  render() {
    return (
      <div className="list-view">
        {this.state.currentRoutine ? (
          this.state.currentRoutine
        ) : (
          <div>
            <div>Choose A premade routine or create one from scratch </div>
            <br />
            {this.state.routineList.map(
              item => (
                <div key={item} name={item} onClick={this.setRoutine}>
                  {item}
                </div>
              )
              /* todo better key? */
            )}
          </div>
        )}
        <br />
        <button type="button">Add Custom Routine</button>
        <button type="button" onClick={this.props.closeCallback}>
          Close
        </button>
      </div>
    );
  }
}

export default RoutineEditorView;
