import React from 'react';

function Greeting({ name, age=0 }) {
  return <>
    <p>Age component says: You are {age} years old!</p>
    <p>Name component says: Your name is {name}!</p>
  </>;
}

function Age(props) {
  return <>
    {/* <p>{props.name}</p> */}
    {/* TODO:  */}

    {/* <p>{Object.keys(props)}</p> */}
    <p>{props.children}</p>


  </>;
}

function Main(props) {
  return (
    <div style={{ border: '2px solid blue', padding: '10px' }}>
      <h4>Main Component</h4>
      {props.children}
    </div>
  );
}

export default function PropsExample() {
  return (
    <div>
      {/* <h3>Props Example</h3>
      <p>Pass a value into a child component via props:</p> */}
      {/* <Greeting name="Daya" />
      <Greeting name="Vijay" />
      <Greeting name="Vimal" age={30} /> */}

      <Age age={25} name="Vimal" limit={100} height={200} width={300} error={1} children="hello world">
        <p>Message</p>
        <p>Message</p>
        <p>Message</p>
        <p>Message</p>
        <p>Message</p>
      </Age>

      {/* <Main>
        <Greeting name="Daya" />
      </Main> */}
    </div>
  );
}
