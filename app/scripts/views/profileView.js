import Backbone from 'backbone'
import moment from 'moment'

import router from '../router'
import store from '../store'

import tweetsCollection from '../collections/tweetsCollection'
import SingleTweetView from './singleTweetView'
import userCollection from '../collections/userCollection'

let profileUser;

const ProfileView = Backbone.View.extend({
  initialize: function(username) {
    tweetsCollection.on('add', () => this.render())
    tweetsCollection.fetch({
      url: `https://baas.kinvey.com/appdata/${store.settings.appKey}/tweets/?query={"username":"${username}"}`,
    })
    // userCollection.on('add', () => this.render)
    userCollection.fetch({
      url: `https://baas.kinvey.com/user/${store.settings.appKey}/?query={"username":"${username}"}`,
      success: response => {
        profileUser = response.models[0]
        this.render()
      }
    })

  },
  id: 'profile-container',
  template: function() {
    return `
    <h2 id="profile-full-name"></h2>
    <h3 id="profile-username"></h3>
    <h4 id="profile-location"></h4>
    <h4 id="profile-joined"></h4>
    <ul id="tweet-list"></ul>
    `
  },
  render: function() {
    this.$el.html(this.template())

    if (profileUser) {
      this.$('#profile-full-name').text(profileUser.get('fullName'))
      this.$('#profile-username').text(profileUser.get('username'))
      this.$('#profile-location').text(profileUser.get('location'))
      this.$('#profile-joined').text('Joined ' + moment(profileUser.get('_kmd').ect).format('MMMM YYYY'))
    }



    tweetsCollection.forEach(tweet => {
      let singleTweetView = new SingleTweetView({model:tweet})
      singleTweetView.render()
      this.$('#tweet-list').append(singleTweetView.$el)
    })
    return this
  }
})

export default ProfileView
