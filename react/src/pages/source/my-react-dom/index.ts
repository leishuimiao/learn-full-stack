import { FC, ReactNode } from "react"

export type Element<P = {}> = ReactNode | FC<P>

function render (element: Element, container: HTMLElement | null) {
  // 1.将vnode转变成真实node
  const node = compileVNode(element)
  // 2.将真实node插入容器
  // container?.appendChild(node)
}

function compileVNode (element: Element) {
  if (typeof element === 'function') {
    console.log(element, 11111)
  }
}

const MyReactDOM = {
  render
}

export default MyReactDOM