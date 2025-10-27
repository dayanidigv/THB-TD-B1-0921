import { s } from 'motion/react-client';
import React, { useReducer } from 'react';

function callBack(state, action) {

  switch (action.type) {
    case 'increment':
      return { count: state.count + action.amount, total: state.total };
    case 'decrement':
      return { count: state.count - action.amount, total: state.total};
    default:
      return state;
  }

}

export default function UseReducerExample() {
//   const [sta, setState] = useState({ count: 0 });

// const [currentvalue, function for calling reducer] = useReducer(reducer....callbackfunction, { count: 0, total : 100 });
  const [state, dispatch] = useReducer(callBack, { count: 0, total : 100 });


  return (
    <div>
      <h4>6.05 - useReducer</h4>
      <p>count: {state.count}</p>
      <p>total: {state.total}</p>
      <button onClick={() => dispatch({ type: 'decrement', amount: 2 })}>-</button>
      <button onClick={() => dispatch({ type: 'increment', amount: 1 })}>+</button>
    </div>
  );
}
