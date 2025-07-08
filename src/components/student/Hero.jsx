import React from 'react'
import { assets } from '../../assets/assets'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <div className='hero-container'>
      <h1 className='hero-heading'>
        Empower your future with the courses designed to <span className='hero-highlight'>fit your choice.</span>
        <img src={assets.sketch} alt="sketch" className='hero-sketch' />
      </h1>

      <p className='hero-desc-large'>
        We bring together world-class instructors, interactive content, and a supportive community to help you achieve your personal and professional goals.
      </p>

      <p className='hero-desc-small'>
        We bring together world-class instructors to help you achieve your professional goals.
      </p>
      <SearchBar/>
    </div>
  )
}

export default Hero
