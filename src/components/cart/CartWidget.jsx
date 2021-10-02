import { useSelector } from 'react-redux';
import React from 'react';
import { useHistory } from 'react-router';

export default function CartWidget() {
  const cartItems = useSelector((state) => state.cartitems);
  const history = useHistory();
  let number = 0;
  if (cartItems.length > 0) {
    cartItems.forEach((i) => {
      if (!i.delete) number += i.quantity;
    });
  }

  const handleClick = () => {
    history.push('/cart');
  };

  return (
        <React.Fragment>
        <div className="header-controls-pic header-controls-cart" onClick={() => handleClick()}>
            { number > 0 ? (<div className="header-controls-cart-full">{number}</div>) : null }
            <div className="header-controls-cart-menu"></div>
        </div>
        </React.Fragment>
  );
}
