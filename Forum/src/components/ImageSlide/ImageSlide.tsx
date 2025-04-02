import React, { useState } from "react";
import styles from "./Imageslide.module.css";

interface ImageSliderProps {
  images: string[]; 
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hàm chuyển đến slide trước
  const handlePrev = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  // Hàm chuyển đến slide tiếp theo
  const handleNext = () => {
    setCurrentSlide((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  // Hàm chuyển đến slide cụ thể khi nhấp vào dot
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Nếu không có hình ảnh, trả về null hoặc thông báo
  if (!images || images.length === 0) {
    return <p>No images available</p>;
  }

  return (
    <div className={styles.customSlider}>
      <div className={styles.sliderWrapper}>
        {images.map((img, index) => (
          <div
            key={index}
            className={`${styles.sliderItem} ${
              index === currentSlide ? styles.active : ""
            }`}
          >
            <img
              src={img}
              alt={`Image ${index + 1}`}
              className={styles.sliderImage}
            />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <>
          <button className={styles.prevButton} onClick={handlePrev}>
            ‹
          </button>
          <button className={styles.nextButton} onClick={handleNext}>
            ›
          </button>
          <div className={styles.dots}>
            {images.map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${
                  index === currentSlide ? styles.activeDot : ""
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageSlider;