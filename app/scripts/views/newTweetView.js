import Backbone from 'backbone'

import router from '../router'
import store from '../store'

import Like from '../models/Like'

import tweetsCollection from '../collections/tweetsCollection'

const NewTweetView = Backbone.View.extend({
  id: 'modal-container',
  template: function() {
    return `
    <div class="new-tweet-modal modal">
      <div class="new-tweet-header">
        <h3>Compose new tweet</h3>
        <button class="close-btn">X</button>
      </div>
      <textarea id="tweet-textarea" placeholder="body text"></textarea>
      <button id="publish-tweet">Tweet!</button>
    </div>
    `
  },
  events: {
    'click #publish-tweet': 'publishTweet'
  },
  publishTweet: function(e) {
    let bodyText = this.$('#tweet-textarea').val()
    let like = new Like()
    like.save(null, {
      success: function() {
        console.log('Saved a like');
      }
    })
    tweetsCollection.create ({
      fullName: store.session.get('fullName'),
      username: store.session.get('username'),
      body: bodyText
    }, {
      success: function() {
        router.navigate('feed', {trigger:true})
      },
      wait:true,
    })
  },
  render: function() {
    this.$el.html(this.template())
    return this
  }
})

export default NewTweetView
