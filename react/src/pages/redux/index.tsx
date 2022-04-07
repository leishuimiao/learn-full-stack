import React, { useEffect } from 'react'
import Page from '@/components/Page'
import useForceUpdate from '@/hooks/useForceUpdate';
import store from './store';
import { Action, Dispatch } from './my-redux';

export default function Redux() {
  const { getState, dispatch, subscribe } = store
  const forceUpdate = useForceUpdate()
  // 异步更新
  const handleAsync = () => {
    dispatch(((originDispatch: Dispatch) => {
        setTimeout(() => {
          originDispatch({ type: 'INCREMENT', payload: 2 });
        }, 1000);
      }) as unknown as Action)
  }
  // Promise更新
  const hanldePromise = () => {
    dispatch(Promise.resolve({ type: 'DECREMENT' }) as unknown as Action)
  }

  useEffect(() => {
    const unsubscribe = subscribe(forceUpdate)
    return unsubscribe
  }, [forceUpdate, subscribe])

  return (
    <Page title="redux">
      <h2>counter1 State: { getState().counter1.value }</h2>
      <button onClick={() => dispatch({ type: 'INCREMENT', payload: 2 })}>Increment</button>
       - 
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
      <br />
      <br />
      <button onClick={handleAsync}>AsyncIncrement</button>
       - 
      <button onClick={hanldePromise}>PromiseDecrement</button>

      <h2>counter2 State: { getState().counter2 }</h2>
      <button onClick={() => dispatch({ type: 'DOUBLE' })}>Double</button>
       - 
      <button onClick={() => dispatch({ type: 'TRIPLE' })}>Triple</button>
    </Page>
  )
}
