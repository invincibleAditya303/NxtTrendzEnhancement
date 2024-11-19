import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
    paymentMethod: '',
    displayMessage: false,
  }

  decrementCartItemQuantity = productId => {
    const {cartList} = this.state
    const deleteItem = cartList.filter(
      eachproduct => eachproduct.id === productId,
    )
    console.log(deleteItem[0])

    if (deleteItem[0].quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachproduct => {
          if (eachproduct.id === productId) {
            const quantity = eachproduct.quantity - 1
            return {...eachproduct, quantity}
          }
          return eachproduct
        }),
      }))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.filter(
          eachproduct => eachproduct.id !== productId,
        ),
      }))
    }
  }

  incrementCartItemQuantity = productId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachproduct => {
        if (eachproduct.id === productId) {
          const quantity = eachproduct.quantity + 1
          return {...eachproduct, quantity}
        }
        return eachproduct
      }),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = productId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(
        eachproduct => eachproduct.id !== productId,
      ),
    }))
  }

  onChangePaymentMethod = paymentOption => {
    this.setState({paymentMethod: paymentOption})
  }

  onClickOrderButton = () => {
    const {paymentMethod} = this.state
    if (paymentMethod === 'COD') {
      this.setState({displayMessage: true})
    }
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const cartProduct = cartList.find(
      eachproduct => eachproduct.id === product.id,
    )
    console.log(cartProduct)
    if (cartProduct === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachproduct => {
          if (eachproduct.id === cartProduct.id) {
            return {...eachproduct, quantity: eachproduct.quantity + 1}
          }
          return eachproduct
        }),
      }))
    }
  }

  render() {
    const {cartList, paymentMethod, displayMessage} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          paymentMethod,
          displayMessage,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          onChangePaymentMethod: this.onChangePaymentMethod,
          onClickOrderButton: this.onClickOrderButton,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
