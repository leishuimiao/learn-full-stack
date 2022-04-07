import { PropsWithChildren, useContext, MouseEvent } from 'react';
import RouterContext from './RouterContext';
import { LinkProps } from '.';

export default function Link({ children, to }: PropsWithChildren<LinkProps>) {
  const { history } = useContext(RouterContext);
  const href = history.createHref(to);
  
  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    // 判断如果跳转的path与当前path相同，则不处理跳转
    if (history.location.pathname !== href) return history.push(to)
    console.error('即将跳转的 path 与当前的 path 相同，无法跳转');
  };

  return <a href={href} onClick={handleClick}>{children}</a>;
}
