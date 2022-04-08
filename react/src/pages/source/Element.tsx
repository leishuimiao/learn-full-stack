import { Component, PropsWithChildren } from 'react'

function FunComp(props: PropsWithChildren<{ name: string }>) {
  return <div style={{ border: '1px solid red' }}>函数式组件-{props.name}</div>
}

class ClassComp extends Component<{ name: string }> {
  render() {
    return <div style={{ border: '1px solid red' }}>类组件-{this.props.name}</div>
  }
}

// export default function Container() {
//   return (
//     <div style={{ border: '1px solid red' }}>
//       <h1>文本内容</h1>
//       <FunComp name="FunctionComponent" />
//       <ClassComp name="ClassComponent" />
//     </div>
//   )
// }

export default class Container extends Component {
  render() {
    return (
      <div style={{ border: '1px solid red' }}>
        <h1>文本内容</h1>
        <FunComp name="FunctionComponent" />
        <ClassComp name="ClassComponent" />
      </div>
    )
  }
}
