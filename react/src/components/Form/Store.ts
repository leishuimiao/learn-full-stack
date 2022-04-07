export interface FieldData {
  name: string;
  value: any;
  error?: string;
}

export interface Values {
  [k: string]: any;
}

export interface FieldEntity {
  name: string;
  forceUpdate: () => void;
}

export interface FormInstance {
  setFieldValue: (name: string, field: FieldData) => void;
  setFieldValues: (values: { [k: string]: any }) => void;
  getFieldValue: (name: string) => any;
  getFieldValues: () => Values;
  registerField: (entity: FieldEntity) => () => void;
}

class Store {
  private store: FieldData[] = [] // 状态管理库

  private fieldEntities: FieldEntity[] = [] // Field组件实体库
  // private fieldEntities: any[] = [] // Field组件实体库

  private lastSetIndex: number = 0 // 缓存最后一次更新index，优化循环次数

  constructor() {
    console.log('new Store')
  }

  private setFieldValue = (name: string, field: FieldData) => {
    const { lastSetIndex } = this
    const lastSetFieldData = this.store[lastSetIndex]
    if (name === lastSetFieldData?.name) {
      this.store[lastSetIndex] = {
        ...this.store[lastSetIndex],
        ...field
      }
      this.rerender(name)
      return
    }
    
    const targetIndex = this.store.findIndex(item => item.name === name)
    if (targetIndex > -1) {
      this.store[targetIndex] = {
        ...this.store[targetIndex],
        ...field
      }
    } else {
      this.store.push(field)
    }
    this.lastSetIndex = targetIndex
    this.rerender(name)
  }

  private setFieldValues = (values: Values) => {
    Object.keys(values).forEach(key => {
      const targetIndex = this.store.findIndex(item => item.name === key)
      if (targetIndex > -1) {
        this.store[targetIndex].value = values[key]
        return
      }
      // 未找到，设置新的值
      this.store.push({
        name: key,
        value: values[key]
      })
    })
  }

  private getFieldValue = (name: string): any => {
    return this.store.find(item => item.name === name)?.value || ''
  }

  private getFieldValues = (): Values => {
    const values: Values = {}
    this.store.forEach(item => {
      values[item.name] = item.value
    })
    return values
  }

  private deleteElement<T = any>(arr: T[], predicate: (element: T, index: number) => unknown) {
    const mathedIndex = arr.findIndex(predicate)
    if (mathedIndex > -1) arr.splice(mathedIndex, 1)
  }

  private registerField = (entity: FieldEntity) => {
    this.fieldEntities.push(entity)
    // 返回取消注册函数
    return () => {
      const targetIndex = this.fieldEntities.indexOf(entity)
      if (targetIndex) this.fieldEntities.splice(targetIndex, 1)
      // 从store删除对应的value
      this.deleteElement(this.store, (item) => item.name === entity.name)
    }
  }

  private rerender = (name: string) => {
    this.fieldEntities.forEach(item => {
      if (item.name === name) item.forceUpdate()
      // if (item.props.name === name) item.forceUpdate()
    })
  }

  public getForm = (): FormInstance => {
    return {
      setFieldValue: this.setFieldValue,
      setFieldValues: this.setFieldValues,
      getFieldValue: this.getFieldValue,
      getFieldValues: this.getFieldValues,
      registerField: this.registerField
    }
  }
}

export default Store