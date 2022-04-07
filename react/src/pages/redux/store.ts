import { RootState, Counter2, Counter1 } from './store.d';
import { AnyAction, createStore, applyMiddleware, combineReducers, Reducer } from './my-redux'
import thunk from './middlewares/thunk'
import promise from './middlewares/promise'
import logger from './middlewares/logger'

function reducer (state: Counter1 = { value: 0 }, { type, payload = 1 }: AnyAction) {
  switch (type) {
    case 'INCREMENT':
      return { ...state, value: state.value + payload}
    case 'DECREMENT':
      return { ...state, value: state.value - payload }
    default:
      return {  ...state }
  }
}

function reducer2 (state: Counter2 = 100, { type, payload = 1 }: AnyAction) {
  switch (type) {
    case 'DOUBLE':
      return state * 2
    case 'TRIPLE':
      return state * 3
    default:
      return state
  }
}

const combinationReducer = combineReducers<{
  [K in keyof RootState]: Reducer<RootState[K], AnyAction>
}>({
  counter1: reducer,
  counter2: reducer2
})

const store = createStore(combinationReducer, applyMiddleware(thunk, promise, logger))

export default store

// function f1(arg) {
//   console.log('f1', arg)
//   return arg
// }
// function f2(arg) {
//   console.log('f2', arg)
//   return arg
// }
// function f3(arg) {
//   console.log('f3', arg)
//   return arg
// }

// f1('omg')
// f2('omg')
// f3('omg')

// f3(f2(f1('omg')))

// function compose(...funcs) {
//   if (funcs.length === 0) return arg => arg

//   if (funcs.length === 1) return funcs[0]

//   return funcs.reduce((pre, cur) => (...args) => pre(cur(...args)))
// }

// compose(f1, f2, f3)('omg')