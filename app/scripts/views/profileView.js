import Backbone from 'backbone'

import router from '../router'
import store from '../store'

import tweetsCollection from '../collections/tweetsCollection'
import SingleTweetView from './singleTweetView'


const ProfileView = Backbone.View.extend({
  initialize: function(username) {
    tweetsCollection.on('add', () => this.render())
    tweetsCollection.fetch({
      url: `https://baas.kinvey.com/appdata/${store.settings.appKey}/tweets/?query={"username":"${username}"}`,
    })

  },
  id: 'profile-container',
  template: function() {
    return `
    <h2>Test</h2>
    <ul id="tweet-list"></ul>
    `
  },
  render: function() {
    this.$el.html(this.template())
    tweetsCollection.forEach(tweet => {
      let singleTweetView = new SingleTweetView({model:tweet})
      singleTweetView.render()
      this.$('#tweet-list').append(singleTweetView.$el)
    })
    return this
  }
})

export default ProfileView
