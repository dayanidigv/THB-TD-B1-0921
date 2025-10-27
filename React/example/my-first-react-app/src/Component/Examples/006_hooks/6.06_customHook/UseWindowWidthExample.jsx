import React from 'react';
import useWindowWidth from './useWindowWidthHook';

export default function UseWindowWidthExample() {
  const width = useWindowWidth();
  return (
    <div>
      <h4>6.06 - custom Hook (useWindowWidth)</h4>
      <p>Window width: {width}px</p>
    </div>
  );
}
