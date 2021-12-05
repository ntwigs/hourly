import { Item } from '@data/items'

export type Event = {
  rate: string
  cost: string
  selection: Item
}

const localStorage = chrome.storage.local

export const storage = {
  getMany: localStorage.get,
  get: (selector: keyof Event) => localStorage.get(selector),
  set: (selector: Partial<Event>) => localStorage.set(selector),
}
