export const $ = <T extends Element>(selector: string): T | null => document.querySelector<T>(selector)
