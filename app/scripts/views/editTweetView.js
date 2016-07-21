import Backbone from 'backbone'
import router from '../router'
import store from '../store'

import tweetsCollection from '../collections/tweetsCollection'

let tweetToEdit;

const EditTweetView = Backbone.View.extend({
  initialize: function(id) {
    console.log(tweetsCollection.get(id));
    tweetToEdit = tweetsCollection.get(id)
  },
  id: 'modal-container',
  template: function() {
    return `
    <div class="edit-tweet-modal modal">
      <div class="new-tweet-header">
        <h3 id="modal-title">Edit Tweet</h3>
        <button class="close-btn">X</button>
      </div>
      <div id="modal-body">
        <textarea id="tweet-textarea" placeholder="body text"></textarea>
        <div id="form-footer">
          <button id="edit-tweet" class="blue-button">Edit!</button>
        </div>
      </div>
    </div>
    `
  },
  events: {
    'click #edit-tweet': 'editTweet',
    'click .close-btn'    : 'close'
  },
  editTweet: function(e) {
    let bodyText = this.$('#tweet-textarea').val()
    tweetToEdit.save({
      body: bodyText
    }, {
      type: 'PUT',
      url: `https://baas.kinvey.com/appdata/${store.settings.appKey}/tweets/${tweetToEdit.get('_id')}`,
      success: function() {
        console.log('EDITED TWEET');
      },
      error: function() {
        console.log('ERROR, tweet not saved!');
      }
    })
    router.navigate('feed', {trigger:true})
  },
  close: function() {
    router.navigate('feed', {trigger:true})
  },
  render: function() {
    this.$el.html(this.template())
    this.$('#tweet-textarea').val(tweetToEdit.get('body'))
    return this
  }
})

export default EditTweetView
