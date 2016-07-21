import $ from 'jquery'
import Backbone from 'backbone'

import router from '../router'
import store from '../store'

import tweetsCollection from '../collections/tweetsCollection'
import SingleTweetView from './singleTweetView'

const FeedView = Backbone.View.extend({
  initialize: function() {
    tweetsCollection.on('add', (model) => this.addTweet(model))
    tweetsCollection.on('remove', () => this.render())

    if (localStorage.authtoken) {
      tweetsCollection.fetch()
      store.session.fetch({
        url: `https://baas.kinvey.com/user/${store.settings.appKey}/_me`,
        success: (response) => {
          this.render()
        }
      })
    }


  },
  id: 'feed-container',
  template: function() {
    console.log(store.session);
    return `
    <div class="left user-box">
      <div class="user-box-banner"></div>
      <div id="profile-img"></div>
      <div id="profile-info">
        <h2 id="profile-full-name">${store.session.get('fullName')}</h2>
        <h3 id="profile-username">@${store.session.get('username')}</h3>
      </div>
    </div>
    <ul id="tweet-list" class="center">
    </ul>
    <div class="right"></div>
    `
  },
  render: function() {
    this.$el.html(this.template())
    tweetsCollection.forEach(tweet => {
      this.addTweet(tweet)
    })
    return this
  },
  addTweet: function(tweet) {
    let singleTweetView = new SingleTweetView({model:tweet})
    singleTweetView.render()
    this.$('#tweet-list').prepend(singleTweetView.$el)
  }
})

export default FeedView
