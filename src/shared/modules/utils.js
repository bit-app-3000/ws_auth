export const NO_OP = () => null



export const guid = () =>
  [2, 1, 1, 1, 3].map(length =>
    Array.from({ length }, () =>
        Math
          .floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1))
      .join('')).join('-')

export const code = () => Math.floor(Math.random() * 1000000).toString().padStart(6, '0')

export const delay = ms => new Promise(r => setTimeout(r, ms))

export const loadScript = src => new Promise((resolve, reject) => {
  const s = document.createElement('script')
  s.src = src
  s.async = true
  s.onload = resolve
  s.onerror = reject
  document.head.appendChild(s)
})

export const isError = s => s instanceof Error


export const clone = s => JSON.parse(JSON.stringify(s))
