import React, { Component } from 'react';
import './PlateCalculator.css';

class PlateCalculator extends Component {
  render() {
    return (
      <div className="plate-calculator">
        <span>
            <input checked type="checkbox" />
            <label>45</label>
        </span>
        <span>
            <label> Type in a weight</label>
            <input type="text" name="name" />
        </span>
        <button onClick={this.props.closeCallback}>Close</button>
      </div>
    );
  }
}

export default PlateCalculator;
