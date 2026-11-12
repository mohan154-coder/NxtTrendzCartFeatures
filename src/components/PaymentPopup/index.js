import {Component} from 'react'
import Popup from 'reactjs-popup'
import {
  FaRegCreditCard,
  FaUniversity,
  FaMobileAlt,
  FaWallet,
  FaMoneyBillWave,
  FaCheckCircle,
} from 'react-icons/fa'
import {IoMdClose} from 'react-icons/io'
import 'reactjs-popup/dist/index.css'

import './index.css'

const paymentOptionsList = [
  {id: 'CARD', displayText: 'Card', isDisabled: true, icon: FaRegCreditCard},
  {
    id: 'NET_BANKING',
    displayText: 'Net Banking',
    isDisabled: true,
    icon: FaUniversity,
  },
  {id: 'UPI', displayText: 'UPI', isDisabled: true, icon: FaMobileAlt},
  {id: 'WALLET', displayText: 'Wallet', isDisabled: true, icon: FaWallet},
  {
    id: 'CASH_ON_DELIVERY',
    displayText: 'Cash on Delivery',
    isDisabled: false,
    icon: FaMoneyBillWave,
  },
]

class PaymentPopup extends Component {
  state = {selectedPaymentMethod: '', isOrderPlaced: false}

  onChangePaymentMethod = event => {
    this.setState({selectedPaymentMethod: event.target.id})
  }

  onClickConfirmOrder = () => {
    this.setState({isOrderPlaced: true})
  }

  onClosePopup = () => {
    this.setState({selectedPaymentMethod: '', isOrderPlaced: false})
  }

  renderPaymentOptions = () => {
    const {selectedPaymentMethod} = this.state

    return paymentOptionsList.map(eachOption => {
      const {id, displayText, isDisabled, icon: PaymentIcon} = eachOption
      const isChecked = selectedPaymentMethod === id
      const selectedClass = isChecked ? 'selected-option' : ''
      const disabledClass = isDisabled ? 'disabled-option' : ''

      return (
        <li
          className={`payment-option-item ${selectedClass} ${disabledClass}`}
          key={id}
        >
          <input
            type="radio"
            id={id}
            name="paymentMethod"
            className="payment-radio-input"
            disabled={isDisabled}
            checked={isChecked}
            onChange={this.onChangePaymentMethod}
          />
          <label htmlFor={id} className="payment-option-label">
            <PaymentIcon className="payment-option-icon" />
            {displayText}
          </label>
        </li>
      )
    })
  }

  renderPaymentDetails = () => {
    const {totalPrice, itemsCount} = this.props
    const {selectedPaymentMethod} = this.state
    const isConfirmDisabled = selectedPaymentMethod !== 'CASH_ON_DELIVERY'

    return (
      <>
        <h1 className="payment-heading">Select Payment Method</h1>
        <ul className="payment-options-list">{this.renderPaymentOptions()}</ul>
        <div className="payment-summary-container">
          <p className="payment-summary-text">Items: {itemsCount}</p>
          <p className="payment-summary-total">
            Total Price: Rs {totalPrice}/-
          </p>
        </div>
        <button
          type="button"
          className="confirm-order-button"
          disabled={isConfirmDisabled}
          onClick={this.onClickConfirmOrder}
        >
          Confirm Order
        </button>
      </>
    )
  }

  renderSuccessMessage = () => (
    <div className="order-success-container">
      <FaCheckCircle className="order-success-icon" />
      <p className="order-success-message">
        Your order has been placed successfully
      </p>
    </div>
  )

  render() {
    const {buttonClassName} = this.props
    const {isOrderPlaced} = this.state

    return (
      <Popup
        modal
        onClose={this.onClosePopup}
        trigger={
          <button type="button" className={buttonClassName}>
            Checkout
          </button>
        }
      >
        {close => (
          <div className="payment-popup-container">
            <button
              type="button"
              className="payment-close-button"
              aria-label="close"
              onClick={close}
            >
              <IoMdClose size={22} />
            </button>
            {isOrderPlaced
              ? this.renderSuccessMessage()
              : this.renderPaymentDetails()}
          </div>
        )}
      </Popup>
    )
  }
}

export default PaymentPopup
