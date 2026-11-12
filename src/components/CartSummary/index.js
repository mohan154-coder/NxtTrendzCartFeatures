import CartContext from '../../context/CartContext'
import PaymentPopup from '../PaymentPopup'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(eachCartItem => {
        total += eachCartItem.price * eachCartItem.quantity
      })
      const itemsCount = cartList.length

      return (
        <>
          <div className="cart-summary-container">
            <h1 className="order-total-value">
              <span className="order-total-label">Order Total:</span> Rs {total}
              /-
            </h1>
            <p className="total-items">{itemsCount} Items in cart</p>
            <PaymentPopup
              buttonClassName="checkout-button"
              totalPrice={total}
              itemsCount={itemsCount}
            />
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
