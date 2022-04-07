import { Children, cloneElement, isValidElement, PropsWithChildren, ReactElement, useContext } from 'react';
import matchPath from './matchPath';
import RouterContext from './RouterContext';
import { Match, MatchPath, RouteProps } from './types';

export default function Switch(props: PropsWithChildren<RouteProps>) {
  let match: MatchPath<string> | Match<string> | undefined | null; // 是否匹配
  let element; // 匹配到的元素

  const { location, basename, match: contextMatch } = useContext(RouterContext);

  Children.forEach(props.children, child => {
    if (match == null && isValidElement(child)) {
      const { path } = child.props
      element = child
      match = path ? matchPath(`${basename || ''}${path}`, location.pathname) : contextMatch
    } 
  })

  return match ? cloneElement(element as unknown as ReactElement, { computedMatch: match }) : null;
}
