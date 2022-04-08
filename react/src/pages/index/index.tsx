import React from 'react'
import { Route, routes } from '@/routers'
import { useNavigate, generatePath } from 'react-router-dom'
import Page from '@/components/Layout';
import './index.css'

type Paths = string[];

export default function Index() {
  const navigate = useNavigate()

  const handleClick = (fullPath: string) => {
    if (fullPath && fullPath !== '/') navigate(generatePath(fullPath))
  }

  const getRouteCompontent = (routes?: Route[], historyPaths?: Paths) => {
    if (!routes) return null
    let paths: Paths = []

    return (
      <ul className="routes">
        {routes.map((route, index) => {
          const { path, name, children } = route
          paths = []
          if (historyPaths) {
            paths = paths.concat(historyPaths)
          }
          path && paths.push(path)
          const fullPath = paths.join('/').replace(/\/+/g, '/')
          return (
            <li className="route" key={index}>
              <div className="route-block" onClick={() => handleClick(fullPath)}>
                {name && <h2>{ name }{route.index && <span className='tag'>index</span>}</h2>}
                {path && <p>{ path }</p>}
              </div>
              {getRouteCompontent(children, paths)}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <Page title="首页">
      <div className="index-page">
        {getRouteCompontent(routes)}
      </div>
    </Page>
  )
}
