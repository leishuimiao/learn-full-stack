import { PropsWithChildren, useEffect, useState } from 'react';
import { Location } from 'history';
import RouterContext from './RouterContext';
import { RouterProps, To } from './types';

function getBasenamePath (to: To, basename?: string): To {
  if (basename) {
    switch (typeof to) {
      case 'string':
        to = basename + to
        break;
      case 'object':
        to = {
          ...to,
          pathname: basename + to.pathname,
        }
    }
  }
  return to;
}

function Router(props: PropsWithChildren<RouterProps>) {
  const { history, basename, children } = props;
  const [location, setLoaction] = useState<Location>(window.location as unknown as Location);
  useEffect(() => {
    const unListen = history.listen(({ location }) => {
      setLoaction(location)
    });
    return unListen;
  }, [history]);
  

  return <RouterContext.Provider value={{
    // 重写push，replace，createHref函数，因其需要包含basename部分
    history: {
      ...history,
      push: (to: To, state: any) => {
        return history.push(getBasenamePath(to, basename), state)
      },
      replace: (to: To, state: any) => {
        return history.replace(getBasenamePath(to, basename), state)
      },
      createHref: (to: To) => {
        return history.createHref(getBasenamePath(to, basename))
      }
    },
    basename,
    location,
    match: Router.computedRootMatch(location.pathname)
  }}>
    {children as JSX.Element}
  </RouterContext.Provider>;
}

Router.computedRootMatch = (pathname: string) => {
  return { path: '/', url: '/', params: {}, isExact: pathname === '/' };
}

export default Router
