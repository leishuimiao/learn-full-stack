import React, { PropsWithChildren, ReactElement, cloneElement, ChangeEvent, useContext, useEffect } from 'react';
import useForceUpdate from '@/hooks/useForceUpdate';
import Context from './Context';
import { FormInstance } from './Store';

interface Props {
  className?: string;
  label?: string;
  name: string;
}

export default function Field ({ children, className, label, name }: PropsWithChildren<Props>): ReactElement {
  const context = useContext<FormInstance>(Context)
  const forceUpdate = useForceUpdate()
  const getControlled = () => {
    return ({
      value: context.getFieldValue(name),
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        context.setFieldValue(name, { name, value: event.target.value })
      }
    })
  }
  useEffect(() => {
    const unregisterField = context.registerField({
      name,
      forceUpdate
    })
    return () => {
      unregisterField()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log('field render');

  return (
    <div className={className}>
      <label>
        <span>{ label }</span>
        { cloneElement(children as ReactElement, getControlled()) }
      </label>
    </div>
  )
}

// export default class Filed extends React.Component<Props> {
//   static contextType = Context

//   context!: React.ContextType<typeof Context>

//   getControlled = () => {
//     const { name } = this.props
//     const context = this.context
//     return ({
//       value: context.getFieldValue(name),
//       onChange: (event: ChangeEvent<HTMLInputElement>) => {
//         context.setFieldValue(name, { name, value: event.target.value })
//       }
//     })
//   }

//   componentDidMount () {
//     this.context.registerField(this)
//   }

//   componentWillUnmount () {
//     this.context.unregisterField(this.props.name)
//   }

//   render() {
//     const { className, label, children } = this.props
//     console.log('field render');
    
//     return (
//       <div className={className}>
//         <label>
//           <span>{ label }</span>
//           { cloneElement(children as ReactElement, this.getControlled()) }
//         </label>
//       </div>
//     )
//   }
// }