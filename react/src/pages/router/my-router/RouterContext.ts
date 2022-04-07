import React from 'react';
import { Context } from './types';

const RouterContext = React.createContext<Context>({
  basename: '',
  history: undefined as any,
  location: undefined as any,
  match: undefined as any
});

export default RouterContext
