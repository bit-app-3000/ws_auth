import { map, runEffects, take } from '@most/core'
import { newDefaultScheduler } from '@most/scheduler'
import { ERR, LOG, prsq$, q$ } from '../../shared/module'
import parseq from '../../shared/module/parseq'

const scheduler = newDefaultScheduler()

function show (value, reason) {
  // LOG(process.resourceUsage())
  return reason ? ERR('show', reason) : LOG('show', value)
}

const payload = idx => cb => cb(idx)

const computeMaxCallStackSize = size => {
  size++
  LOG(size)
  computeMaxCallStackSize(size)
}

const handler = () => {
  LOG('handler PRSQ')

  // computeMaxCallStackSize(1)

  const scheduler2 = newDefaultScheduler()
  const s$ = map(queue, take(5, q$))
  runEffects(s$, scheduler2).catch(ERR)

  const arr = []
  let i = 3000

  while (i--) { arr.push(payload(i)) }

  parseq.parallel(arr)(show)
}

const queue = ([i]) => {
  LOG('handler queue', i)
}

const sink = {
  event: _ => LOG('event'),
  error: _ => LOG('error'),
  end: _ => LOG('end')
}

runEffects(map(handler, prsq$), scheduler).catch(ERR)

// run(sink, scheduler, s$)

/* const Q = Object.freeze({

    busy: new Set,
    fifo: new Map,

    q: name => {

        if (!Q.fifo.has(name))
            Q.fifo.set(name, [])

        return Q.fifo.get(name)
    },
    add: arg => Q.q(arg[0]).push(arg),
    len: name => {
        const len = Q.q(name).length
        LOG({name, len})
        return len
    },

    push: arg => Q.busy.has(arg[0]) ? Q.add(arg) : Q.run(arg),

    run: arg => {
        Q.busy.add(arg[0])
    },

    peek: name => {

        Q.busy.delete(name)

        if (Q.len(name))
            Q.start(Q.q(name).shift())

    }

}) */
