import React from 'react';

export default function BuggyComponent(props) {
  // Intentionally throw to demonstrate ErrorBoundary
  if (props.error) {
    throw new Error('Buggy component exploded!');
  }
  return <div>This will not be displayed.</div>;
}
