import React, { Component } from 'react';

class ResultsView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="list-view">
        put some results here
        <button type="button" onClick={this.props.closeCallback}>
          Home
        </button>
      </div>
    );
  }
}

export default ResultsView;
