import React from 'react'

export default function Footer(){
  return (
    <footer className="site-footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} SimpleSite — Built for demo</p>
      </div>
    </footer>
  )
}
