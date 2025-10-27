import React, { Component } from 'react';

export default class LifecycleExample extends Component {

  
    componentDidMount() {
    // small side-effect to demonstrate mount
    console.log('LifecycleExample mounted');
  }

  componentWillUnmount() {
    console.log('LifecycleExample will unmount');
  }

  render() {
    return (
      <div>
        <h3>Component Lifecycle (Class)</h3>
        <p>Open the browser console to see mount/unmount messages.</p>
      </div>
    );
  }
}
