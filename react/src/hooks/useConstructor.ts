import { useState } from 'react';

export default function useConstructor(callback: () => void) {
  const [constructorHasRun, setConstructHasRun] = useState(false)
  if (constructorHasRun) return
  typeof callback === 'function' && callback()
  setConstructHasRun(true)
}