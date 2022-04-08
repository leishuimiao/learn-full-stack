export { type PropsWithChildren } from 'react'

export class Component<P = {}, S = {}> {
  static isReactComponent = {}

  setState<K extends keyof S>(
    state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
    callback?: () => void
  ): void { }
}
