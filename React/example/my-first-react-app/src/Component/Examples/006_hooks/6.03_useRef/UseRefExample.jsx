import React, { useRef } from 'react';

export default function UseRefExample() {

  const inputRef = useRef(null);

  const renders = useRef(0);


  renders.current += 1;

  return (
    <div>
      <h4>6.03 - useRef</h4>
      <p>Render count (using useRef): {renders.current}, input = {inputRef.current ? inputRef.current.value : ''}</p>

    
      <input ref={inputRef} placeholder="Focus me with the button" />

 

      <button onClick={() => inputRef.current && inputRef.current.focus()}>
        Focus input
      </button>

    <button onClick={() => inputRef.current && (inputRef.current.value = inputRef.current.value + '!?????....')}>
        Click me
      </button>


    </div>
  );
}
// const idDiv = document.getElementById('id');
// idDiv.style.color = 'red';
// idDiv.style.backgroundColor = 'black';
// idDiv.innerText = 'Hello World';
