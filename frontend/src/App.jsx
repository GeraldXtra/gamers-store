import React from 'react'
import About from './pages/About/About'
import ContactUs from './pages/ContactUs/ContactUs'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/" element={<About />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

