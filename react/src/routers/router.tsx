import React from 'react';
import { BrowserRouter as BRouter, useRoutes } from 'react-router-dom';
import routes from './routes'

function Routes() {
  return useRoutes(routes)
}

export default function Router() {
  return (
    <BRouter>
      <Routes />
    </BRouter>
  )
}
