import { Product, Variation } from '../../model/entities';
import './productDetails.scss';
import { useEffect, useState } from 'react';
import { ImageCarousel } from '../imagesContainer/imagesContainer';
import { CartBox } from '../cartBox/cartBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Fade } from 'react-awesome-reveal';
import { convertToPeso } from '../../utils/functions/convertToPeso';

type PropsType = {
  product: Product;
  closePopUp: () => void;
};

export function ProductDetails({ product, closePopUp }: PropsType) {
  const [images, setImages] = useState<string[]>([]);
  const [selectedVariation, setSelectedVariation] = useState<
    Variation['data'][0] | null
  >(null);
  const [item, setItem] = useState<Product | Variation['data'][number]>();
  const [attributes, setAttributes] = useState<{ [key: string]: Set<string> }>(
    {}
  );

  useEffect(() => {
    async function fetchData() {
      if (product) {
        try {
          if (product.attributes.variations.data.length === 0) {
            const newImages = product.attributes.images.data
              .map((image) => image.attributes?.url)
              .filter(Boolean);

            setImages(newImages);
            setItem(product);
          } else {
            const variations = product.attributes.variations.data;

            setSelectedVariation(variations[0]);

            const newAttributes: { [key: string]: Set<string> } = {};

            variations.forEach((variation) => {
              variation.attributes.attributes.data.forEach((attr) => {
                const attributeName = attr.attributes.name;

                variation.attributes.attribute_values.data.forEach(
                  (attrValue) => {
                    const attributeValue = attrValue.attributes.value;

                    if (!newAttributes[attributeName]) {
                      newAttributes[attributeName] = new Set();
                    }

                    newAttributes[attributeName].add(attributeValue);
                  }
                );
              });
            });

            setAttributes(newAttributes);
          }
        } catch (error) {
          console.error('Error fetching product images:', error);
        }
      }
    }

    fetchData();
  }, [product]);

  useEffect(() => {
    if (selectedVariation) {
      try {
        const newImages = selectedVariation.attributes.images.data
          .map((image) => image.attributes?.url)
          .filter(Boolean);

        setImages(newImages);
        setItem(selectedVariation);
      } catch (error) {
        console.error('Error fetching product images:', error);
      }
    }
  }, [selectedVariation]);

  const handleAttributeClick = (
    attributeName: string,
    attributeValue: string
  ) => {
    const variation = product.attributes.variations.data.find((variation) => {
      return (
        variation.attributes.attributes.data.some(
          (attr) => attr.attributes.name === attributeName
        ) &&
        variation.attributes.attribute_values.data.some(
          (attrValueData) => attrValueData.attributes.value === attributeValue
        )
      );
    });

    if (variation) {
      setSelectedVariation(variation);
    }
  };

  const isProduct = (
    item: Product | Variation['data'][number]
  ): item is Product => {
    return (item as Product).attributes.variations !== undefined;
  };

  return (
    <div className="details-popup">
      <Fade direction="up">
        <div className="details-container">
          <div className="images-container">
            <ImageCarousel images={images}></ImageCarousel>
          </div>
          <div className="product-info-container">
            {item && (
              <>
                {!isProduct(item) && (
                  <div className="attributes-selection">
                    {Object.entries(attributes).map(
                      ([attributeName, values]) => (
                        <div key={attributeName}>
                          <strong>{attributeName}: </strong>
                          {[...values].map((value) => (
                            <button
                              key={value}
                              onClick={() =>
                                handleAttributeClick(attributeName, value)
                              }
                              style={{
                                padding: '5px 10px',
                                margin: '0 5px',
                                cursor: 'pointer',
                                border:
                                  selectedVariation &&
                                  selectedVariation.attributes.attribute_values.data.some(
                                    (attrValue) =>
                                      attrValue.attributes.value === value
                                  )
                                    ? '2px solid blue'
                                    : '1px solid gray',
                              }}
                            >
                              {value}
                            </button>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                )}
                <h2>{item.attributes.name}</h2>
                <p className="description">{item.attributes.description}</p>
                <div className="price-section">
                  <p className="price">
                    {convertToPeso(item.attributes.price)}
                  </p>
                  <div className="discount-price">
                    {item.attributes.discount_price
                      ? convertToPeso(item.attributes.discount_price)
                      : ''}
                  </div>
                </div>

                <CartBox
                  item={selectedVariation || product}
                  uniqueId={
                    selectedVariation
                      ? `product-${product.id}-variation-${selectedVariation.id}`
                      : `product-${product.id}-no-variation`
                  }
                />
              </>
            )}
          </div>
          <FontAwesomeIcon
            onClick={closePopUp}
            icon={faClose}
            className="close-icon"
          ></FontAwesomeIcon>
        </div>
      </Fade>
    </div>
  );
}
