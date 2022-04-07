import { ComponentClass, FunctionComponent, ReactNode } from 'react';
import { History, Location, Action, Pathname, Search, Hash } from 'history';

export type RoutePath = {
  path: string;
  caseSensitive: boolean;
  end: boolean;
} | string;

export interface Path {
  pathname: Pathname;
  search: Search;
  hash: Hash;
} 

export type To = string | Partial<Path>

export interface LinkProps {
  to: To;
}

export type Params<Key extends string = string> = {
  readonly [key in Key]: string | undefined;
};

export interface Match<ParamKey extends string = string> {
  path: string;
  params: Params<ParamKey>;
  url: string;
  isExact: boolean;
}

export interface MatchPath<ParamKey extends string = string> {
  pathname: string;
  pathnameBase: string;
  pattern: RoutePath;
  params: Params<ParamKey>;
};

export interface RouteFuncProps<ParamKey extends string = string> {
  history: History;
  location: Location;
  basename?: string;
  match: MatchPath<ParamKey> | Match<ParamKey>;
}

export interface RouteProps {
  component?: FunctionComponent | ComponentClass | string;
  render?: ReactNode | ((props: RouteFuncProps) =>  JSX.Element) | string;
  path?: RoutePath;
  children?: ReactNode | ((props: RouteFuncProps) =>  JSX.Element) | string;
  computedMatch?: MatchPath;
}

export interface RouterProps {
  history: History;
  basename?: string;
}

export interface Context<ParamKey extends string = string> extends RouterProps {
  location: Location;
  match: MatchPath<ParamKey> | Match<ParamKey>;
}

export interface RedirectProps {
  to: To;
  push?: boolean;
}

export interface PromptProps {
  message?: string | ((location: Location, action: Action) =>  string | undefined);
  when?: boolean;
}