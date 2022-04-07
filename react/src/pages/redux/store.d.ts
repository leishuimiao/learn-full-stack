export interface Counter1 {
  value: number
}

export type Counter2 = number

export interface RootState {
  counter1: Counter1;
  counter2: Counter2;
}