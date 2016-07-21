import $ from 'jquery'
import Backbone from 'backbone'

import store from './store'

import LoginView from './views/loginView'
import SignupView from './views/signupView'
import HeaderView from './views/HeaderView'

import NewTweetView from './views/newTweetView'
import EditTweetView from './views/editTweetView'
import FeedView from './views/feedView'

import ProfileView from './views/profileView'
import EditProfileView from './views/editProfileView'

import tweetsCollection from './collections/tweetsCollection'
import userCollection from './collections/userCollection'

const Router = Backbone.Router.extend({
  routes: {
    login             : 'login',
    signup            : 'signup',
    feed              : 'feed',
    newTweet          : 'newTweet',
    'edit/:id'        : 'editTweet',
    'user/:username'  : 'profile',
    'user/:username/edit' : 'editProfile',
    '/*'              : 'feed'
  },
  login: function() {
    console.log('login function');
    if (localStorage.getItem('authtoken')) {
      console.log('Navigate to feed instead');
      // store.session.retrieve()
      this.navigate('feed', {trigger:true})
    } else {
      console.log('rendering login part');
      let headerView = new HeaderView()
      headerView.render()
      let feedView = new FeedView()
      feedView.render()
      let loginView = new LoginView()
      loginView.render();
      $('#container').empty().append(headerView.$el).append(feedView.$el).append(loginView.$el)
    }
  },
  signup: function() {
    let signupView = new SignupView()
    signupView.render();
    $('#container').empty().append(signupView.$el)
  },
  feed: function() {
    tweetsCollection.off()
    userCollection.off()
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
  },
  profile: function(username) {
    tweetsCollection.off()
    userCollection.off()
    let headerView = new HeaderView()
    headerView.render()
    let profileView = new ProfileView(username)
    // profileView.render()
    $('#container').empty().append(headerView.$el).append(profileView.$el)
  },
  editProfile: function() {
    let editProfileView = new EditProfileView()
    editProfileView.render()
    $('#container').append(editProfileView.$el)
  }
});

let router = new Router()

export default router
