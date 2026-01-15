import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createStore } from 'redux'
import App from './App.jsx'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default: // if none of the above matches, code comes here
      return state
  }
}

const store = createStore(counterReducer)
const root = createRoot(document.getElementById('root'))

store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
  renderApp()
})

const renderApp = () => {
  root.render(
    <StrictMode>
      <App store={store} />
    </StrictMode>,
  )
}

renderApp()