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
        <h3 id="modal-title">Compose new Tweet</h3>
        <button class="close-btn">X</button>
      </div>
      <div id="modal-body">
        <textarea id="tweet-textarea" placeholder="body text"></textarea>
        <div id="form-footer">
          <button id="publish-tweet" class="blue-button">Tweet!</button>
        </div>
      </div>
    </div>
    `
  },
  events: {
    'click #publish-tweet': 'publishTweet',
    'click .close-btn'    : 'close'
  },
  publishTweet: function(e) {
    let bodyText = this.$('#tweet-textarea').val()
    let like = new Like()
    like.save(null, {
      success: function(response) {
        tweetsCollection.create ({
          fullName: store.session.get('fullName'),
          username: store.session.get('username'),
          body: bodyText,
          likes: {
            _type: "KinveyRef",
            _id: like.get('_id'),
            _collection: 'likes'
          }
        }, {
          success: function() {
            router.navigate('feed', {trigger:true})
          },
          wait:true,
        })
      }
    })
  },
  close: function() {
    router.navigate('feed', {trigger:true})
  },
  render: function() {
    this.$el.html(this.template())
    return this
  }
})

export default NewTweetView
