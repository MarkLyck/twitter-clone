import $ from 'jquery'
import Backbone from 'backbone'

import LoginView from './views/loginView'
import SignupView from './views/signupView'
import HeaderView from './views/HeaderView'

const Router = Backbone.Router.extend({
  routes: {
    login   : 'login',
    signup  : 'signup',
    feed    : 'feed',
    '/*'    : 'login'
  },
  login: function() {
    let loginView = new LoginView()
    loginView.render();
    $('#container').empty().append(loginView.$el)
  },
  signup: function() {
    let signupView = new SignupView()
    signupView.render();
    $('#container').empty().append(signupView.$el)
  },
  feed: function() {
    console.log('RENDERING TWEETER FEED');
    let headerView = new HeaderView()
    headerView.render();
    $('#container').empty().append(headerView.$el)
  }
});

let router = new Router()

export default router
