import $ from 'jquery'
import Backbone from 'backbone'

import router from './router'
import store from './store'
import session from './models/session'

$(document).ajaxSend(function(e, xhrAjax, jqueryAjax) {
  console.log('SESSION: ', session);
  if (session.get('authtoken')) {
    console.log('SESSION HAS authtoken');
    console.log('Kinvey interception');
    xhrAjax.setRequestHeader('Authorization', `Kinvey ${session.get('authtoken')}`)
  } else {
    console.log('Basic interception');
    xhrAjax.setRequestHeader('Authorization', `Basic ${store.settings.basicAuth}`)
  }
})

// if (sessionStorage.session) {
//   store.session = JSON.parse(sessionStorage.session)
// }

Backbone.history.start()
