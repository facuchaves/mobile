export interface Search {
  query: string
  provinciasId?: string[] // [29]
  areasId?: string[]
  tipoTrabajoId?: number
  diasFechaPublicacion?: number
  salarioMaximo?: number
  salarioMinimo?: number
}
export class SearchStack {
  private static instance: SearchStack

  private storeKey = 'searchHistory'

  private historyLength

  private queue: string[] = []

  private constructor({ length = 5 }: { length?: number } = {}) {
    const storedString = localStorage.getItem(this.storeKey)
    if (storedString) this.queue = JSON.parse(storedString as any)
    this.historyLength = length
  }

  public static getInstance(): SearchStack {
    if (!SearchStack.instance) {
      SearchStack.instance = new SearchStack()
    }
    return SearchStack.instance
  }

  public push(search: Search): void {
    this.queue = Array.from(new Set([JSON.stringify(search), ...this.queue])).splice(0, this.historyLength)
    localStorage.setItem(this.storeKey, JSON.stringify(this.queue))
  }

  public getHistory(): Search[] {
    return this.queue.map(e => JSON.parse(e))
  }
}
