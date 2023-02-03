import React, { useContext, useState } from 'react'
import styles from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import Checkout from './Checkout'

const Cart = (props) => {
  const [isClicked, setIsClicked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)

  const cartCtx = useContext(CartContext)

  const totalAmt = `$ ${cartCtx.totalAmount.toFixed(2)}`

  const hasItems = cartCtx.items.length > 0

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  }

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 })
  }

  const orderHandler = () => {
    setIsClicked(true)
  }

  const submitHandler = async (userData) => {
    setIsSubmitting(true)
    await fetch(
      'your_url',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    )
    setIsSubmitting(false)
    setDidSubmit(true)
    cartCtx.clearCart()
  }

  const cartItems = cartCtx.items.map((c) => (
    <CartItem
      key={c.id}
      name={c.name}
      price={c.price}
      amount={c.amount}
      onRemove={cartItemRemoveHandler.bind(null, c.id)}
      onAdd={cartItemAddHandler.bind(null, c)}
    />
  ))

  const cartModalContent = (
    <React.Fragment>
      <ul className={styles['cart-items']}>{cartItems}</ul>
      <div className={styles.total}>
        <span>Total amount</span>
        <span>{totalAmt}</span>
      </div>
      {isClicked && (
        <Checkout onConfirm={submitHandler} onCancel={props.onHideCart} />
      )}
      {!isClicked && (
        <div className={styles.actions}>
          <button className={styles['button--alt']} onClick={props.onHideCart}>
            Close
          </button>
          {hasItems && (
            <button className={styles.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  )

  const isSubmittingContent = <p>Sending order data...</p>

  const didSubmitContent = (
    <React.Fragment>
      <p>Successfully sent the order!!!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  )

  return (
    <Modal onCloseHideCart={props.onHideCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingContent}
      {!isSubmitting && didSubmit && didSubmitContent}
    </Modal>
  )
}

export default Cart
