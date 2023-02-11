import { useDate } from './useDate/useDate'

function App() {
  const day = useDate(new Date('2023-01-01'))
  const month = useDate(new Date('2023-01-01'))
  const year = useDate(new Date('2023-01-01'))
  const newDate = day.add(2, 'day')
  const newMonth = month.add(2, 'month')
  const newYear = year.add(2, 'year')
  console.log('newDate: ', newDate)

  return (
    <div className="App">
      <ul>
        <li>
          <span className="mr8">2023-01-01 (add 2 days)</span>
          <span>{`${newDate.year}-${newDate.month + 1}-${newDate.day}`}</span>
        </li>
        <li>
          <span className="mr8">2023-01-01 (add 2 months)</span>
          <span>{`${newMonth.year}-${newMonth.month + 1}-${
            newMonth.day
          }`}</span>
        </li>
        <li>
          <span className="mr8">2023-01-01 (add 2 years)</span>
          <span>{`${newYear.year}-${newYear.month + 1}-${newYear.day}`}</span>
        </li>
      </ul>
    </div>
  )
}

export default App
