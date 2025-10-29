import React from 'react';
import ErrorComponent from './ErrorComponent';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // You could log to an external service here
    console.error('ErrorBoundary caught:', error, info);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const message = this.state.error ? this.state.error.message : '';
      return <ErrorComponent message={message} onReset={this.reset} />;
    }
    return this.props.children;
  }
}
// this.props.children = <BuggyComponent error={false} />
//                         <BuggyComponent error={false} />
//                         <BuggyComponent error={false} />
//                         <BuggyComponent error={false} />