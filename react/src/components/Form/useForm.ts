import { useRef } from 'react'
import Store, { FormInstance } from './Store'

export default function useForm(form?: FormInstance) {
  const formRef = useRef<FormInstance>()
  if (!formRef.current) {
    if (form) {
      formRef.current = form
      return [formRef.current]
    }
    // 保证生命周期内使用同一份Store
    const store = new Store()
    formRef.current = store.getForm()
  }
  
  return [formRef.current]
}