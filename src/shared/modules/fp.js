export const either = (c, l, r) => a => c(a) ? l(a) : r(a)
export const compose = (...fns) => x => fns.reduceRight((g, f) => f(g), x)
export const composeAsync = (...fns) => x => fns.reduceRight((f, g) => f.then(g), Promise.resolve(x))

export const pipe = (...fns) => compose.apply(null, fns.reverse())
export const pipeAsync = (...fns) => composeAsync.apply(null, fns.reverse())

export const curry = (f, ...a) => a.length === f.length ? f(...a) : curry.bind(null, f, ...a)
export const uncurry = f => (...a) => {
  const r = a.reduce((f, g) => f(g), f)
  return r instanceof Function ? uncurry(r) : r
}
