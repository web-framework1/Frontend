import React, { useRef, useState, useEffect } from "react";
import slide1 from "@assets/slide-img/slide1.png";
import slide2 from "@assets/slide-img/slide2.png";
import slide3 from "@assets/slide-img/slide3.png";
import slide4 from "@assets/slide-img/slide4.png";

//이 컴포넌트는 이미지만 넣으면되고 재사용 가능성 낮아 고정으로 박았음

function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderTimerRef = useRef(null);

  // Slider 이미지들
  const slides = [
    { image: slide1 },
    { image: slide2 },
    { image: slide3 },
    { image: slide4 },
  ];

  // Slider 훅, 함수
  useEffect(() => {
    const startTimer = () => {
      if (sliderTimerRef.current) clearInterval(sliderTimerRef.current);
      sliderTimerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);
    };

    startTimer();
    return () => {
      if (sliderTimerRef.current) clearInterval(sliderTimerRef.current);
    };
  }, []);

  const handleSliderDot = (index) => {
    setCurrentSlide(index);
    if (sliderTimerRef.current) clearInterval(sliderTimerRef.current);
    sliderTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
  };

  return (
    <section className="mb-6">
      <div className="relative h-90 rounded-xl overflow-hidden shadow-lg">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="min-w-full h-full bg-cover bg-center flex items-center justify-center text-white font-bold text-xl p-5 relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            ></div>
          ))}
        </div>
        <div className="absolute right-3 bottom-3 flex gap-2 z-20">
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => handleSliderDot(index)}
              className={`w-2.5 h-2.5 rounded-full cursor-pointer ${
                index === currentSlide ? "bg-white" : "bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BannerSlider;
