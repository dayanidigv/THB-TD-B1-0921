import React from 'react';

function Greeting({ name, age=0 }) {
  return <>
    <p>Age component says: You are {age} years old!</p>
    <p>Name component says: Your name is {name}!</p>
  </>;
}

function Age(props) {
  return <>
    <p>Age component says: You are {props.age} years old!</p>
    <p>Name component says: Your name is {props.name}!</p>
    {/* <p>{props.keys}</p> */}
    {/* TODO:  */}
  </>;
}

export default function PropsExample() {
  return (
    <div>
      <h3>Props Example</h3>
      <p>Pass a value into a child component via props:</p>
      <Greeting name="Daya" />
      <Greeting name="Vijay" />
      <Greeting name="Vimal" age={30} />

      <Age age={25} name="Vimal" limit={100} />
    </div>
  );
}
