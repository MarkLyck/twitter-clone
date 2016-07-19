import $ from 'jquery'
import Backbone from 'backbone'

import store from './store'

import LoginView from './views/loginView'
import SignupView from './views/signupView'
import HeaderView from './views/HeaderView'

import NewTweetView from './views/newTweetView'
import EditTweetView from './views/editTweetView'
import FeedView from './views/feedView'

const Router = Backbone.Router.extend({
  routes: {
    login       : 'login',
    signup      : 'signup',
    feed        : 'feed',
    newTweet    : 'newTweet',
    'edit/:id'  : 'editTweet',
    '/*'        : 'login'
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
    let headerView = new HeaderView()
    headerView.render()
    let feedView = new FeedView()
    feedView.render()
    $('#container').empty().append(headerView.$el).append(feedView.$el)
  },
  newTweet: function() {
    let newTweetView = new NewTweetView()
    newTweetView.render();
    $('#container').append(newTweetView.$el)
  },
  editTweet: function(id) {
    console.log('RENDER EDITTWEET VIEW');
    let editTweetView = new EditTweetView(id)
    editTweetView.render()
    $('#container').append(editTweetView.$el)
  }
});

let router = new Router()

export default router
