import Page from '@/components/Layout'
import { useEffect, useRef } from 'react'
import Element from './Element'
import MyReactDOM from './my-react-dom'

export default function Source() {
  const divElement = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    MyReactDOM.render(Element, divElement.current)
  }, [])
  

  return (
    <Page title="react">
      <div ref={divElement}>源码</div>
    </Page>
  )
}
