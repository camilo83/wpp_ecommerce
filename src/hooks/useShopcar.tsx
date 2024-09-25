import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  clearCart,
  updateCartItemQuantity,
  removeItemCompletely,
} from '../redux/shopCarSlice';
import { useEffect } from 'react';
import { RootState } from '../store/store';
import { Product, Variation } from '../model/entities';

export function useCart() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.shopcarState.cart);

  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart');

    if (savedCart) {
      const items = JSON.parse(savedCart);
      items.forEach((item: any) => {
        const existingItem = cart.find(
          (cartItem) => cartItem.cartId === item.cartId
        );
        if (existingItem) {
          dispatch(
            updateCartItemQuantity({ id: item.cartId, quantity: item.quantity })
          );
        } else {
          dispatch(
            addToCart({
              cartId: item.cartId,
              productId: item.productId,
              variationId: item.variationId,
              quantity: item.quantity,
            })
          );
        }
      });
    }
  };

  useEffect(() => {
    loadCartFromLocalStorage();
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (
    item: Product | Variation['data'][number],
    uniqueId: string
  ) => {
    let productId;
    let variationId;
    if ('attributes' in item && 'variations' in item.attributes) {
      productId = item.id;
      variationId = undefined;
    } else {
      productId = item.attributes.product.data.id;
      variationId = item.id;
    }

    dispatch(
      addToCart({ cartId: uniqueId, productId, variationId, quantity: 1 })
    );
  };

  const handleRemoveFromCart = (uniqueId: string) => {
    dispatch(removeFromCart({ id: uniqueId, quantity: -1 }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    localStorage.removeItem('cart');
  };

  const handleRemoveItemCompletely = (uniqueId: string) => {
    dispatch(removeItemCompletely(uniqueId));
  };

  const countItems = cart.reduce((acc, product) => acc + product.quantity, 0);

  return {
    cart,
    handleAddToCart,
    handleRemoveFromCart,
    handleClearCart,
    countItems,
    handleRemoveItemCompletely,
  };
}
