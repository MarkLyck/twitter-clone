import $ from 'jquery'
import Backbone from 'backbone'

import router from './router'
import store from './store'

$(document).ajaxSend(function(e, xhrAjax, jqueryAjax) {
  if (localStorage.authtoken) {
    console.log('Intercepted Kinvey');
    xhrAjax.setRequestHeader('Authorization', `Kinvey ${localStorage.authtoken}`)
  } else {
    xhrAjax.setRequestHeader('Authorization', `Basic ${store.settings.basicAuth}`)
  }
})

if (localStorage.authtoken) {
  store.session.retrieve()
}

// if (sessionStorage.session) {
//   store.session.set('authtoken', JSON.parse(sessionStorage.session).authtoken)
//   store.session.set('username', JSON.parse(sessionStorage.session).username)
//   store.session.set('email', JSON.parse(sessionStorage.session).email)
//   store.session.set('fullName', JSON.parse(sessionStorage.session).fullName)
//   store.session.set('userId', JSON.parse(sessionStorage.session).userId)
//   store.session.set('following', JSON.parse(sessionStorage.session).following)
//   store.session.set('followers', JSON.parse(sessionStorage.session).followers)
//   store.session.set('liked', JSON.parse(sessionStorage.session).liked)
// }

Backbone.history.start()
