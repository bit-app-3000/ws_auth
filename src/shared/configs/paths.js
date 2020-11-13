import { resolve } from 'path'

export const ROOT = process.cwd()
export const DIST = resolve(ROOT, 'dist')
export const ASSETS = resolve(DIST, 'assets')
export const JS = resolve(ASSETS, 'js')
export const WS = resolve(JS, 'ws.js')
