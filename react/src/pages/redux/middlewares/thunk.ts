import { MiddlewareAPI, Dispatch } from '@/pages/redux/my-redux';

export default function thunk<S>({ dispatch, getState }: MiddlewareAPI) {
  return (next: Dispatch) => (action: (_dispatch: Dispatch, _getState: () => S) => void) => {
    if (typeof action === 'function') {
      // 处理函数类型的 action
      return action(dispatch, getState)
    }

    return next(action)
  }
}