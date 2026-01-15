import { useState } from 'react'

function App({ store }) {
  const handlePlusPress = () => {
    store.dispatch({ type: 'INCREMENT' })
  }

  const handleMinusPress = () => {
    store.dispatch({ type: 'DECREMENT' })
  }

  const handleResetPress = () => {
    store.dispatch({ type: 'ZERO' })
  }

  return (
    <>
      <button onClick={handlePlusPress}>plus</button>
      <button onClick={handleMinusPress}>minus</button>
      <button onClick={handleResetPress}>reset</button>
      {store.getState()}
    </>
  )
}

export default App
