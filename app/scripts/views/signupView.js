import Backbone from 'backbone'

import router from '../router'
import store from '../store'

// import session from '../models/session'


const LoginView = Backbone.View.extend({
  id: 'modal-container',
  template: function() {
    return `
    <div class="signup-modal modal">
      <h3>Signup</h3>
      <input id="username-input" type="text" placeholder="Username">
      <input id="password-input" type="password" placeholder="Password">
      <div class="wrapper">
        <button id="signup-btn">Signup</button>
        <button id="goto-login">Login</button>
      </div>
    </div>
    `
  },
  events: {
    'click #signup-btn': 'signup',
    'click #goto-login': 'gotoLogin'
  },
  signup: function(e) {
    let username = this.$('#username-input').val()
    let password = this.$('#password-input').val()

    store.session.save({
      username: username,
      password: password
    },
    {
      url: `https://baas.kinvey.com/user/${store.settings.appKey}/`,
      success: function(model, response, xhr) {
        model.unset('password')
        router.navigate('feed', {trigger: true})
        sessionStorage.session = JSON.stringify(store.session)
      },
      error: function(model, response) {
        console.log('ERROR: ', arguments);
      }
    })
  },
  gotoLogin: function() {
    router.navigate('login', {trigger:true})
  },
  render: function() {
    this.$el.html(this.template())
    return this
  }
})

export default LoginView
