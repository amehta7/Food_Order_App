import React, { useReducer } from 'react'
import CartContext from './cart-context'

const defaultCartState = {
  items: [],
  totalAmount: 0,
}

const cartReducer = (state = defaultCartState, action) => {
  if (action.type === 'ADD_TO_CART') {
    const updatedTotalAmt =
      state.totalAmount + action.item.price * action.item.amount

    const existingItemIndex = state.items.findIndex(
      (i) => i.id === action.item.id
    )

    const existItem = state.items[existingItemIndex]

    let updatedItems

    if (existItem) {
      const updatedItem = {
        ...existItem,
        amount: existItem.amount + action.item.amount,
      }
      updatedItems = [...state.items]
      updatedItems[existingItemIndex] = updatedItem
    } else {
      updatedItems = state.items.concat(action.item)
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmt,
    }
  }
  if (action.type === 'REMOVE_FROM_CART') {
    const existingItemIndex = state.items.findIndex((i) => i.id === action.id)

    const existItem = state.items[existingItemIndex]

    const updatedTotalAmt = state.totalAmount - existItem.price

    let updatedItems

    if (existItem.amount === 1) {
      updatedItems = state.items.filter((i) => i.id !== action.id)
    } else {
      const updatedItem = {
        ...existItem,
        amount: existItem.amount - 1,
      }
      updatedItems = [...state.items]
      updatedItems[existingItemIndex] = updatedItem
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmt,
    }
  }

  if (action.type === 'CLEAR') {
    return defaultCartState
  }

  return state
}

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  )

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD_TO_CART', item: item })
  }

  const removeFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE_FROM_CART', id: id })
  }

  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR' })
  }

  return (
    <CartContext.Provider
      value={{
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeFromCartHandler,
        clearCart: clearCartHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
