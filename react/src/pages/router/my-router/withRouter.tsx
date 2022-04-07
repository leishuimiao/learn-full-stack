import { ComponentClass } from 'react';
import RouterContext from './RouterContext';

/**
 * 获取router props的hoc
 * 给类组件传递router props参数的高阶组件
 */
export default function withRouter(WrappedComponent: ComponentClass) {
  return (props: any) => <RouterContext.Consumer>
    {(context) => <WrappedComponent {...props} {...context} />}
  </RouterContext.Consumer>;
}