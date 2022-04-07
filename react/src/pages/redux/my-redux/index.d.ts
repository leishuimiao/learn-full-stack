declare const $CombinedState: unique symbol

interface EmptyObject {
  readonly [$CombinedState]?: undefined
}

export type CombinedState<S> = EmptyObject & S

export type ReducersMapObject<S = any, A extends Action = Action> = {
  [K in keyof S]: Reducer<S[K], A>
}

export interface Action<T = any> {
  type: T
}

export interface AnyAction extends Action {
  // Allows any extra properties to be defined in an action.
  [extraProps: string]: any
}

export interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T): T
}

export interface Unsubscribe {
  (): void
}

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S

export interface Store<S = any, A extends Action = AnyAction> {
  dispatch: Dispatch<A>
  getState(): S
  subscribe(listener: () => void): Unsubscribe
  replaceReducer(nextReducer: Reducer<S, A>): void
}

export type ReducerFromReducersMapObject<M> = M extends {
  [P in keyof M]: infer R
}
  ? R extends Reducer<any, any>
    ? R
    : never
  : never

export type StateFromReducersMapObject<M> = M extends ReducersMapObject<
  any,
  any
>
  ? { [P in keyof M]: M[P] extends Reducer<infer S, any> ? S : never }
  : never
 
export type ActionFromReducersMapObject<M> = M extends ReducersMapObject<
  any,
  any
>
  ? ActionFromReducer<ReducerFromReducersMapObject<M>>
  : never

export type StoreEnhancerStoreCreator<Ext = {}, StateExt = {}> = <
  S = any,
  A extends Action = AnyAction
>(
  reducer: Reducer<S, A>
) => Store<S & StateExt, A> & Ext

export type StoreEnhancer<Ext = {}, StateExt = {}> = (
  next: StoreEnhancerStoreCreator
) => StoreEnhancerStoreCreator<Ext, StateExt>

export interface MiddlewareAPI<D extends Dispatch = Dispatch, S = any> {
  dispatch: D
  getState(): S
}

export interface Middleware<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  DispatchExt = {},
  S = any,
  D extends Dispatch = Dispatch
> {
  (api: MiddlewareAPI<D, S>): (
    next: Dispatch<AnyAction>
  ) => (action: any) => any
}