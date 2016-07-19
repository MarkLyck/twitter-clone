import $ from 'jquery'
import Backbone from 'backbone'

import store from './store'

import LoginView from './views/loginView'
import SignupView from './views/signupView'
import HeaderView from './views/HeaderView'
import NewTweetView from './views/NewTweetView'

const Router = Backbone.Router.extend({
  routes: {
    login   : 'login',
    signup  : 'signup',
    feed    : 'feed',
    newTweet: 'newTweet',
    '/*'    : 'login'
  },
  login: function() {
    if (store.session.authtoken) {
      router.navigate('feed', {trigger:true})
    } else {
      let loginView = new LoginView()
      loginView.render();
      $('#container').empty().append(loginView.$el)
    }
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
  },
  newTweet: function() {
    console.log('RENDERING NEW TWEET');
    let newTweetView = new NewTweetView()
    newTweetView.render();
    $('#container').append(newTweetView.$el)
  }
});

let router = new Router()

export default router
