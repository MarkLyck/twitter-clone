import $ from 'jquery'
import Backbone from 'backbone'

import router from './router'
import store from './store'

$(document).ajaxSend(function(e, xhrAjax, jqueryAjax) {
  console.log(store.session);
  if (store.session.get('authtoken')) {
    xhrAjax.setRequestHeader('Authorization', `Kinvey ${store.session.get('authtoken')}`)
  } else {
    xhrAjax.setRequestHeader('Authorization', `Basic ${store.settings.basicAuth}`)
  }
})

if (sessionStorage.session) {
  console.log('FOUND STORED TOKEN');
  // console.log(JSON.parse(sessionStorage.session).authtoken);
  store.session.set('authtoken', JSON.parse(sessionStorage.session).authtoken)
}

Backbone.history.start()
