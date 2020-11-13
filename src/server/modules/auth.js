import { either } from './'

const OAuth = payload => {

}

const Basic = payload => {

}

const ApiKey = payload => {

}

const JWT = payload => {

}

const success = ctx => ctx
const error = ctx => ctx

const Auth = strategy => payload => either(strategy(payload), success, error)

export { Auth }
