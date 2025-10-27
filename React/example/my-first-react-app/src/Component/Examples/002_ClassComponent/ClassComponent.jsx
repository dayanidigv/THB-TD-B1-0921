import React, { Component } from 'react';

export default class ClassComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {count: 0,score: 0  };
    }

    incrementCount = () => {
        this.setState((prevState) => ({ count: prevState.count + 1 }));
    };

    incrementScore = () => {
        this.setState((prevState) => ({ score: prevState.score + 1 }));
    };

  render() {
    return (
      <div>
        <h3>Class Component</h3>
        <p>This is a simple class component.</p>
        <p>Count: {this.state.count}</p>
        <p>Score: {this.state.score}</p>
        <button onClick={this.incrementCount}>Increment Count</button>
        <button onClick={this.incrementScore}>Increment Score</button>
      </div>
    );
  }
}
