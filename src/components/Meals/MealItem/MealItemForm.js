import React, { useRef, useState } from 'react'
import styles from './MealItemForm.module.css'
import Input from '../../UI/Input'

const MealItemForm = (props) => {
  const amtRef = useRef()

  const [amtIsValid, setAmtIsValid] = useState(true)

  const submitHandler = (event) => {
    event.preventDefault()

    const enteredAmt = amtRef.current.value
    const enteredAmtNumber = +enteredAmt //convert string to number

    if (
      enteredAmt.trim().length === 0 ||
      enteredAmtNumber < 0 ||
      enteredAmtNumber > 5
    ) {
      setAmtIsValid(false)
      return
    }

    props.onAddToCart(enteredAmtNumber)
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amtRef}
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add </button>
      {!amtIsValid && <p>Please enter a valid amount(1-5). </p>}
    </form>
  )
}

export default MealItemForm
