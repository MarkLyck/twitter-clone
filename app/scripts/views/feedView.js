import $ from 'jquery'
import Backbone from 'backbone'

import router from '../router'
import store from '../store'

import tweetsCollection from '../collections/tweetsCollection'
import SingleTweetView from './singleTweetView'

const FeedView = Backbone.View.extend({
  initialize: function() {
    tweetsCollection.on('add', () => this.render())
    tweetsCollection.on('remove', () => this.render())
    tweetsCollection.fetch()
  },
  id: 'feed-container',
  template: function() {
    return `
    <ul id="tweet-list">
    </ul>
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

export default FeedView
