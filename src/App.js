import { IconContext } from 'react-icons';
import React, { Component } from 'react';
import moment from 'moment';
import { FaBars } from 'react-icons/fa';
import { setConfiguration } from 'react-grid-system';
import PlateCalculator from './views/plate-calculator';
import MainView from './views/main-view';
import AddExerciseView from './views/add-exercise-view';
import ResultsView from './views/results-view';
import LoggingView from './views/logging-view';
import WorkoutEditorView from './views/workout-editor';
import RoutineEditorView from './views/routine-editor';
import './App.css';
import {
  getCurrentRoutineName,
  createLoggingStructure,
  parseRoutineByName,
  getWorkoutFromRoutine
} from './helpers';

class App extends Component {
  constructor(props) {
    super(props);

    setConfiguration({ gutterWidth: 10 });

    this.state = {};
    this.state.currentDay = moment();
    this.state.dayOfWeek = moment().format('dddd');
    this.state.currentRoutineName = getCurrentRoutineName();
    this.state.currentRoutine = parseRoutineByName(this.state.currentRoutineName);
    const { dayOfWeek, currentRoutineName } = this.state;
    this.state.currentWorkout = getWorkoutFromRoutine(currentRoutineName, dayOfWeek) || undefined;
    this.state.loggingData = createLoggingStructure(this.state.currentWorkout);

    // Get todays log
    // getLog(currentDay);
    // Logging View is always the default view, so it jump right to logging the current day
    this.state.mainView = (
      <MainView currentWorkout={this.state.currentWorkout} startLogging={this.startLogging} />
    );
  }

  // invoked to "return" back to this form
  closeCallback = () => {
    const { currentWorkout } = this.state;
    this.setState({
      mainView: <MainView currentWorkout={currentWorkout} startLogging={this.startLogging} />
    });
  };

  startLogging = () => {
    const { currentWorkout, currentDay, loggingData } = this.state;
    this.setState({
      mainView: (
        <LoggingView
          currentWorkout={currentWorkout}
          loggingData={loggingData}
          currentDay={currentDay}
          resultsView={this.resultsView}
          openExerciseSelector={this.openExerciseSelector}
          backToLogView={this.startLogging}
          setLoggingDataCallback={this.setLoggingDataCallback}
        />
      )
    });
  };

  resultsView = () => {
    const { currentWorkout } = this.state;
    this.setState({
      mainView: <ResultsView currentWorkout={currentWorkout} closeCallback={this.closeCallback} />
    });
  };

  // Set current view to whatever is passed in
  mainViewCallBack = view => {
    this.setState({ mainView: view });
  };

  setRoutineCallback = selectedRoutine => {
    window.localStorage.setItem('routine', selectedRoutine);
    this.setState({ currentRoutine: selectedRoutine });
  };

  setLoggingDataCallback = loggingData => {
    this.setState({ loggingData });
  };

  openPlateCalculator = () => {
    const newView = (
      <PlateCalculator
        closeCallback={this.closeCallback}
        mainViewCallBack={this.mainViewCallBack}
      />
    );
    this.setState({ mainView: newView });
  };

  openExerciseSelector = () => {
    const { loggingData } = this.state;
    const newView = (
      <AddExerciseView
        closeCallback={this.closeCallback}
        mainViewCallBack={this.mainViewCallBack}
        backToLogView={this.startLogging}
        setLoggingDataCallback={this.setLoggingDataCallback}
        loggingData={loggingData}
      />
    );
    this.setState({ mainView: newView });
  };

  openWorkoutEditor = () => {
    const newView = (
      <WorkoutEditorView
        closeCallback={this.closeCallback}
        mainViewCallBack={this.mainViewCallBack}
        setRoutineCallback={this.setRoutineCallback}
      />
    );
    this.setState({ mainView: newView });
  };

  openRoutineEditor = () => {
    const newView = (
      <RoutineEditorView
        closeCallback={this.closeCallback}
        mainViewCallBack={this.mainViewCallBack}
        setRoutineCallback={this.setRoutineCallback}
      />
    );
    this.setState({ mainView: newView });
  };

  render() {
    const { dayOfWeek, mainView, currentRoutineName } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          {dayOfWeek}
          <span> {currentRoutineName} = routine</span>
          <button type="button">
            <IconContext.Provider value={{ color: 'white', size: '2em' }}>
              <div>
                <FaBars />
              </div>
            </IconContext.Provider>
          </button>
        </header>
        <body className="App-body">
          <div className="main-view-container">{mainView}</div>
        </body>
        <footer className="App-footer">
          <button type="button" onClick={this.openPlateCalculator}>
            Go To Plate Calculator
          </button>
          <button type="button" onClick={this.openWorkoutEditor}>
            Edit Workout
          </button>
          <button type="button" onClick={this.openRoutineEditor}>
            Edit Routine
          </button>
        </footer>
      </div>
    );
  }
}

export default App;
