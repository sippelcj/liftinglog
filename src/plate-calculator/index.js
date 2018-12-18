import React, { Component } from 'react';
import plateCalculator from 'plate-calculator';
import './PlateCalculator.css';

class PlateCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {calculatedResult: undefined};
  }

  calculatePlates = () => {
    const result = plateCalculator.calculate(this.state.inputValue);
    console.log(result);

    let platesString = '';
    result.plates.forEach(plate => {
      for(let numPlates = 0; numPlates < plate.qty/2; numPlates++){
        platesString += `${plate.plateWeight}, `;
      }
    });
    platesString = platesString.replace(/,\s*$/, "");
    this.setState({calculatedResult: platesString});
  }

  updateInput = (e) => {
    this.setState({
      inputValue: e.target.value
    });
  }

  render() {
    return (
      <div className="plate-calculator">
        <span>
            <input checked type="checkbox" />
            <label>45</label>
        </span>
        <span>
            <input checked type="checkbox" />
            <label>35</label>
        </span>
        <span>
            <label> Type in a weight </label>
            <input type="text" name="name" onChange={this.updateInput}/>
        </span>
        <span>
          <label> Result: </label>
          {this.state.calculatedResult}
        </span>
        <button onClick={this.calculatePlates}>Calculate</button>
        <button onClick={this.props.closeCallback}>Close</button>
      </div>
    );
  }
}

export default PlateCalculator;
