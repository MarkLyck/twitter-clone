import Backbone from 'backbone'
import router from '../router'

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
    <div class="new-tweet-modal modal">
      <div class="new-tweet-header">
        <h3>Edit tweet</h3>
        <button class="close-btn">X</button>
      </div>
      <textarea id="tweet-textarea" placeholder="body text"></textarea>
      <button id="edit-tweet">Edit!</button>
    </div>
    `
  },
  events: {
    'click #edit-tweet': 'editTweet'
  },
  editTweet: function(e) {
    let bodyText = this.$('#tweet-textarea').val()
    tweetToEdit.save({
      body: bodyText
    })
    router.navigate('feed', {trigger:true})
  },
  render: function() {
    this.$el.html(this.template())
    this.$('#tweet-textarea').val(tweetToEdit.get('body'))
    return this
  }
})

export default EditTweetView
