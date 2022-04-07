import { FormInstance } from './Store';
import React from 'react'

const context = React.createContext<FormInstance>({
  setFieldValue: () => {},
  setFieldValues: () => {},
  getFieldValue: () => {},
  getFieldValues: () => ([]),
  registerField: () => () => {}
})

export default context