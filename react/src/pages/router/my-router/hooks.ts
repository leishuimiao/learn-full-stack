import { useContext } from 'react';
import RouterContext from './RouterContext';
import {MatchPath, Params} from './types';

export function useHistory() {
  return useContext(RouterContext).history;
}

export function useLoaction() {
  return useContext(RouterContext).location
}

export function useMatch<P extends string = string>(): MatchPath<P> {
  return useContext(RouterContext).match as MatchPath<P>;
}

export function useParams<P extends string = string>(): Params<P> {
  const { match } = useContext(RouterContext)
  return match ? match.params : {}
}