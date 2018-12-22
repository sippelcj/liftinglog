import React, { Component } from 'react';
import plateCalculator from 'plate-calculator';
import rm from '1rm';
import './PlateCalculator.css';

class PlateCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = { calculatedResult: undefined };
  }

  calculatePlates = () => {
    const result = plateCalculator.calculate(this.state.inputValue);
    console.log(result);

    let platesString = '';
    result.plates.forEach(plate => {
      for (let numPlates = 0; numPlates < plate.qty / 2; numPlates++) {
        platesString += `${plate.plateWeight}, `;
      }
    });
    platesString = platesString.replace(/,\s*$/, '');
    this.setState({ calculatedResult: platesString });
  };

  doOneRMCalculate = () => {
    const { weight, reps } = this.state;

    const result = rm.brzycki(weight, reps);
    this.setState({ oneRM: result });
  };

  updateInput = (e, inputValue) => {
    this.setState({
      [inputValue]: e.target.value
    });
  };

  render() {
    return (
      <div className="plate-calculator">
        <label htmlFor="45checkbox">
          45
          <input id="45checkbox" checked type="checkbox" />
        </label>
        <label htmlFor="35checkbox">
          35
          <input id="35checkbox" checked type="checkbox" />
        </label>
        <label htmlFor="25checkbox">
          25
          <input id="25checkbox" checked type="checkbox" />
        </label>
        <label htmlFor="10checkbox">
          10
          <input id="10checkbox" checked type="checkbox" />
        </label>
        <label htmlFor="weight-input">
          Type in a weight
          <input
            id="weight-input"
            type="text"
            name="name"
            onChange={e => this.updateInput(e, 'calculatedResult')}
          />
        </label>
        <span>
          Result:
          {this.state.calculatedResult}
        </span>
        <button type="button" onClick={this.calculatePlates}>
          Calculate
        </button>
        <br />
        <div />
        1rm calculator
        <input type="text" name="weight" onChange={e => this.updateInput(e, 'weight')} />
        x
        <input type="text" name="rep" onChange={e => this.updateInput(e, 'reps')} />
        <button type="button" onClick={this.doOneRMCalculate}>
          {' '}
          Calculate
        </button>
        <span> Result: {this.state.oneRM}</span>
        <div />
        <br />
        <button type="button" onClick={this.props.closeCallback}>
          Close
        </button>
      </div>
    );
  }
}

export default PlateCalculator;
