import { useCart } from '../../hooks/useShopcar';
import { Product, Variation } from '../../model/entities';
import './cartBox.scss';
import { CustomButton } from '../button/button';

type PropsType = {
  item: Product | Variation['data'][number];
  uniqueId: string;
};

export function CartBox({ item, uniqueId }: PropsType) {
  const { cart, handleAddToCart, handleRemoveFromCart } = useCart();

  const getProduct = (id: string) => {
    const cartItem = cart.find((product) => product.cartId === id);

    if (cartItem) {
      return (
        <div className="cart-quantity">
          <button
            className="add-remove-unit less-button"
            onClick={() => handleRemoveFromCart(id)}
          >
            -
          </button>

          <p>{cartItem.quantity}</p>
          <button
            className="add-remove-unit"
            onClick={() => handleAddToCart(item, id)}
          >
            +
          </button>
        </div>
      );
    } else {
      return (
        <div
          onClick={() => handleAddToCart(item, uniqueId)}
          className="no-quantity"
        >
          <CustomButton title="Agregar"></CustomButton>
        </div>
      );
    }
  };

  return <div>{getProduct(uniqueId)}</div>;
}
