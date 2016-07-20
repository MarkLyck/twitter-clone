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

    tweetsCollection.fetch()
  },
  id: 'feed-container',
  template: function() {
    return `
    <div class="left user-box">
      <div class="user-box-banner"></div>
      <div class="user-box-banner"></div>
    </div>
    <ul id="tweet-list">
    </ul>
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
