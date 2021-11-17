export type StorageKeys = 'rate' | 'cost' | 'selection'

const localStorage = chrome.storage.local

export const storage = {
  getMany: localStorage.get,
  get: (selector: StorageKeys) => localStorage.get(selector),
  set: (selector: Record<StorageKeys[number], unknown>) =>
    localStorage.set(selector),
}
