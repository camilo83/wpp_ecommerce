import { useState } from 'react';
import { Product } from '../../model/entities';
import { ENV } from '../../utils/constants';
import { calcDiscount } from '../../utils/functions/calcDiscount';
import { CartBox } from '../cartBox/cartBox';
import { Discount } from '../discount/discount';
import './productsGrid.scss';
import { ProductDetails } from '../productDetails/productDetails';
import { CustomButton } from '../button/button';
import { convertToPeso } from '../../utils/functions/convertToPeso';

type propsType = {
  products: Product[];
};

export function ProductsGrid({ products }: propsType) {
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
      <div className="product-grid-container">
        <ul className="product-grid">
          {products.map((product: Product) => (
            <li key={product.id} className="product-card">
              <div
                className="link-container"
                onClick={() => openPopUp(product)}
              >
                <div className="image-container">
                  <img
                    src={
                      ENV.SERVER_HOST +
                      product.attributes.images.data[0].attributes.url
                    }
                    alt=""
                  />
                </div>
                <h3>{product.attributes.name}</h3>
                <p className="regular-price">
                  {convertToPeso(product.attributes.price)}
                </p>
                <div className="price-section">
                  <div className="discount-container">
                    <Discount
                      number={calcDiscount(
                        product.attributes.price,
                        product.attributes.discount_price
                      )}
                    ></Discount>
                  </div>
                </div>
              </div>
              {product.attributes.variations.data.length > 0 ? (
                <div
                  onClick={() => openPopUp(product)}
                  className="cart-box-container"
                >
                  <CustomButton title="Ver Producto"></CustomButton>
                </div>
              ) : (
                <div className="cart-box-container">
                  <CartBox
                    item={product}
                    uniqueId={`product-${product.id}-no-variation`}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
