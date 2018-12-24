import React, { Component } from 'react';
import { createLoggingForm } from '../../helpers';

class LoggingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formContent: this.createFormContent(this.props)
    };
  }

  createFormContent = props => {
    if (props.currentWorkout) {
      return createLoggingForm(props.currentWorkout);
    }
    return 'Nothing scheduled for today';
    // Todo add way to manually create workout for day
    // (can add excercises from add button)
  };

  render() {
    return <div className="list-view">{this.state.formContent}</div>;
  }
}

export default LoggingView;
