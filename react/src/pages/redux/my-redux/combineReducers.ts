import { Action, ActionFromReducersMapObject, AnyAction, CombinedState, Reducer, ReducersMapObject, StateFromReducersMapObject } from './index.d';

export function combineReducers<S>(
  reducers: ReducersMapObject<S, any>
): Reducer<CombinedState<S>>
export function combineReducers<S, A extends Action = AnyAction>(
  reducers: ReducersMapObject<S, A>
): Reducer<CombinedState<S>, A>
export default function combineReducers<M extends ReducersMapObject>(
  reducers: M
): Reducer<
  CombinedState<StateFromReducersMapObject<M>>,
  ActionFromReducersMapObject<M>
>;

export default function combineReducers<M extends ReducersMapObject<any, any>>(
  reducers: M
) { 
 return function combination(
   state: CombinedState<any> = {},
   action: ActionFromReducersMapObject<M>
) {
   const nextState: { [K in keyof M]: CombinedState<any> } = {} as any
   let hasChanged = false
   for (const key in reducers) {
     const reduce = reducers[key]
     nextState[key] = reduce(state[key], action)
     hasChanged = hasChanged || nextState[key] !== state[key]
   }

   hasChanged = hasChanged || (Object.keys(nextState).length !== Object.keys(state).length)

   return hasChanged ? nextState : state
 }
}