import { useContext } from 'react';
import RouterContext from './RouterContext';
import { RedirectProps } from './types';
import LifeCycle from './LifeCycle';

export default function Redirect(props: RedirectProps) {
  const { history } = useContext(RouterContext);
  const { to, push = false } = props
  return <LifeCycle onMount={() => {
    !push ? history.replace(to) : history.push(to)
  }} />;
}
