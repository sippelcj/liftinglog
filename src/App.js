import React, { Component } from 'react';
import PlateCalculator from './plate-calculator';
import WorkoutEditorView from './workout-editor';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {mainView: <div> View for current days workout</div>};
  }

  closeCallback = () => {
    this.setState({mainView: <div> View for current days workout</div>})
  }

  openPlateCalculator = () => {
    const newView = <PlateCalculator closeCallback={this.closeCallback}/>;
    this.setState({mainView: newView});
  };

  openWorkoutEditor = () => {
    const newView = <WorkoutEditorView closeCallback={this.closeCallback}/>;
    this.setState({mainView: newView});
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className='header-comp'>
            <span>Header Component</span>
            <button> Settings</button>
          </div>
          <br/>
          <div>
            {this.state.mainView}
          </div>
          <br/>
          <div className='footer-comp'>
            <button onClick={this.openPlateCalculator}> Go To Plate Calculator</button>
            <button onClick={this.openWorkoutEditor}> Edit Workout</button>
            <button> Edit Routine</button>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
