import React, { PropsWithChildren, useEffect } from 'react'
import classNames from 'classnames'

interface Props {
  className?: string
}

export default function Page({ title, className, children }: PropsWithChildren<TitleProps<Props>>) {
  useEffect(() => {
    document.title = title || ''
  }, [title])

  return (
    <div className={classNames('page', className)}>
      { children }
    </div>
  )
}
