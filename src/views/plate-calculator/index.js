import React, { Component } from 'react';
import plateCalculator from 'plate-calculator';
import rm from '1rm';
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

  doOneRMCalculate = () => {
    const result = rm.brzycki(this.state.weight, this.state.reps);
    this.setState({oneRM: result});
  };

  updateInput = (e, inputValue) => {
    this.setState({
      [inputValue]: e.target.value
    });
  };

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
            <input checked type="checkbox" />
            <label>25</label>
        </span>
        <span>
            <label> Type in a weight </label>
            <input type="text" name="name" onChange={e => this.updateInput(e, 'calculatedResult')}/>
        </span>
        <span>
          <label> Result: </label>
          {this.state.calculatedResult}
        </span>
        <button onClick={this.calculatePlates}>Calculate</button>
        <br/>
        <div />
          1rm calculator
          <input type="text" name="weight" onChange={e => this.updateInput(e, 'weight')}/>
          x
          <input type="text" name="rep" onChange={e => this.updateInput(e, 'reps')}/>
          <button onClick={this.doOneRMCalculate}> Calculate</button>
          <label> Result: </label> {this.state.oneRM}
        <div />
        <br/>
        <button onClick={this.props.closeCallback}>Close</button>
      </div>
    );
  }
}

export default PlateCalculator;
