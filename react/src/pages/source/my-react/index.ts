import { ReactNode } from 'react';
export { type PropsWithChildren } from 'react'


class Component<P = {}, S = {}> {
  [x: string]: {};

  props: P;

  state!: S;

  context: any;

  refs = {};

  forceUpdate(callback?: () => void): void {};

  render(): ReactNode { return null };

  constructor(props: P) {
    this.props = props
    this.render()
  }

  setState<K extends keyof S>(
    state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
    callback?: () => void
  ): void { }
}

Component.prototype.isReactComponent = {}

export { Component }