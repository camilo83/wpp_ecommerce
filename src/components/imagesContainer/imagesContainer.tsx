import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './imagesContainer.scss';
import { useEffect, useState } from 'react';
import { ENV } from '../../utils/constants';

type propsType = {
  images: string[];
};

export function ImageCarousel({ images }: propsType) {
  const [currentImagePath, setCurrentImagePath] = useState(images[0]);

  useEffect(() => {
    if (images.length > 0) {
      setCurrentImagePath(images[0]);
    }
  }, [images, currentImagePath]);

  const scrollAmount = (8 * window.innerWidth) / 100;

  const scrollUp = () => {
    const ulElement = document.querySelector('.small-images-container ul');
    if (ulElement) {
      ulElement.scrollBy({
        top: -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollDown = () => {
    const ulElement = document.querySelector('.small-images-container ul');
    if (ulElement) {
      ulElement.scrollBy({
        top: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="carrousel-section">
      <div className="image-container">
        <div className="small-images-container">
          <FontAwesomeIcon
            icon={faChevronUp}
            className="arrow"
            onClick={scrollUp}
          />
          <ul>
            {images.map((image: string, index: number) => (
              <li key={index}>
                <img
                  onClick={() => setCurrentImagePath(image)}
                  src={ENV.SERVER_HOST + image}
                  alt="imagen"
                  className={
                    currentImagePath === image
                      ? 'selected small-images'
                      : 'small-images'
                  }
                />
              </li>
            ))}
          </ul>
          <FontAwesomeIcon
            icon={faChevronDown}
            className="arrow"
            onClick={scrollDown}
          />
        </div>
        <img
          className="big-image"
          src={ENV.SERVER_HOST + currentImagePath}
          alt=""
        />
      </div>
      <div className="mobile-slider">
        {images.map((image: string, index: number) => (
          <img
            key={index}
            onClick={() => setCurrentImagePath(image)}
            src={ENV.SERVER_HOST + image}
            alt="imagen"
            className={
              currentImagePath === image
                ? 'selected mobile-images'
                : 'mobile-images'
            }
          />
        ))}
      </div>
    </section>
  );
}
