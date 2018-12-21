import React, { Component } from 'react';
import moment from 'moment';
import PlateCalculator from './views/plate-calculator';
import LoggingView from './views/logging-view';
import WorkoutEditorView from './views/workout-editor';
import RoutineEditorView from './views/routine-editor';
import './App.css';
import { getCurrentRoutineName, getWorkoutByDay } from './helpers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {mainView: <LoggingView />};
    this.state.dayOfWeek = moment().format('dddd');
    this.state.currentRoutine = getCurrentRoutineName();
    // TODO change this to be a loggable view instead of just static text
    this.state.currentWorkout = getWorkoutByDay(this.state.currentRoutine, this.state.dayOfWeek) || undefined;
  }

  closeCallback = () => {
    this.setState({mainView: <LoggingView />})
  }

  mainViewCallBack = (view) => {
    this.setState({mainView: view})
  }

  setRoutineCallback = (selectedRoutine) => {
    window.localStorage.setItem('routine', selectedRoutine);
    this.setState({currentRoutine: selectedRoutine})
  }
  
  openPlateCalculator = () => {
    const newView = <PlateCalculator 
      closeCallback={this.closeCallback} 
      mainViewCallBack={this.mainViewCallBack}
    />;
    this.setState({mainView: newView});
  };

  openWorkoutEditor = () => {
    const newView = <WorkoutEditorView
      closeCallback={this.closeCallback}
      mainViewCallBack={this.mainViewCallBack}
      setRoutineCallback={this.setRoutineCallback}
    />;
    this.setState({mainView: newView});
  };

  openRoutineEditor = () => {
    const newView = <RoutineEditorView
      closeCallback={this.closeCallback}
      mainViewCallBack={this.mainViewCallBack}
      setRoutineCallback={this.setRoutineCallback}
    />;
    this.setState({mainView: newView});
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className='header-comp'>
            <span>Header Component</span>
            {this.state.dayOfWeek}
            <button> Settings</button>
          </div>
          <br/>
          <div>
            {this.state.mainView}
            <span> {this.state.currentRoutine} = current routine</span>
            {
              this.state.currentWorkout
            ?
              <div className="list-view">
                {
                  this.state.currentWorkout.map(excercise => <span>{excercise}</span>)
                }
                <br/>
              </div>
            :
              undefined
            }
          
          </div>          
          <br/>
          <div className='footer-comp'>
            <button onClick={this.openPlateCalculator}> Go To Plate Calculator</button>
            <button onClick={this.openWorkoutEditor}> Edit Workout</button>
            <button onClick={this.openRoutineEditor}> Edit Routine</button>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
