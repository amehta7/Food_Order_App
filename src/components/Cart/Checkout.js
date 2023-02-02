import React, { useRef, useState } from 'react'
import styles from './Checkout.module.css'

const isEmpty = (value) => value.trim() === ''
const isFiveCharCode = (value) => value.trim().length === 5

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  })

  const nameRef = useRef()
  const streetRef = useRef()
  const cityRef = useRef()
  const postalRef = useRef()

  const submitHandler = (e) => {
    e.preventDefault()

    const nameInput = nameRef.current.value
    const streetInput = streetRef.current.value
    const cityInput = cityRef.current.value
    const postalInput = postalRef.current.value

    const nameIsValid = !isEmpty(nameInput)
    const streetIsValid = !isEmpty(streetInput)
    const cityIsValid = !isEmpty(cityInput)
    const postalIsValid = isFiveCharCode(postalInput)

    setFormInputValidity({
      name: nameIsValid,
      street: streetIsValid,
      city: cityIsValid,
      postalCode: postalIsValid,
    })

    const formIsValid =
      nameIsValid && streetIsValid && cityIsValid && postalIsValid

    if (!formIsValid) {
      console.log('error in form')
      return
    }

    props.onConfirm({
      name: nameInput,
      street: streetInput,
      city: cityInput,
      postalCode: postalInput,
    })
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div
        className={`${styles.control} ${
          formInputValidity.name ? '' : styles.invalid
        }`}
      >
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameRef} />
        {!formInputValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div
        className={`${styles.control} ${
          formInputValidity.street ? '' : styles.invalid
        }`}
      >
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetRef} />
        {!formInputValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div
        className={`${styles.control} ${
          formInputValidity.city ? '' : styles.invalid
        }`}
      >
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityRef} />
        {!formInputValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div
        className={`${styles.control} ${
          formInputValidity.postalCode ? '' : styles.invalid
        }`}
      >
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalRef} />
        {!formInputValidity.postalCode && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={styles.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  )
}

export default Checkout
