import { ERR, loadScript, LOG } from '../modules'
import * as config from '../../../etc/keys/auth.json'

const src = '//www.gstatic.com/firebasejs/8.0.1/firebase.js'



const firebase = {}

const authPopUp = () => {

  const provider = new firebase.auth.GoogleAuthProvider()
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
  firebase.auth().languageCode = 'pt'

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      const token = result.credential.accessToken
      const user = result.user

      LOG('authPopUp', { result })

    }).catch(function (error) {

    const errorCode = error.code
    const errorMessage = error.message

    const email = error.email
    const credential = error.credential

    LOG('authPopUp', { error })

  })

}

const authEmailPassword = ({ email, password }) =>
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    // .createUserWithEmailAndPassword(email, password)
    .then(() => {
     // const user = firebase.auth().currentUser
      
      const user =  firebase.auth().currentUser
      LOG('signInWithEmailAndPassword',user)
    })
    .catch(function (error) {
      
      const errorCode = error.code
      const errorMessage = error.message
      
      LOG({ errorCode, errorMessage })
    })

const authInit = () =>
  loadScript(src)
    .then(() => {
      
      firebase.initializeApp(config)
      
      // const user = firebase.auth().currentUser
      // LOG('currentUser', { user })
      
    })
    .catch(e => ERR('LOAD', e))

export { authInit, authEmailPassword }

