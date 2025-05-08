// code requirements: three buttons to give feedback (good, neutral, bad), the amount each feedback section gets, the total feedback submissions,
// the average score of the feedback, the % of good feedback, statistics should be its own component, conditionally render statistics, in the statistics 
// component refactor the code so each stat line is its own component
import { useState } from 'react'

const Button = ({onClick, feedback}) => ( <button onClick={onClick}>{feedback}</button> )

const StatisticLine = ({text, value}) => (<p>{text} {value}</p>)

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = (good + bad*-1)/total
  const positive = (good/total) * 100 + "%"
  if (total == 0) return <p>No feedback given</p>
  return (
    <div>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='total' value={total} />
      <StatisticLine text='average' value={average} />
      <StatisticLine text='positive' value={positive} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good+1)} feedback='good' />
      <Button onClick={() => setNeutral(neutral+1)} feedback='neutral' />
      <Button onClick={() => setBad(bad+1)} feedback='bad' />
      <h1>statistics</h1> 
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App