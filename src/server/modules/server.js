import { createServer } from 'http'
import Router from 'find-my-way'

const opts = {
  caseSensitive: true,
  maxParamLength: 50,
  ignoreTrailingSlash: true,
  allowUnsafeRegex: false
}

const handler = router => (req, res) => setImmediate(() => router.lookup(req, res))

export const serv = () => {
  const router = Router(opts)
  const server = createServer()

  server.on('request', handler(router))

  return { router, server }
}
