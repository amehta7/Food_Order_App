import React, { useContext } from 'react'
import styles from './MealItem.module.css'
import MealItemForm from './MealItemForm'
import CartContext from '../../../store/cart-context'

const MealItem = (props) => {
  //const price = `$${props.price.toFixed(2)}`

  const cartCtx = useContext(CartContext)

  const addToCartHandler = (amt) => {
    const item = {
      id: props.id,
      name: props.name,
      description: props.description,
      price: props.price,
      amount: amt,
    }
    cartCtx.addItem(item)
  }
  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>

        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>$ {props.price.toFixed(2)}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  )
}

export default MealItem
