import { useState, useEffect } from 'react';
import { useCart } from '../../../../hooks/useShopcar';
import './cartStatus.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { ProductsRepo } from '../../../../api/products';
import { CartItem } from '../../../../model/entities';
import { ENV } from '../../../../utils/constants';
import { CustomButton } from '../../../button/button';
import { Fade } from 'react-awesome-reveal';
import { StatusCartBox } from '../../../statusCartBox/statusCartBox';
import { convertToPeso } from '../../../../utils/functions/convertToPeso';

const productCtrl = new ProductsRepo();

type statusItem = {
  attributes: any;
  id: number;
  quantity: number;
  variationId: number;
};

export function CartStatus() {
  const [isOpen, setIsOpen] = useState(false);
  const { countItems, cart, handleRemoveItemCompletely, handleClearCart } =
    useCart();
  const [cartProducts, setCartProducts] = useState<statusItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const openCloseSummary = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchCartProducts = async () => {
      const fetchedProducts: any[] = [];

      await Promise.all(
        cart.map(async (item: CartItem) => {
          if (item.variationId) {
            const product = await productCtrl.getProductByVariationId(
              item.variationId
            );
            fetchedProducts.push({
              ...product,
              quantity: item.quantity,
              variationId: item.variationId,
            });
          } else {
            const product = await productCtrl.getProductById(item.productId);
            fetchedProducts.push({
              ...product,
              quantity: item.quantity,
              variationId: null,
            });
          }
        })
      );

      setCartProducts(fetchedProducts);

      const total = fetchedProducts.reduce((acc, product) => {
        const price = product.variation
          ? product.variation.attributes.price
          : product.attributes.price;
        return acc + price * product.quantity;
      }, 0);

      setTotalPrice(total);
    };

    fetchCartProducts();
  }, [cart]);

  const calcItemPrice = (price: number, quantity: number) => {
    return price * quantity;
  };

  return (
    <div className="cart-container">
      <div className="cart-status">
        {countItems > 0 ? (
          <div className="busy-cart">
            {isOpen ? (
              <Fade direction="up">
                <div className="cart-open">
                  <button
                    onClick={openCloseSummary}
                    className="close-cart-button"
                  >
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      onClick={() => setIsOpen(!isOpen)}
                    ></FontAwesomeIcon>
                  </button>
                  <hr />
                  <ul className="cart-summary">
                    {cartProducts.map((product: statusItem) => (
                      <li key={product.id} className="cart-item">
                        <img
                          src={
                            ENV.SERVER_HOST +
                            product.attributes.images.data[0]?.attributes?.url
                          }
                          alt={product.attributes.name}
                        />
                        <div className="item-info">
                          <p className="product-name">
                            {product.attributes.name}
                          </p>

                          <StatusCartBox
                            item={product}
                            uniqueId={
                              product.variationId
                                ? `product-${product.attributes.product.data.id}-variation-${product.variationId}`
                                : `product-${product.id}-no-variation`
                            }
                          />
                          <p>
                            {convertToPeso(
                              calcItemPrice(
                                product.attributes.price,
                                product.quantity
                              )
                            )}
                          </p>
                        </div>
                        <button className="trash-button">
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() =>
                              handleRemoveItemCompletely(
                                product.variationId
                                  ? `product-${product.attributes.product.data.id}-variation-${product.variationId}`
                                  : `product-${product.id}-no-variation`
                              )
                            }
                          ></FontAwesomeIcon>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <hr />
                  <div className="cart-total">
                    <p>Total</p>
                    <p>{convertToPeso(totalPrice)}</p>
                  </div>
                  <hr />
                  <CustomButton title="Pagar Ahora"></CustomButton>
                  <button className="clear-cart" onClick={handleClearCart}>
                    Limpiar Carrito
                  </button>
                </div>
              </Fade>
            ) : (
              <div className="cart-closed">
                <button onClick={openCloseSummary}>
                  <FontAwesomeIcon
                    icon={faChevronUp}
                    onClick={() => setIsOpen(!isOpen)}
                  ></FontAwesomeIcon>
                  <p>Ver Carrito</p>
                </button>
                <p className="cart-qtty">{countItems}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="empty-cart">Carrito de compras vacío</div>
        )}
      </div>
    </div>
  );
}
