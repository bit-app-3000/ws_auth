import { createHmac } from 'crypto'
import { guid, LOG } from './'

const SECRET = 'your-256-bit-secret'
const HEADER = { alg: 'HS256', typ: 'JWT' }

/* const token = {
    'iss': 'Codex Team',
    'sub': 'auth',
    'exp': 1505467756869,
    'iat': 1505467152069,
    'user': 1
} */

function escape (str) {
  return str
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

function encode (obj) {
  return escape(Buffer.from(JSON.stringify(obj))
    .toString('base64'))
}

function generateSignature (str, secret) {
  return escape(createHmac('sha256', secret)
    .update(str)
    .digest('base64'))
}

function payload () {
  const id = guid()
  const exp = Date.now() + 100
  return { id, exp }
}

function JWT () {
  const h = encode(HEADER)
  const p = encode(payload())
  const s = generateSignature([h, p].join('.'), SECRET)

  return [h, p, s].join('.')
}

export { JWT }

/* function unescape (str) {
    return (str + '==='.slice((str.length + 3) % 4))
        .replace(/-/g, '+')
        .replace(/_/g, '/')
}

function escape (str) {
    return str.replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '')
}

function encode (str, encoding) {
    return escape(Buffer.from(str, encoding || 'utf8').toString('base64'))
}

function decode (str, encoding) {
    return Buffer.from(unescape(str), 'base64').toString(encoding || 'utf8')
} */
