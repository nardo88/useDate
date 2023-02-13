import { IDate, useDate } from './useDate/useDate'

function App() {
  const dayjs: IDate = useDate()
  dayjs().getDaysOfMoth()

  // форматирование. вывод дней и часов с ошибкой

  // endOf потестировать конец года

  return (
    <div className="App">
      <ul></ul>
    </div>
  )
}

export default App
