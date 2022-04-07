import { MiddlewareAPI, Dispatch, AnyAction } from '@/pages/redux/my-redux';

function getTime(date: Date = new Date()): string {
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`.replace(
    /(^|:)(\d)(?!\d)/g, '$10$2'
  )
}

export default function logger({ getState }: MiddlewareAPI) {
  // 此处需要返回一个Dispatch函数
  return (next: Dispatch) => (action: AnyAction) => {
    console.groupCollapsed(
      `%caction %c${action.type} %c@ ${getTime()}`,
      'color:gray;font-weight:normal',
      'font-weight: bold',
      'color:gray;font-weight:normal'
    )

    console.log('%cprev state', 'color:gray;font-weight:bold', getState())
    
    console.log('%caction', 'color:#2196F3;font-weight:bold', action)

    const returnAction = next(action)

    console.log('%cnext state', 'color:#4CAF50;font-weight:bold', getState())

    console.groupEnd()

    return returnAction
  }
}