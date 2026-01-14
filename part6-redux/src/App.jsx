import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  const handlePlusPress = () => {
    setCount(count + 1)
  }

  const handleMinusPress = () => {
    setCount(count - 1)
  }

  const handleResetPress = () => {
    setCount(0)
  }

  return (
    <>
      <button onClick={handlePlusPress}>plus</button>
      <button onClick={handleMinusPress}>minus</button>
      <button onClick={handleResetPress}>reset</button>
      {count}
    </>
  )
}

export default App
