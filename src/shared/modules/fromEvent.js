const currentTime = scheduler => scheduler.currentTime()
const ListenerDisposable = (emitter, event, send) => ({ dispose: () => emitter.removeListener(event, send) })
const tryEvent = (t, e, sink) => {
  try {
    sink.event(t, e)
  } catch (error) {
    sink.error(t, error)
  }
}

export const
  fromEvent = (event, emitter) => {
    const run = (sink, scheduler) => {
      const send = (...e) => tryEvent(currentTime(scheduler), e, sink)
      emitter.addListener(event, send, { passive: true }) //  emitter.addListener(event, send)
      return ListenerDisposable(emitter, event, send)
    }

    return { run }
  }
