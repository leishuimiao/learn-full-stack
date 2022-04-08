import Page from '@/components/Layout'
import React, { Component, PropsWithChildren } from 'react'
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '../my-redux'
import { Counter2, RootState } from '../store.d'

/**
 * 函数式组件使用示例
 */
function Counter2Cpm(props: PropsWithChildren<any>) {
  const state = useSelector<RootState, Counter2>(state => state.counter2)
  const dispatch = useDispatch<Dispatch>()
  const handleDouble = () => dispatch({ type: 'DOUBLE' })
  const handleTriple = () => dispatch({ type: 'TRIPLE' })
  return (
    <>
      <h2>{ state }</h2>
      <button onClick={handleDouble}>Double</button>
        - 
      <button onClick={handleTriple}>Triple</button>
    </>
  )
}

/**
 * 类组件使用示例
 */
const connector = connect(
  // mapStateToProps
  (state: RootState) => ({ counter1: state.counter1 }),
  // mapDispatchToProps
  (dispatch: Dispatch) => ({
    increment() {
      dispatch({ type: 'INCREMENT', payload: 100 })
    },
    decrement() {
      dispatch({ type: 'DECREMENT' })
    }
  })
)

type IndexProps = ConnectedProps<typeof connector>;

@(connector as any)
export default class Index extends Component<IndexProps> {
  render() {
    const { counter1, increment, decrement } = this.props
    return (
      <Page title="react-redux">
        <h2>{ counter1.value }</h2>
        <button onClick={increment}>Increment</button>
         - 
        <button onClick={decrement}>Decrement</button>
        <Counter2Cpm />
      </Page>
    )
  }
}
