//import { serv } from './modules/server'
import { initWS } from './listeners/ws'

// import { LOG } from './modules'
//
// const SERVER_PORT = 9393
// const SERVER_HOST = '127.0.0.1'
//
// const { router, server } = serv()

initWS()

// const Handler = (req, res) => {
//   res.setHeader('Content-Type', 'text/html')
//   res.end('Opa 200')
// }
//
// router.on('GET', '/', Handler)
//
// server.listen(SERVER_PORT, SERVER_HOST, () => LOG(`server: ${SERVER_HOST}:${SERVER_PORT}`))
