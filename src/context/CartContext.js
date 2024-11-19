import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  paymentMethod: '',
  displayMessage: false,
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  onChangePaymentMethod: () => {},
  onClickOrderButton: () => {},
})

export default CartContext
