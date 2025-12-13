import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2> give feedback</h2>
      <Button onClick={() => setGood(good + 1)} text='good'></Button>
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral'></Button>
      <Button onClick={() => setBad(bad + 1)} text='bad'></Button>

      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

const Button = ({ text, onClick }) => { return (<button onClick={onClick}>{text}</button>) }

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad > 0) {
    return (
      <table>
        <tbody>
          <tr><td><h2>Statistics</h2></td></tr>
          <StatisticLine text={'good'} value={good}> </StatisticLine>
          <StatisticLine text={'neutral'} value={neutral}> </StatisticLine>
          <StatisticLine text={'bad'} value={bad}> </StatisticLine>
          <StatisticLine text={'all'} value={good + neutral + bad}> </StatisticLine>
          <StatisticLine text={'average'} value={((good - bad) / (good + neutral + bad)).toFixed(2)}></StatisticLine>
          <StatisticLine text={'positive'} value={(100 * good / (good + neutral + bad)).toFixed(2) + '%'} ></StatisticLine>

        </tbody>
      </table >
    )
  } else {
    return (
      <div>
        <p> No feedback given </p>
      </div>
    )
  }
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

export default App