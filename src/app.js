import React from "react"
import { createElement } from "./utils.js"
import "./styles.css"

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list

  function nounForm(number, text) {
    number = Math.abs(number)

    if (number % 10 === 1 && number % 100 !== 11) {
      return text[0]
    } else if (
      number % 10 >= 2 &&
      number % 10 <= 4 &&
      (number % 100 < 10 || number % 100 >= 20)
    ) {
      return text[1]
    } else {
      return text[0]
    }
  }

  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map((item) => (
            <div key={item.code} className="List-item">
              <div
                className={"Item" + (item.selected ? " Item_selected" : "")}
                onClick={() => {
                  store.selectItem(item.code)
                  item.countClicks++
                }}>
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  {item.countClicks === 0
                    ? item.title
                    : item.title +
                      ` | Выделяли ${item.countClicks} ${nounForm(
                        item.countClicks,
                        ["раз", "раза"]
                      )}`}
                </div>
                <div className="Item-actions">
                  <button onClick={() => store.deleteItem(item.code)}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
