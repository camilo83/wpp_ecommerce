import { useState, useEffect } from 'react';
import './categoryBanner.scss';
import { ENV } from '../../utils/constants';
import { calcDiscount } from '../../utils/functions/calcDiscount';
import { Discount } from '../discount/discount';
import { Product } from '../../model/entities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { CartBox } from '../cartBox/cartBox';
import { Slide } from 'react-awesome-reveal';
import { CustomButton } from '../button/button';
import { ProductDetails } from '../productDetails/productDetails';
import { convertToPeso } from '../../utils/functions/convertToPeso';

type PropsType = {
  products: Product[];
};

export function CategoryBanner({ products }: PropsType) {
  const [itemIndex, setItemIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const goToNext = () => {
    setDirection('right');
    setItemIndex((prevIndex) =>
      prevIndex < products.length - 1 ? prevIndex + 1 : 0
    );
  };

  const goToPrev = () => {
    setDirection('left');
    setItemIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : products.length - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 300000);
    return () => clearInterval(interval);
  }, [products]);

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loadingProduct, setLoadingProduct] = useState(true);

  const openPopUp = (product: Product) => {
    setSelectedProduct(product);
    setIsPopUpOpen(true);
    setLoadingProduct(false);
  };

  const closePopUp = () => {
    setIsPopUpOpen(false);
    setLoadingProduct(true);
  };

  return (
    <>
      {isPopUpOpen && !loadingProduct && selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          closePopUp={closePopUp}
        ></ProductDetails>
      )}

      <section className="category-banner">
        {itemIndex > 0 ? (
          <div className="arrow visible" onClick={goToPrev}>
            <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
          </div>
        ) : (
          <div className="arrow"></div>
        )}

        <Slide direction={direction} key={itemIndex} triggerOnce={false}>
          <div className="product-container">
            <div className="banner-image-container">
              <img
                src={
                  ENV.SERVER_HOST +
                  products[itemIndex].attributes.images.data[0].attributes.url
                }
                alt="Product Image"
              />
            </div>
            <div className="product-info">
              <h2 className="product-name">
                {products[itemIndex].attributes.name}
              </h2>
              <div className="price-section">
                <p>
                  <Discount
                    number={calcDiscount(
                      products[itemIndex].attributes.price,
                      products[itemIndex].attributes.discount_price
                    )}
                  ></Discount>
                </p>
                <p>{convertToPeso(products[itemIndex].attributes.price)}</p>
              </div>
              {products[itemIndex].attributes.variations.data.length > 0 ? (
                <div
                  onClick={() => openPopUp(products[itemIndex])}
                  className="cart-box-container"
                >
                  <CustomButton title="Ver Producto"></CustomButton>
                </div>
              ) : (
                <div className="cart-box-container">
                  <CartBox
                    item={products[itemIndex]}
                    uniqueId={`product-${products[itemIndex].id}-no-variation`}
                  />
                </div>
              )}
            </div>
          </div>
        </Slide>

        {itemIndex < products.length - 1 ? (
          <div className="arrow visible" onClick={goToNext}>
            <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
          </div>
        ) : (
          <div className="arrow"></div>
        )}
      </section>
    </>
  );
}
