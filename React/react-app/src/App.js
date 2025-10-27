import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'

export default function App(){
  return (
    <div className="app-root">
      <Header />

      <main className="container">
        <Routes>

          <Route path="/" element={<Home/>} />
            
          <Route path="/about" element={<About/>} />

        </Routes>
      </main>

      <Footer />
    </div>
  )
}


// Routes [ "/", "/about" , "/contact" ]

// route = "/" or "/about" or "/contact"