import React, { useEffect, useState } from 'react'
import styles from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'

const AvailableMeals = () => {
  const [mealsData, setMealsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchMeals = async () => {
    try {
      const response = await fetch(
        'your_url'
      )

      if (!response.ok) {
        throw new Error('Something went wrong!')
      }

      const data = await response.json()

      const loadedMeals = []

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        })
      }
      setMealsData(loadedMeals)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchMeals()
  }, [])

  if (isLoading) {
    return (
      <section className={styles.MealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className={styles.MealsError}>
        <p>{error}</p>
      </section>
    )
  }

  return (
    <section className={styles.meals}>
      <Card>
        <ul>
          {mealsData.map((d) => (
            <MealItem
              key={d.id}
              name={d.name}
              description={d.description}
              price={d.price}
              id={d.id}
            />
          ))}
        </ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
