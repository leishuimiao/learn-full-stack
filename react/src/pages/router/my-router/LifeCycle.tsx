import { useEffect } from 'react';

/**
 * 执行mount和unmount回调函数的组件
 * @returns {JSX.Element | null}
 */
export default function LifeCycle(
  { onMount, onUnmount }: { onMount?: () => void | (() => void); onUnmount?: () => void }
) {
  useEffect(() => {
    const mounted = onMount && onMount();
    return onUnmount || mounted;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
