import React from 'react'

export default function Home(){
  return (
    <section className="hero">
      <h2>Welcome to SimpleSite</h2>
      <p>This is the React version (CRA-style) of the same simple site.</p>
      <p><a className="btn" href="/about">Learn more</a></p>
    </section>
  )
}


// js, jsx, ts, tsx

// babel jsx -> js 

// indexedDB.js, about.js, home.js -> bundle.js

// webpack, vite, rollup, parcel -> bundle, minify, tree-shake