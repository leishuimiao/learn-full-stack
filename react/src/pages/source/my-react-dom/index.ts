import { ReactElement } from 'react'

function isString (str: any): str is string {
  // 类型是string或者是String的实例
  return typeof str === 'string' || str instanceof String
}

function render (element: ReactElement, container: HTMLElement | null) {
  // 1.将vnode转变成真实node
  const node = createNode(element)
  // 2.将真实node插入容器
  node && container?.appendChild(node)
}

function createNode (vnode: ReactElement): HTMLElement | Text | null {
  if (!vnode) return null

  if (isString(vnode)) return document.createTextNode(vnode)

  const { type, props } = vnode
  if (typeof type === 'function') {
    // 函数组件或者类组件    
    if (type.prototype.isReactComponent) {
      return createNode(new (type as any)(props).render())
    } else {
      // 函数组件
      return createNode((type as any)(props))
    }
  }

  return createElement(vnode.type as keyof HTMLElementTagNameMap, vnode.props)
}

export function createElement(type: keyof HTMLElementTagNameMap, props: ReactElement['props']): HTMLElement {
  const element = document.createElement(type)
  const { children, ...rest } = props

  // 更新element属性
  updateElementProps(rest, element)

  // 渲染children内容
  if (children) {    
    const childrenNode = Array.isArray(children) ? children : [children]
    childrenNode.forEach(node => render(node, element))
  }

  return element
}

function updateElementProps(props: ReactElement['props'], element: HTMLElement) {
  Object.keys(props).forEach((prop) => {
    const propVale = props[prop]
    if (prop === 'style') {
      // 更新style属性
      Object.keys(propVale).forEach((key: any) => {
        element.style[key] = propVale[key]
      })
    } else if (prop === 'className') {
      // 更新className
      element.className = propVale
    } else {
      // 更新其他属性
      element.setAttribute(prop, propVale)
    }
  })
}

const MyReactDOM = {
  render
}

export default MyReactDOM
