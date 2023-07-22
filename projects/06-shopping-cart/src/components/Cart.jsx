import { useId } from 'react';
import { CartIcon, ClearCartIcon } from './Icons.jsx';
import './Cart.css';
import { useCart } from '../hooks/useCart.js';

function CartItem({ thumbnail, price, title, quantity, addToCart }) {
  return (
    <li>
      <img
        src={thumbnail}
        alt={title}
      />
      <div>
        <strong>{title}</strong> - ${price}
      </div>
      <footer>
        <small>Qty: {quantity}</small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  );
}

export function Cart() {
  const cartCheckboxId = useId();
  const { cart, clearCart, addToCart } = useCart();

  return (
    <>
      <label
        className='cart-button'
        htmlFor={cartCheckboxId}
      >
        <CartIcon />
      </label>
      <input
        type='checkbox'
        hidden
        id={cartCheckboxId}
      />
      <aside className='cart'>
        <ul>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              addToCart={() => addToCart(item)}
              {...item}
            />
          ))}
        </ul>
        <button
          onClick={clearCart}
          hidden={!cart.length}
        >
          <ClearCartIcon />
        </button>
      </aside>
    </>
  );
}
