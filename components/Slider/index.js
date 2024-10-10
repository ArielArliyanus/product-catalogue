"use client"
import {useState, useEffect} from 'react';

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = ['/banner-2.jpg', '/banner-1.jpg'];
  
    useEffect(() => {
      const interval = setInterval(() => changeSlide(1), 5000); // Change every 5 seconds
      return () => clearInterval(interval);
      
    }, []);
  
    const changeSlide = (direction) => {
        setCurrentSlide((prev) => {
            let newIndex = prev + direction;
            if (newIndex < 0) return slides.length - 1;
            if (newIndex >= slides.length) return 0;
            return newIndex;
        });
    };
    
    return (
        <div className="slider">
            <div className="slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((src, index) => (
                    <div className="slide fade" key={index}>
                        <img src={src} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </div>
            <a className="prev" onClick={() => changeSlide(-1)}>&#10094;</a>
            <a className="next" onClick={() => changeSlide(1)}>&#10095;</a>
        </div>
    )
}

export default Slider;