import React, { useState, useEffect } from 'react';

export default function BuggyComponent(props) {
  // Track whether the fetch failed so we can throw during render
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    let mounted = true;

    fetch('https://reqres.in/api/users/23')
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('User not found');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        if (mounted) setFetchError(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  // Synchronous throw based on prop to demonstrate ErrorBoundary
  if (props.error) {
    throw new Error('Error thrown from BuggyComponent via props.error');
  }

  // If the fetch failed, throw during render so ErrorBoundary can catch it
  if (fetchError) {
    throw new Error('Error thrown from BuggyComponent due to failed fetch');
  }

  return <div>This will be displayed. Because no error occurred.</div>;
}
