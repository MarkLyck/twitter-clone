import $ from 'jquery'
import Backbone from 'backbone'

import router from './router'
import store from './store'

$(document).ajaxSend(function(e, xhrAjax, jqueryAjax) {
  if (store.session.get('authtoken')) {
    xhrAjax.setRequestHeader('Authorization', `Kinvey ${store.session.get('authtoken')}`)
  } else {
    xhrAjax.setRequestHeader('Authorization', `Basic ${store.settings.basicAuth}`)
  }
})

if (sessionStorage.session) {
  store.session.set('authtoken', JSON.parse(sessionStorage.session).authtoken)
  store.session.set('username', JSON.parse(sessionStorage.session).username)
  store.session.set('email', JSON.parse(sessionStorage.session).email)
  store.session.set('fullName', JSON.parse(sessionStorage.session).fullName)
  store.session.set('userId', JSON.parse(sessionStorage.session).userId)
  store.session.set('following', JSON.parse(sessionStorage.session).following)
  store.session.set('followers', JSON.parse(sessionStorage.session).followers)
}

Backbone.history.start()
