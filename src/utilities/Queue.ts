import { isEqual } from 'lodash'

export default class Queue<Type> {
  private _items: Type[]
  private _enqueueCallbacks: Function[]

  constructor() {
    this._items = []
    this._enqueueCallbacks = []
  }

  /** Print queue to the console */
  public display(): void {
    console.log(this._items)
  }

  public dequeue(): Type | undefined {
    if (!this.isEmpty) {
      return this._items.shift()
    } else {
      return undefined
    }
  }

  public enqueue(item: Type): void {
    this._items = this._items.filter((value) => {
      return !isEqual(value, item)
    })

    this._items.push(item)
    this._callEnqueueCallbacks()
  }

  public get isEmpty(): boolean {
    return this.length === 0
  }

  public get length(): number {
    return this._items.length
  }

  public onEnqueue(fn: Function) {
    this._enqueueCallbacks.push(fn)

    return this.unsubscribe.bind(this, fn)
  }

  public unsubscribe(fn: Function): void {
    this._enqueueCallbacks = this._enqueueCallbacks.filter((item) => {
      if (item === fn) {
        return true
      } else {
        return false
      }
    })
  }

  private _callEnqueueCallbacks(): void {
    if (this._enqueueCallbacks.length > 0) {
      this._enqueueCallbacks.forEach((fn) => {
        fn.call(this)
      })
    }
  }
}
