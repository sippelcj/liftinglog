import React, { Component } from 'react';

class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formContent: this.createFormContent(this.props)
    };
  }

  createFormContent = props => {
    const { currentWorkout } = props;
    if (currentWorkout) {
      return `${currentWorkout.name} is the workout scheduled for today`;
    }
    return 'Nothing scheduled for today';
    // Add options for selecting a current workout or adding excercises individually
  };

  render() {
    return (
      <div className="list-view">
        {this.state.formContent}
        <button type="button" onClick={this.props.startLogging}>
          Start!
        </button>
      </div>
    );
  }
}

export default MainView;
