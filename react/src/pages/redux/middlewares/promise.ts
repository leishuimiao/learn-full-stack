import { MiddlewareAPI, Dispatch, AnyAction } from '@/pages/redux/my-redux';

function isPormise(arg?: any) {
  return arg instanceof Promise || typeof (arg?.then) === 'function'
}

export default function promise({ dispatch }: MiddlewareAPI) {
  return (next: Dispatch) => (action: AnyAction) => {
    return isPormise(action) ? action.then(dispatch) : next(action)
  }
}