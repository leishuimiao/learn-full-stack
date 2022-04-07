import React, { useState } from 'react';
import { Form, Field, FormValues } from '@/components/Form'
import Page from '@/components/Page';
import './App.css';

function App() {
  const [form] = Form.useForm()
  const [state, setState] = useState<number>(() => {
    form.setFieldValues({
      account: 'account12',
      password: '11password'
    })
    return 0
  })

  const onIncrement = () => {
    const newState = state + 1
    setState(newState)
  }

  const handleSubmit = (values: FormValues) => {
    console.log(values, 'onSubmit')
  }

  console.log('app render');

  return (
    <Page title="Form" className="app">
      <Form className="app-form" form={form} onSubmit={handleSubmit}>
        <Field label="账号：" name="account">
          <input type="text" placeholder="请输入账号" />
        </Field>
        {state < 5 && <Field label="姓名：" name="name">
          <input type="text" placeholder="请输入姓名" />
        </Field>}
        <Field label="密码：" name="password">
          <input type="password" placeholder="请输入密码" />
        </Field>
        <button>提交</button>
      </Form>
      { state } - <button onClick={onIncrement}>重新渲染</button>
    </Page>
  );
}

export default App;
