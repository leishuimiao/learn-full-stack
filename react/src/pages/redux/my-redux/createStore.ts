import { Action, Reducer, Store, StoreEnhancer } from './index.d'
import { isPlainObject } from './utils'

export default function createStore<S, A extends Action, Ext, StateExt>(
  reducer: Reducer<S, A>,
  enhancer?: StoreEnhancer<Ext, StateExt>
): Store<S & StateExt, A> & Ext {
  if (enhancer) {
    return enhancer(createStore)(reducer)
  }

  let currentState: any = undefined
  const currentListeners: (() => void)[] = []
  
  function getState() {
    return currentState
  }
  
  function dispatch<T extends A>(action: T): T {
    if (!isPlainObject(action)) {
      // 非纯对象
      throw new Error(
        `Actions must be plain objects. Instead, the actual type was: '${typeof
          action
        }'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.`
      )
    }

    currentState = reducer(currentState, action)
    currentListeners.forEach(listener => {
      listener && listener()
    })
    return action
  }
  
  function subscribe (listener: () => void) {
    currentListeners.push(listener)
    return () => {
      currentListeners.splice(currentListeners.indexOf(listener), 1)
    }
  }

  // 初始化默认值
  dispatch({ type: Date.now() + 'AKIGJHLW_ME-ERNL' } as A)

  return {
    getState,
    dispatch,
    subscribe
  } as Store<S & StateExt, A> & Ext
}