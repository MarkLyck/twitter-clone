import Backbone from 'backbone'

import router from '../router'
import store from '../store'


const LoginView = Backbone.View.extend({
  id: 'modal-container',
  template: function() {
    return `
    <div class="signup-modal modal">
      <h3>Signup</h3>
      <input id="full-name-input" type="text" placeholder="Full Name">
      <input id="email-input" type="text" placeholder="Email">
      <input id="username-input" type="text" placeholder="Username">
      <input id="password-input" type="password" placeholder="Password">
      <div class="wrapper">
        <button id="signup-btn" class="blue-button">Signup</button>
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
    let fullName = this.$('#full-name-input').val()
    let email = this.$('#email-input').val()
    let username = this.$('#username-input').val()
    let password = this.$('#password-input').val()

    store.session.save({
      fullName: fullName,
      email: email,
      username: username,
      password: password,
      followers: [],
      following: [],
      liked: []
    },
    {
      url: `https://baas.kinvey.com/user/${store.settings.appKey}/`,
      success: function(model, response) {
        model.unset('password')
        localStorage.authtoken = response._kmd.authtoken
        router.navigate('feed', {trigger: true})
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
