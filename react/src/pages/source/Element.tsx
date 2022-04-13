// import { Component, PropsWithChildren } from 'react'
import { Component, PropsWithChildren } from './my-react'

function FunComp(props: PropsWithChildren<{ name: string; border: string }>) {
  return <div style={{ margin: '10px 0', border: props.border }}>函数式组件-{props.name}</div>
}

function FunEmptyComp() {
  return null
}

class ClassComp extends Component<{ name: string; border: string }> {
  render() {
    return <div style={{ margin: '10px 0', border: this.props.border }}>类组件-{this.props.name}</div>
  }
}

export default function Container() {
  const border = '1px solid red'
  
  return (
    <div id="container" className="container" style={{ padding: '20px', margin: '10px', border }}>
      <h1>文本内容</h1>
      <FunComp name="FunctionComponent" border={border} />
      <ClassComp name="ClassComponent" border={border} />
      空标签内容
      <p>p标签内容</p>
      <FunEmptyComp />
    </div>
  )
}

// export default class Container extends Component {
//   render() {
//     return (
//       <div className="container" style={{ padding: '20px', margin: '10px', border: '1px solid red' }}>
//         <h1>文本内容标题</h1>
//         <FunComp name="FunctionComponent" />
//         <ClassComp name="ClassComponent" />
//         空标签内容
//         <p>p标签内容</p>
//       </div>
//     )
//   }
// }
