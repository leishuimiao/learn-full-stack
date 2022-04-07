import { createElement, useContext } from 'react';
import RouterContext from './RouterContext';
import matchPath from './matchPath';
import { RouteProps } from './types';

export default function Route(props: RouteProps) {
  const { children, component, render, path, computedMatch } = props;
  const { basename, location, history, match: contextMatch } = useContext(RouterContext);
  const match: any = computedMatch
    ? computedMatch
    : path
      ? matchPath(`${basename || ''}${path}`, location.pathname)
      : contextMatch;
  const compProps = { history, location, match, basename };

  // 渲染优先级 children > component > render > null
  // 此处再次使用Context是为了子组件使用Context中的match永远是最新的
  return <RouterContext.Provider value={{
    history,
    basename,
    location,
    match
  }}>
    {match
    ? children
      ? typeof children === 'function'
        ? children(compProps)
        : children
      : component
        ? createElement(component, compProps as any)
        : render
          ? typeof render === 'function'
            ? render(compProps)
            : render
          : null
    : null}
  </RouterContext.Provider>
}
