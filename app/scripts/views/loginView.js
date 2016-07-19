import Backbone from 'backbone'

import router from '../router'
import store from '../store'

const LoginView = Backbone.View.extend({
  id: 'modal-container',
  template: function() {
    return `
    <div class="login-modal modal">
      <h3>Login</h3>
      <input id="username-input" type="text" placeholder="Username">
      <input id="password-input" type="password" placeholder="Password">
      <div class="wrapper">
        <button id="login-btn">Login</button>
        <button id="goto-signup">Signup</button>
      </div>
    </div>
    `
  },
  events: {
    'click #login-btn': 'login',
    'click #goto-signup': 'gotoSignup'
  },
  login: function(e) {
    let username = this.$('#username-input').val()
    let password = this.$('#password-input').val()

    store.session.save({
      username: username,
      password: password
    },
    {
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
  gotoSignup: function() {
    router.navigate('signup', {trigger:true})
  },
  render: function() {
    this.$el.html(this.template())
    return this
  }
})

export default LoginView
