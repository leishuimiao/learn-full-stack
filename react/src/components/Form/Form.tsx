import React, { FormEvent, PropsWithChildren, ReactElement } from 'react';
import Context from './Context';
import { FormInstance, Values } from './Store';
import useForm from './useForm';

interface Props {
  className?: string;
  form: FormInstance;
  onSubmit?: (values: Values) => void;
}

function Form ({ children, className, form, onSubmit }: PropsWithChildren<Props>): ReactElement {
  const [formInstance] = useForm(form)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    onSubmit && onSubmit(formInstance.getFieldValues())
    e.preventDefault()
  }
  return (
    <form className={className} onSubmit={handleSubmit}>
      <Context.Provider value={formInstance}>
        { children }
      </Context.Provider>
    </form>
  )
}

Form.useForm = useForm

export type FormValues = Values

export default Form