import { lazy, PropsWithChildren, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

import Layout from '@/pages/layout'

export interface Route extends RouteObject {
  name?: string;
  children?: Route[];
}

function lazyComponent(relativePath: string) {
  return lazy(() => import(`@/pages${relativePath}`))
} 

function Lazy({ path }: PropsWithChildren<{ path: string }>) {
  const LazyCpm = lazyComponent(path)
  return <Suspense fallback={null}><LazyCpm /></Suspense>
}

const routes: Route[] = [
  {
    path: '/',
    element: <Layout />,
    name: 'layout',
    children: [
      {
        element: <Lazy path="/index" />,
        name: 'index『默认路由』',
        index: true
      },
      {
        path: 'form',
        element: <Lazy path="/form" />,
        name: 'form『表单』'
      },
      {
        path: 'redux',
        name: 'redux『状态管理』',
        children: [
          {
            element: <Lazy path="/redux" />,
            name: 'redux『默认路由』',
            index: true
          },
          {
            path: 'react',
            element: <Lazy path="/redux/react" />,
            name: 'redux-react『react桥接』'
          }
        ]
      },
      {
        path: 'router/*',
        element: <Lazy path="/router" />,
        name: 'router『路由』'
      },
      {
        path: 'source',
        element: <Lazy path="/source" />,
        name: 'react『源码』'
      }
    ]
  }
]

export default routes