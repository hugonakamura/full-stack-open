import { useState } from 'react'

const App = () => {
  const [counter, setCounter] = useState(5858)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)

  const setToZero = () => setCounter(0)

  return (
    <div>
      <Display counter={counter}></Display>
      <Button
        onClick={increaseByOne}
        text='plus'
      />
      <Button
        onClick={setToZero}
        text='zero'
      />
      <Button
        onClick={decreaseByOne}
        text='minus'
      />
    </div>

  )
}

// const Display = ({counter}) => {
//   return (
//     <div>{counter}</div>
//   )
// }

const Display = ({ counter }) => <div>{counter}</div>

// const Button = (props) => {
//   return (
//     <button onClick={props.onClick}>
//       {props.text}
//     </button>
//   )
// }

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

export default App