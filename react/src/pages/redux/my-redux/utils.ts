export function isPlainObject(arg: any) {
  return Object.prototype.toString.call(arg) === '[object Object]'
}