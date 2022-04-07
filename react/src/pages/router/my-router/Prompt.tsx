import RouterContext from './RouterContext';
import LifeCycle from './LifeCycle';
import { PromptProps } from './types';

export default function Prompt(props: PromptProps) {
  const { message, when = true } = props;
  // 当属性Props when为false，取消无需阻塞跳转
  return when ? <RouterContext.Consumer>
    {({ history }) => {
      const mount = () => {
        const unblock = history.block(({ location, action, retry }) => {
          // Navigation was blocked! Let's show a confirmation dialog
          // so the user can decide if they actually want to navigate
          // away and discard changes they've made in the current page.
          if (window.confirm(typeof message === 'function' ? message(location, action) : message)) {
            // Unblock the navigation.
            unblock();
        
            // Retry the transition.
            retry();
          }
        });

        return unblock
      };
      return <LifeCycle onMount={mount} />
    }}
  </RouterContext.Consumer> : null;
}
